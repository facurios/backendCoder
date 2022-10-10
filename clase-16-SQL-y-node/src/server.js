/* ---------------------- Modulos ----------------------*/
import express from 'express';
import morgan from 'morgan';
// import Productos from './constructor/productosFS.js';
// import Chats from './constructor/chatsFS.js';
import __dirname from './utils.js';
import ChatsSQL from './constructor/chatsSQL.js';
import ProductosMDB from './constructor/productosMDB.js';
import { config } from './utils/config.js';
import knex from 'knex';

/* ------------------- Instancia Server -------------------*/
const app = express();
// Guardado por FileSystem
// const productos = new Productos(__dirname + "/DB/productos.json");
// const chats = new Chats(__dirname +'/DB/chats.json');

//Guardado en Base de Datos
const chatsSQL = new ChatsSQL(knex(config.mariadb));
const productos = new ProductosMDB(knex(config.sqlite3));

/* ---------------------- Middlewares ----------------------*/
app.use(express.static('./public')) 
app.use(express.json());
app.use(morgan('dev'));
app.use(express.urlencoded({extended: true}));

/* ------------- Motor de Plantillas ---------------------- */
app.set('views', __dirname +'/views/layouts');
app.set('view engine', 'ejs');

/* ---------------------- Rutas ----------------------*/

app.get('/', async (req, res) => {
    try {
        let content = await productos.getAll();
        return res.render('index.ejs', {content});
    } catch (error) {
        return error
    }
    
})

app.post("/", async (req, res) => {
    try {
        await productos.save(req.body);
        let content = await productos.getAll();
        return res.render('index.ejs', {content});
    } catch (error) {
        return error
    }
    
});

// /* ---------------------- Servidor ----------------------*/
const PORT = 8080;
const server = app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto http://localhost:${PORT}/`);
});

import { Server} from 'socket.io';

const io = new Server(server);

server.on('error', error => console.log(`Error en servidor ${error}`));

// /* ---------------------- WebSocket ----------------------*/
const messages = [
    {author: 'example@gmail.com', text: 'Bienvenido al server', datetime: '31/08/2022, 20:30:45'}
]

io.on('connection', async (socket) => {
    // console.log(`Nuevo cliente conectado! ${socket.id}`);
    socket.emit('from-server-messages', await chatsSQL.getAll() );

    socket.on('from-client-messages', async (data) => {
        await chatsSQL.save(data);
        io.sockets.emit('from-server-messages', await chatsSQL.getAll());
    });
})
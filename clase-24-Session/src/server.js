/* ---------------------- Modulos ----------------------*/
import express from "express";
import session from "express-session";
import dotenv from 'dotenv';
import exphbs from 'express-handlebars';
import path from 'path'
import __dirname from './utils.js'
dotenv.config();
import Productos from "./constructor/productos.js";
//session persistencia mongo
import connectMongo from 'connect-mongo';

const MongoStore = connectMongo.create({
    mongoUrl: process.env.MONGO_URL,
    ttl: 60
})

const app = express();

/* ---------------------- Middlewares---------------------- */
app.use(express.static('./public')) ;
app.use(express.json());
// app.use(morgan('dev'));
app.use(express.urlencoded({extended: true}));

/* ------------- Motor de Plantillas ---------------------- */
app.engine("hbs", exphbs.engine({
    defaultLayout: "main",
    layoutsDir: path.join(app.get('views'), '/layouts'),
    partialsDir: path.join(app.get('views'), '/partials'),
    extname: 'hbs'
}));
app.set("views", path.join(__dirname + "/views"));
app.set("view engine", ".hbs");
//Session Setup
app.use(session({
    store: MongoStore,
    secret: process.env.SECRET_KEY,
    resave: true,
    cookie: { maxAge: 1000 *60  },//* 10
    saveUninitialized: true
}));
const users = [{nombre:'facu', password:1234}, {nombre:'pepe', password:'pepepass'}];
const productos = new Productos('./DB/productos.json')


function log(req, res, next){
    const user = users.find(elemento => elemento.nombre  == req.session.nombre)
    if (req.session?.nombre) {
        return next();
    }
    return res.render('formLog.hbs')
}

app.get('/', log, (req, res)=> {
    const produc =  productos.content
    const user = req.session.nombre
    res.render('datos.hbs', {user, produc})
});



//Simulando un login
app.get('/login', (req, res) => {
    const {nombre, password} = req.query;
    const user = users.find((nombre)=> nombre=== req.query.nombre)
    if (user) {
      return res.send('login failed')
    }
    req.session.nombre = req.query.nombre //nombre;
    req.session.admin = true;
    const produc =  productos.content
    res.render('datos.hbs', {user, produc})
})


app.get('/logout', (req, res)=> {
    let user = req.session.nombre
    req.session.destroy(err=>{
        if (err) {
            res.json({err});
        } else {
            res.render('saludar.hbs',{user});
        }
    });
});

/* ---------------------- Server ---------------------- */
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Servidor express escuchando en el puerto ${PORT}`);
});

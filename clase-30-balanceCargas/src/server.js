/*============================[Modulos]============================*/
import express from "express";
import session from "express-session";
import exphbs from 'express-handlebars';
import path from 'path';
import __dirname from './utils.js';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
dotenv.config();

import Productos from './constructor/productos.js'
import Usuarios from './constructor/usuarios.js'

import passport from "passport";
import { Strategy } from "passport-local";
const LocalStrategy = Strategy;

//--------PROCESS------------
import modoServer from './config/modoServer.js'
console.log(modoServer.modo, '  -----')
// import minimist from "minimist";

// let args = process.argv.slice(2);

// let options = {
//     default:{
//         puerto:8080,
//     },
//     alias:{
//         p: 'puerto',
//     },
// }

// let argv = minimist(args,options)


const app = express();
/*============================[Middlewares]============================*/

/*----------- Passport -----------*/

passport.use(new LocalStrategy(
    async function(username, password, done) {
        console.log(username, JSON.parse(password))
        // console.log(`${username} ${password}`)
        //Logica para validar si un usuario existe
        const existeUsuario = await usuariosDB.listar(username);

        console.log(existeUsuario);

        if (!existeUsuario) {
            return done(null, false);
        } else {
            const match = await verifyPass(existeUsuario, password);
            if(!match){
                return done(null, false);
            }
            return done(null, existeUsuario);
        }
    }
));

passport.serializeUser((usuario, done)=>{
    done(null, usuario.mail);
});

passport.deserializeUser((nombre, done)=>{
    const existeUsuario = usuariosDB.listar(nombre);
    done(null, existeUsuario);
});

/*----------- Session -----------*/
app.use(session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 20000 //20 seg
    }
}))

app.use(passport.initialize());
app.use(passport.session());

//Metodos de Auth
async function generateHashPassword(password){
    const hashPassword = await bcrypt.hash(password, 10);
    return hashPassword;
}

async function verifyPass(usuario, password) {
    const match = await bcrypt.compare(password, usuario.password);
    console.log(`pass login: ${password} || pass hash: ${ usuario.password}`)
    return match;
}

/* ------------- Motor de Plantillas ---------------------- */
app.engine("hbs", exphbs.engine({
    defaultLayout: "main",
    layoutsDir: path.join(app.get('views'), '/layouts'),
    partialsDir: path.join(app.get('views'), '/partials'),
    extname: 'hbs'
}));
app.set("views", path.join(__dirname + "/views"));
app.set("view engine", ".hbs");

app.use(express.urlencoded({extended: true}));
app.use(express.json());

import random from './routes/apiRandom.js'
app.use('/api/randoms', random)  //Numeros Random Desafio entregable 28...

function isAuth(req, res, next) {
    if(req.isAuthenticated()){
        next()
    } else {
        res.redirect('/login')
    }
}

/*============================[Base de Datos]============================*/
const productos = new Productos('./DB/productos.json')
const usuariosDB = new Usuarios('productos')

/*============================[Rutas]============================*/
app.get('/', (req, res)=>{
    res.redirect('/login')
})

app.get('/login', (req, res)=>{
    res.render('login.hbs');
})

app.post('/login', passport.authenticate('local',  {successRedirect: '/datos', failureRedirect: '/login-error'} ));

//---------Registro de usuarios-------------
app.get('/registro', (req,res)=>{
    res.render('registro.hbs')
})

app.post('/registro', async (req, res)=>{
    const {username, password, mail } = req.body;
    
    const newUsuario = await usuariosDB.listar(mail);
    console.log(newUsuario)
    if (newUsuario) {
        res.render('registro-error.hbs')
    } else {
        const newUser = await {username, password: await generateHashPassword(password), mail};
        console.log(newUser);
        await usuariosDB.guardar(newUser)
        //usuariosDB.push(newUser);
        const todos = await usuariosDB.listarAll()
        console.log(todos)
        res.redirect('/login')
    }
});

app.get('/info',(req, res)=>{
    const proceso = {
        argumentos: process.argv.slice(2),
        plataforma: process.platform,
        node_version: process.versions.node,
        memory_rss: process.memoryUsage.rss(),
        path_exec: process.execPath,
        processid: process.pid,
        carpeta: process.argv[1]
    }
    
    res.render('info.hbs',{proceso})
})

//---------Ingreso a los datos--------
app.get('/datos', isAuth, async (req, res)=>{
    if(!req.session.passport.contador){
        console.log('*******')
        req.session.passport.contador = 1
    } else {
        console.log('+++++++++++')
        req.session.passport.contador++
    }
    const user = await usuariosDB.listar(req.session.passport.user)
    const array = await productos.getAll();
    const datosUsuario = {
        nombre: user.username,
        direccion: user.mail,
    }
    res.render('datos', {contador: req.user.contador, datos: datosUsuario, produc: array});
})

//------------------------Logout
app.get('/logout', (req, res)=> {
    req.logOut(err => {
        res.redirect('/');
    });
})

app.get('/login-error', (req, res)=>{
    res.render('login-error');
})

/*============================[Servidor]============================*/
// const PORT = process.env.PORT;
const PORT = modoServer.puerto;
const modo = modoServer.modo;
import {fork} from 'child_process';
import os from 'os'
const CPUs = os.cpus();
const numCPUs = CPUs.length;
import cluster from "cluster";
// const cluster = require('cluster');

if(cluster.isPrimary && modo === 'cluster'){
    console.log(`Primary ${process.pid} is running`);
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }
    cluster.on('online', (worker, code, signal) =>{
        console.log(` Worker: ${worker.process.pid} start. Date: ${new Date().toLocaleDateString()}`);
    })
    cluster.on('exit', (worker, code, signal) =>{
        console.log(` Worker: ${worker.process.pid} died. Date: ${new Date().toLocaleDateString()}`);
    })
}else {
    app.listen(PORT, (err) =>{
        if(err) throw new Error(`Error on server: ${err}`)
        console.log(`Servidor escuchando en el puerto http://localhost:${PORT}/ - Process ID: ${process.pid}. Date: ${new Date().toLocaleDateString()}`)
    })
}


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

const app = express();
/*============================[Middlewares]============================*/

/*----------- Passport -----------*/

/*
    SOLUCION: Passport LocalStrategy, utiliza dos valores esperados llamados username y password, por lo que
    dentro del formulario 'login' debe contener estos dos imputs con el su respectivo nombre.

    En clase no se reconocia el login porque teniamos nombre/password en lugar de username/password en el HTML.
*/

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
const PORT = process.env.PORT;
const server = app.listen(PORT, ()=>{
    console.log(`Servidor escuchando en puerto ${PORT}`);
})
server.on('error', error=>{
    console.error(`Error en el servidor ${error}`);
});





































































// /* ---------------------- Modulos ----------------------*/
// import express from "express";
// import session from "express-session";
// import dotenv from 'dotenv';
// import exphbs from 'express-handlebars';
// import path from 'path'
// import __dirname from './utils.js'
// dotenv.config();
// import Productos from "./constructor/productos.js";

// import bcrypt from 'bcrypt';
// import passport from "passport";
// import { Strategy } from "passport-local";
// const LocalStrategy = Strategy;



// const app = express();

// /* ---------------------- Middlewares---------------------- */
// app.use(express.static('./public')) ;
// app.use(express.json());
// // app.use(morgan('dev'));
// app.use(express.urlencoded({extended: true}));

// /*----------- Passport -----------*/

// passport.use(new LocalStrategy(
//     async function(nombre, password, done) {
//         console.log(`${nombre} ${password}`)
//         //Logica para validar si un usuario existe
//         const existeUsuario = await usuariosDB.find(usuario => usuario.nombre == nombre);

//         console.log(existeUsuario);

//         if (!existeUsuario) {
//             return done(null, false);
//         } else {

//             const match = await verifyPass(existeUsuario, password);
//             if(!match){
//                 return done(null, false);
//             }

//             return done(null, existeUsuario);
//         }
//     }
// ));

// passport.serializeUser((usuario, done)=>{
//     done(null, usuario.nombre);
// });

// passport.deserializeUser((nombre, done)=>{
//     const existeUsuario = usuariosDB.find(usuario => usuario.nombre == nombre);
//     done(null, existeUsuario);
// });
// //session persistencia mongo
// import connectMongo from 'connect-mongo';

// const MongoStore = connectMongo.create({
//     mongoUrl: process.env.MONGO_URL,
//     ttl: 60
// })




// app.use(passport.initialize());
// app.use(passport.session());

// //Metodos de Auth
// async function generateHashPassword(password){
//     const hashPassword = await bcrypt.hash(password, 10);
//     return hashPassword;
// }

// async function verifyPass(usuario, password) {
//     const match = await bcrypt.compare(password, usuario.password);
//     console.log(`pass login: ${password} || pass hash: ${ usuario.password}`)
//     return match;
// }



// /* ------------- Motor de Plantillas ---------------------- */
// app.engine("hbs", exphbs.engine({
//     defaultLayout: "main",
//     layoutsDir: path.join(app.get('views'), '/layouts'),
//     partialsDir: path.join(app.get('views'), '/partials'),
//     extname: 'hbs'
// }));
// app.set("views", path.join(__dirname + "/views"));
// app.set("view engine", ".hbs");
// //Session Setup
// // app.use(session({
// //     store: MongoStore,
// //     secret: process.env.SECRET_KEY,
// //     resave: true,
// //     cookie: { maxAge: 1000 *60  },//* 10
// //     saveUninitialized: true
// // }));
// app.use(session({
//     secret: process.env.SECRET_KEY,
//     resave: false,
//     saveUninitialized: false,
//     cookie: {
//         maxAge: 20000 //20 seg
//     }
// }))
// const users = [{nombre:'facu', password:1234}, {nombre:'pepe', password:'pepepass'}];
// const productos = new Productos('./DB/productos.json')

// //funcion de autenticacion.
// function isAuth(req, res, next) {
//     if(req.isAuthenticated()){
//         next()
//     } else {
//         res.redirect('/login')
//     }
// }

// app.get('/', (req, res)=>{
//     res.redirect('/login')
// })

// app.get('/login', (req, res)=>{
//     res.render('login.hbs');
// })

// app.get('/register', (req, res)=>{
//     res.render('registro.hbs');
// })

// app.post('/login', passport.authenticate('local',  {successRedirect: '/datos', failureRedirect: '/login-error'} ));
// // function log(req, res, next){
// //     const user = users.find(elemento => elemento.nombre  == req.session.nombre)
// //     if (req.session?.nombre) {
// //         return next();
// //     }
// //     return res.render('formLog.hbs')
// // }

// // app.get('/', log, (req, res)=> {
// //     const produc =  productos.content
// //     const user = req.session.nombre
// //     res.render('datos.hbs', {user, produc})
// // });

// // app.post('/login', (req,res)=>{
// //     try {
// //     let user = req.body
// //     const produc =  productos.content
// //     const username = req.body
// //     console.log(user)
// //     res.status(200).redirect('/go')
// //     } catch (error) {
// //       console.log(error)  
// //     }
    
// // })


// //Simulando un login
// // app.post('/login', (req, res) => {
// //     const {nombre, password} = req.body;
// //     const user = users.find((nombre)=> nombre=== req.query.nombre)
// //     if (user) {
// //       return res.send('login failed')
// //     }
// //     req.session.nombre = req.query.nombre //nombre;
// //     req.session.admin = true;
// //     const produc =  productos.content
// //     res.render('datos.hbs', {user, produc})
// // })


// app.get('/logout', (req, res)=> {
//     let user = req.session.nombre
//     req.session.destroy(err=>{
//         if (err) {
//             res.json({err});
//         } else {
//             res.render('saludar.hbs',{user});
//         }
//     });
// });

// /* ---------------------- Server ---------------------- */
// const PORT = process.env.PORT;
// app.listen(PORT, () => {
//   console.log(`Servidor express escuchando en el puerto ${PORT}`);
// });

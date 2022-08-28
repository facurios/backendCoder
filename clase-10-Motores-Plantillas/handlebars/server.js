//------------------MODULOS---------------------------//
const express = require("express");
const path = require("path");
const exphbs = require("express-handlebars");
const Contenedor = require('./src/controller/cotroller.js')

//-----------------SERVER------------------------------//

const app = express();

//----------------MIDDLEWARES--------------------------//

app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(express.static(path.join(__dirname + "/public")))

//-----Motor de plantilla hbs-----------//

app.engine("hbs", exphbs.engine({
    defaultLayout: "main",
    layoutsDir: path.join(app.get('views'), '/layouts'),
    partialsDir: path.join(app.get('views'), '/partials'),
    extname: 'hbs'
}))
app.set("views", path.join(__dirname + "/views"));
app.set("view engine", "hbs")


//----------------Conexion DB---------------------//
const productos = new Contenedor('./productos.json') //inicializo la DB

//----------------RUTAS-------------------------------//

app.get('/', (req, res)=>{
    res.render('vista-form', {});
});

app.get("/productos", (req, res)=>{
   let produc = productos.getAll()
    res.render("vista-hist", {produc});
})

app.post('/productos', (req, res)=>{
    productos.save(req.body)
     res.redirect('/');
});


app.get("*", (req, res)=>{
    res.status(404).json({
        code: 404,
        msg: "not found"
    })
})



//------------------LEVANTAR SERVIDOR-------------------//

const PORT = 8080;
const server = app.listen(PORT, ()=>{
    console.log(`estamos escuchando el servidor http://localhost:${PORT}`)
});
server.on("error", error =>{
    console.log(`Error en el servidor ${error}`)
});

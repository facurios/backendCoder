
const Contenedor = require('./src/controller.js');
const express = require('express');
const process = require('process');


const PORT = process.env.PORT || 8080;
const app = express()
app.use(express.json())


const nuevo = new Contenedor('./productos.json');

app.get('/productos',async (req, res)=>{
    res.send(JSON.stringify(await nuevo.getAll()) )
})

app.get('/productosRandom', async(req, res)=>{
    let productos = await nuevo.getAll()
    let numero = Math.floor(Math.random()*(productos.length-1))
    res.send(JSON.stringify(productos[numero]))
})


const server= app.listen(PORT, ()=> console.log(`Server on http://localhost:${PORT}`))

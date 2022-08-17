const express = require('express');
const routerProductos = express.Router();
const Contenedor = require('../controller/cotroller.js')

const productos = new Contenedor('./productos.json')

routerProductos.get('/',(req, res)=>{
    res.send(JSON.stringify(productos.getAll()))
})
routerProductos.get('/:id',(req, res)=>{
    res.status(200).json(productos.getById(JSON.parse(req.params.id)))
})
routerProductos.post('/',(req, res)=>{
    res.status(200).json(productos.save(req.body))
})
routerProductos.put('/:id',(req, res)=>{
    console.log(req.body)
    res.status(200).json(productos.upload(req.body, req.params.id))
})
routerProductos.delete('/:id',(req, res)=>{
    res.status(200).json(productos.deleteById(JSON.parse(req.params.id)))
})




module.exports = routerProductos;
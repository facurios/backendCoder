// const ContenedorMongo = require ('../contenedores/contenedorMongo.js');
//const {ProductosDao} = require('../DAO/index.js');
// const ProductosDaoMongo = require('../DAO/productos/ProductosDaoMongo.js');
const {ProductosDao} = require('../DAO/index.js')
const {productsSchema} = require ('../DAO/schemas/mongoSchemas.js');



// class Productos extends ContenedorMongo{ 
class Productos extends ProductosDao{ 
    constructor() {
        super(productsSchema,'products');//productsSchema,'products' se carga la informacion de productos desde Mongo
    }
}

module.exports = Productos;
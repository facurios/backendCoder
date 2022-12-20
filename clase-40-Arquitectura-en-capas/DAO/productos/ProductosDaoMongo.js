const ContenedorMongo = require ('../../contenedores/contenedorMongo')
// const {productsSchema} = require ('../schemas/mongoSchemas');
// const producModel = require('../schemas/mongoSchemas.js')

class ProductosDaoMongo extends ContenedorMongo{ 
    constructor(productsSchema, collection) {
        
        super(productsSchema, collection); // se carga la informacion de productos desde Mongo
        
    }
    async guardar (category,detail,pictureUrl,price,title){
            const productoActual = { //tomo los valores ingresados
                category: category,
                detail: detail,
                pictureUrl: pictureUrl,
                price : price,
                title : title   
            }   
            let id = await this.add(productoActual);// los agrego a productos
            return id //retorno id
    }

    async leer (){
        let productos = await this.getAll()
        return productos //retorno Json de productos
    }

    async leerId(pid) {
        let content = await this.getById(pid) 
        return content
    }

    // async leerCategory(category) {
    //     let content = await this.getCustom(category,'category')
    //     return content
    // }

    async borrar (id){
        await this.deleteById(id)
    }

    async modificar(category,detail,pictureUrl,price,title,id){
        const productoActual = { // guardo el producto con los nuevos valores
            category: category,
            detail: detail,
            pictureUrl: pictureUrl,
            price : price,
            title : title 
        }
        await this.updateById(productoActual,id);
    }
}

module.exports = ProductosDaoMongo;
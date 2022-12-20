const ContenedorMongo = require('../../contenedores/contenedorMongo.js')
class CarritosDaoMongo extends ContenedorMongo { 
        constructor(cartsSchema, collection) {
            super(cartsSchema,collection); // se carga la informacion de carritos desde Mongo
        }
    
        async crear(){
            let cartId = 0;
            let carts = await this.getAll()
            if(carts.length) cartId=carts[carts.length-1].cartId; 
            const cartActual = { 
                cartId:++cartId,
                date: new Date(),
                products: [],
            }
            await this.add(cartActual)
            return cartId 
        }
    
        async guardar(cid,pid,quantity,price){
                let carts = await this.getCustom(cid,'cartId')
                let cart = carts[0]
                if(cart==undefined)  return {status:'error', message: 'carrito inexistente'} 
                let content = cart.products
                if(content.length!=0){
                    let indexProduct = content.findIndex(content=>content.id == pid)
                    if(indexProduct!=-1){
                        cart.products[indexProduct].quantity+=quantity // si ya existia el producto en el carrito se suma cantidad
                        await this.updateById(cart,cart.id);
                        return {status:'success', message: `se agrego producto con ID:${pid} en carrito con ID:${cid}`}
                    }
                } 
                content={
                    id : pid,
                    quantity: quantity,
                    price : price, 
                }
                cart.products.push(content) // se guarda en carrito el producto correspondiente
                await this.updateById(cart,cart.id);
                return {status:'success', message:`se agrego producto con ID:${pid} en carrito con ID:${cid}`}  
        }
    
        async leer(id) {
            let content = await this.getCustom(id,'cartId')
            return content[0] // se retorna Json del carrito pedido
        }
    
        async leerTodo (){
            let content = await this.getAll()
            return content //se retorna Json del carrito
        }
    
        async borrar(id){
            await this.deleteCustom(id,'cartId')
        }
    
        async borrarProducto(cid,pid){
            let cart = await this.getCustom(cid,'cartId')
            let content = cart.products.findIndex(products=>products.id == pid) 
            cart.products= cart.products.filter(products=>products.id != pid)
            await this.updateById(cart,cart.id);
            return content
        }
    }
    
    module.exports = CarritosDaoMongo
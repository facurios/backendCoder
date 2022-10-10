class Productos {
    constructor(knexCli) {
        this.db = knexCli;
        this.table = 'productos'
    }
    
    //Método para guardar un producto
    
    async save(object) {
        try {
            await this.db(this.table).insert(object)
            .then(()=> console.log('insertados'))
            // .finally(()=> this.db.destroy());
            return `mensaje guardado con exito`;
        } catch (error) {
            console.log(error)
        }
         
    }
    //Método para obtener todos los productos
    async getAll() {
        try {
            let data = await this.db.from('productos').select('*')     
            return data;
        } catch (error) {
            console.log(error)
            return error
        }
        
    }
    //Método para obtener un producto según ID
    // async getById(id) {   //que pasa si no existe el producto
    //     try {
    //         let data = await this.db.from('productos').select('*').where({id: id})
    //         .catch(err => err)
    //         .finally(()=> this.db.destroy())
    //         return data;
    //     } catch (error) {
    //         console.log(error)
    //         return error
    //     }
    // }
    //Método para eliminar un producto según ID
    // async deleteById(id) { //corregir si el producto esiste primero
    //     try {
    //         let resp = await this.db.from(this.table).where({id: id}).del();
    //         if (resp === 0) return (`El producto ${id} no existe`)
    //         return `El producto ${id} fue eliminado`;
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }
    // //Método para actualizar productos
    // update(id, obj){  // controlar si primero existe el producto
    //     const index = this.content.findIndex(objT => objT.id == id);
    //     obj.id = this.content[index].id;
    //     this.content[index] = obj;
    //     return obj;
    // }
}

export default Productos;
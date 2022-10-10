class ChatsSQL {
    constructor(knexCli) {
        this.db = knexCli;
        this.table = 'mensaje'
    }
    //Método para guardar mensaje
    
    async save(object) {
        try {
            await this.db(this.table).insert(object)
            .catch(err => console.log(err))
            // .finally(()=> this.db.destroy())
            return `mensaje guardado con exito`;
        } catch (error) {
            console.log(error)
        }
         
    }
    //Método para obtener todos los mensajes
    async getAll() {
        try {
            let data = await this.db.from(this.table).select('*')
            .catch(err => err)
            // .finally(()=> this.db.destroy())
            return data
        } catch (error) {
            console.log(error)
        }
        
    }
    
}

export default ChatsSQL;
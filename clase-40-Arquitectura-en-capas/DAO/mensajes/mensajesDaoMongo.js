const ContenedorMongo = require ('../../contenedores/contenedorMongo.js');


class MensajesDaoMongo extends ContenedorMongo{ 
    constructor(schema, collection) {
        super(schema,collection); // se carga la informacion de mensajes desde Mongo
    }
    async guardar (email,type,message,date){
            const mensajeActual = { //tomo los valores ingresados
                email: email,
                type: type,
                message: message,
                date : date,
            }   
            let id = await this.add(mensajeActual);// los agrego a mensajes
            return id 
    }

    async leer (){
        let mensajes = await this.getAll()
        return mensajes //retorno Json de productos
    }

    async leerEmail(email) {
        let content = await this.getCustom(email,'email')
        return content
    }
}

module.exports = MensajesDaoMongo
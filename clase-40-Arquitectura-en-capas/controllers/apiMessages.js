const {MensajesDao} = require('../DAO/index.js')

// const ContenedorMongo = require ('../contenedores/contenedorMongo.js');
const {messageSchema} = require ('../DAO/schemas/mongoSchemas.js');

class Mensajes extends MensajesDao{ 
    constructor() {
        super(messageSchema,'messages'); // se carga la informacion de mensajes desde Mongo
    }
}

module.exports = Mensajes
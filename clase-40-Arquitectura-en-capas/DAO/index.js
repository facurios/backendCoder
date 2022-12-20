// const ProductosDaoMongo = require('./productos/ProductosDaoMongo.js')
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const { productsSchema } = require('./schemas/mongoSchemas');
dotenv.config();

let ProductosDao;
let CarritosDao;
let MensajesDao

switch (process.env.DB) {
    case 'MONGO':
        (async () => {
            const CS = process.env.MONGO_URL
            try {
                await mongoose.connect(CS);
                console.log('MongoDB connected');
                 
            } catch (err) {
                console.log(err.message);
            }
        })()
        ProductosDao = require('./productos/ProductosDaoMongo.js')
        CarritosDao = require('./carritos/CarritosDaoMongo.js')
        MensajesDao = require('./mensajes/mensajesDaoMongo.js')
        break;
    case 'FILE':
        console.log('coneccion a base de datos File')
        break;
    default:
        (async () => {
            const CS = process.env.MONGO_URL
            console.log(process)
            try {
                await mongoose.connect(CS);
                console.log('MongoDB connected');
            } catch (err) {
                console.log(err.message);
            }
        })()
        break;
}
module.exports = {ProductosDao, CarritosDao, MensajesDao};


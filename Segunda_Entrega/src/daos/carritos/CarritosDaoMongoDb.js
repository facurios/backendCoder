import ContenedorMongoDb from "../../contenedores/ContenedorMongoDb.js"

class CarritosDaoMongoDb extends ContenedorMongoDb {

    constructor() {
        super("carritos", {
          title: { type: String, required: true },
          productos: { type: [], required: true },
          date: { type: String, required: true },
        });
    }

    async guardar(carrito) {
        return super.guardar({ ...carrito, productos: [] });
    }
}

export default CarritosDaoMongoDb

import ContenedorFirebase from "../../contenedores/ContenedorFirebase.js"

class CarritosDaoFirebase extends ContenedorFirebase {
  constructor() {
    super("carritos");
  }

  async listarAll() {
    const docs = await super.listarAll();
    return docs.map((doc) => ({
      id: doc.id,
      title: doc.data().title,
      productos: doc.data().productos,
      date: doc.data().date,
    }));
  }

  async guardar(carrito) {
    return super.guardar({ ...carrito, productos: [] });
  }
}

export default CarritosDaoFirebase

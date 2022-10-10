import ContenedorFirebase from "../../contenedores/ContenedorFirebase.js"

class ProductosDaoFirebase extends ContenedorFirebase {
  constructor() {
    super("productos");
  }

  async listarAll() {
    const docs = await super.listarAll();
    return docs.map((doc) => ({
      id: doc.id,
      title: doc.data().title,
      price: doc.data().price,
      thumbnail: doc.data().thumbnail,
      date: doc.data().date,
    }));
  }
  async guardar(producto) {
    return super.guardar({ ...producto });
  }
}

export default ProductosDaoFirebase

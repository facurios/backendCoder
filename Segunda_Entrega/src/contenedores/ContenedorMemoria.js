class ContenedorMemoria {
  constructor() {
    this.productos = [];
    this.id = 1;
  }

  listar(id) {
    const products = this.listarAll();
    const lastElement = products[products.length - 1];
    const productById = products.find((p) => p.id == id);
    if (lastElement >= productById) {
      return productById;
    } else {
      throw new Error();
    }
  }

  listarAll() {
    return this.productos;
  }

  guardar(prod) {
    try {
      this.productos.push({
        ...prod,
        date: new Date().toLocaleString(),
        id: this.id++,
      });
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  actualizar(prod, id) {
    const products = this.listarAll();
    let lastElement = products[products.length - 1];
    let productById = products.find((p) => p.id == id);
    if (lastElement >= productById) {
      productById.title = prod.title;
      productById.price = prod.price;
      productById.thumbnail = prod.thumbnail;
    } else {
      throw new Error();
    }
  }

  borrar(id) {
    const products = this.listarAll();
    const lastElement = products[products.length - 1];
    let productById = products.find((p) => p.id == id);
    if (lastElement >= productById) {
      const position = products.indexOf(productById);
      products.splice(position, 1);
    } else {
      throw new Error();
    }
  }
}

export default ContenedorMemoria;

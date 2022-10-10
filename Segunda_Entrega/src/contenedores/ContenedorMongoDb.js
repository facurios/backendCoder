import mongoose from 'mongoose'
import config from '../config.js'

await mongoose.connect(config.mongodb.cnxStr, config.mongodb.options)

class ContenedorMongoDb {
  constructor(nombreColeccion, esquema) {
    this.coleccion = mongoose.model(nombreColeccion, esquema);
  }

  async listar(id) {
    const obj = await this.coleccion.findOne({ _id: id });
    return obj;
  }

  async listarAll() {
    const obj = await this.coleccion.find();
    return obj;
  }

  async guardar(nuevoElem) {
    const objectSaveModel = new this.coleccion({
      ...nuevoElem,
      date: new Date().toLocaleString(),
    });
    const savedObject = await objectSaveModel.save();
  }

  async actualizar(nuevoElem, id) {
    const objUpdate = await this.coleccion.updateOne(
      { _id: id },
      { $set: { ...nuevoElem } }
    );
  }

  async borrar(id) {
    const objDelete = await this.coleccion.deleteOne({ _id: id });
    return objDelete;
  }

  async borrarAll() {
    const obj = this.listar(id);
  }
}

export default ContenedorMongoDb
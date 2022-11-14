import mongoose from 'mongoose'

const config = {
    cnxStr: `mongodb+srv://facuuni8:facundorios@entrega2cluster0.kfplgwj.mongodb.net/?retryWrites=true&w=majority`,
    options: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        serverSelectionTimeoutMS: 5000,
    }
};

await mongoose.connect(config.cnxStr)

export default class Usuarios {
  constructor(nombreColeccion) {
    this.schema= {
        username: { type: String, required: true },
        mail: { type: String, required: true },
        password: { type: String, required: true }, // -> agregado
      }
    this.coleccion = mongoose.model(nombreColeccion, this.schema);
  }

  async listar(nombre) { // busca por MAIL
    const obj = await this.coleccion.findOne({ mail: nombre });
    return obj;
  }

  async listarAll() {
    const obj = await this.coleccion.find();
    return obj;
  }

  async guardar(nuevoElem) {
    const objectSaveModel = new this.coleccion({
      ...nuevoElem,
    });
    const savedObject = await objectSaveModel.save();
  }
}
import admin from "firebase-admin"
import config from '../config.js'

admin.initializeApp({
    credential: admin.credential.cert(config.firebase)
})

const db = admin.firestore();

class ContenedorFirebase {
  constructor(nombreColeccion) {
    this.coleccion = db.collection(nombreColeccion);
    this.id = 1;
  }

  async listar(id) {
    try {
      const doc = this.coleccion.doc(`${id}`);
      const object = await doc.get();
      const response = object.data();
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async listarAll() {
    try {
      const querySnapshot = await this.coleccion.get();
      let docs = querySnapshot.docs;
      return docs;
    } catch (error) {
      console.log(error);
    }
  }

  async guardar(nuevoElem) {
    try {
       let doc = this.coleccion.doc();
      const object = {
        ...nuevoElem,
        date: new Date().toLocaleString(),
      };
      await doc.create(object);
    } catch (error) {
      console.log(error);
    }
  }

  async actualizar(nuevoElem, id) {
    try {
      const doc = this.coleccion.doc(`${id}`);
      const object = await doc.update({ ...nuevoElem });
      return object;
    } catch (error) {
      console.log(error);
    }
  }

  async borrar(id) {
    try {
      const doc = this.coleccion.doc(`${id}`);
      const object = await doc.delete();
      return object;
    } catch (error) {
      console.log(error);
    }
  }

  async borrarAll() {
    try {
      const doc = this.coleccion.doc();
      const object = await doc.delete();
      return object;
    } catch (error) {
      console.log(error);
    }
  }

  async desconectar() {}
}

export default ContenedorFirebase
const fs = require ('fs');
module.exports = class Contenedor{
    constructor(rutaData){
        this.ruta = rutaData
    }
    
    save = (obj) =>{
        try {
            
            if (fs.existsSync(this.ruta)) {
                let content = fs.readFileSync(this.ruta, 'utf-8');
                content = JSON.parse(content)
                let id = 1
                if(content.length!=0){id= content[content.length-1].id+1}
                obj.id= id
                content.push(obj)
                fs.writeFileSync(this.ruta, JSON.stringify(content, null, '\t'), 'utf-8')
                return obj;
            } else {
                return ({messaje: 'No se encuentra la base de datos'});
            }
        } catch (error) {
            console.log(error);
        }
    }
    getAll = ()=> {
        try {
            if (fs.existsSync(this.ruta)) {
                let content = fs.readFileSync(this.ruta, 'utf-8');
                content = JSON.parse(content)
                return content;
            } else {
                return ({messaje: 'No se encuentra la base de datos'});
            }
        } catch (error) {
            console.log(error);
        }
    
    }
    getById(id){
        try {
            if (fs.existsSync(this.ruta)) {
                let content = fs.readFileSync(this.ruta, 'utf-8');
                content = JSON.parse(content)
                let prod = content.find(obj=> obj.id === id )
                if(prod != undefined) return prod;
                return ({error:'producto no encontrado'})
            }else{
                return ({messaje: 'No se encuentra la base de datos'})
            }
        } catch (error) {
            console.log(error);
        }
    }
    deleteById(id){
        try {
            if (fs.existsSync(this.ruta)) {
                let content = fs.readFileSync(this.ruta, 'utf-8');
                content = JSON.parse(content)
                let newArray = content.filter(obj=> obj.id != id )
                if(content.length === newArray.length)return {messaje: 'El ID ingresado no existe'}
                fs.writeFileSync(this.ruta, JSON.stringify(newArray, null, '\t'), 'utf-8')
                return {messaje: 'El producto fue eliminado'}
            }
        } catch (error) {
            console.log(error);
        }
    }
    upload(obj, id){
        try {
            id= parseInt(id)
            if (fs.existsSync(this.ruta)) {
                if(id || obj.thumbnail || obj.price || obj.title){
                    let content = fs.readFileSync(this.ruta, 'utf-8');
                    content = JSON.parse(content)
                    let prodid = content.findIndex(obj=> obj.id === id )
                    if (prodid === -1) return({messaje:'el id ingresado no existe'})
                    content[prodid].price = obj.price
                    content[prodid].thumbnail = obj.thumbnail
                    content[prodid].title = obj.title
                    fs.writeFileSync(this.ruta, JSON.stringify(content, null, '\t'), 'utf-8')
                    return  ({messaje: 'Producto actualizado con exito'})
                }else{
                    return({messaje: 'Por favor ingrese todos los campos'})
                }
            }else{
                return({messaje: 'No se encuentra la base de datos'})
            }
        } catch (error) {
            console.log(error);
        }
    }
}

const fs = require ('fs');
module.exports = class Contenedor{
    constructor(rutaData){
        this.ruta = rutaData
    }
    
    save = async(obj) =>{
        try {
            
            if (fs.existsSync(this.ruta)) {
                let content = fs.readFileSync(this.ruta, 'utf-8');
                content = JSON.parse(content)
                let id = 1
                if(content.length!=0){id= content[content.length-1].id+1}
                obj.id= id
                content.push(obj)
                fs.writeFileSync(this.ruta, JSON.stringify(content, null, '\t'), 'utf-8')
                return id;
            } else {
                return ({messaje: 'El archivo no existe'});
            }
        } catch (error) {
            console.log(error);
        }
    }
    getAll = async()=> {
        try {
            if (fs.existsSync(this.ruta)) {
                let content = fs.readFileSync(this.ruta, 'utf-8');
                content = JSON.parse(content)
                return content;
            } else {
                return {messaje: 'El archivo no existe'};
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
                return {messaje: 'El archivo no existe'}
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
                if(content.length === newArray.length)return {messaje: 'El ID no existe'}
                fs.writeFileSync(this.ruta, JSON.stringify(newArray, null, '\t'), 'utf-8')
                return  {messaje: 'El producto fue eliminado'}
            }
        } catch (error) {
            console.log(error);
        }
    }
    deleteAll(){
        try {
            fs.writeFileSync(this.ruta, JSON.stringify([], null, '\t'), 'utf-8')
                return  {messaje: 'Se eliminaron todos los datos'}
        } catch (error) {
            
        }
    }
}

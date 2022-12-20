const mongoose = require("mongoose");
const CustomError = require("../class/CustomError");
const DbClient = require("../class/DBClient");
// const {productsSchema} = require ('../schemas/mongoSchemas.js');

class ContenedorMongo extends DbClient{ // contenedor 
    constructor(schema, collection){
        super();
        this.schema = schema;
        this.collection = collection;
        this.model= mongoose.model( this.collection, this.schema);
    };

    async  getAll(){
        try{    
            let content = await this.model.find({});
            if (!content) return [];
            return content;
        }
        catch (error){
            console.log(error);
        }
    }

    async  getById(id){
        try{    
            let content = await this.model.find({_id:id});
            if (!content) return [];
            return content;
        }
        catch (error){
            console.log(error);
        }
    }

    async  getCustom(value,key){
        try{    
            let content = await this.model.find({[key]:value});
            if (!content) return [];
            return content;
        }
        catch (error){
            console.log(error);
        }
    }

    async add(content){
        try {
            let response = await this.model.insertMany(content);
            return response;
        } catch (error) {
            console.log(error);
        }
    }

    async updateById(content,id){
        try {
            let response = await this.model.updateMany({_id: id},content);
            return response;
        } catch (error) {
            console.log(error);
        }
    }

    async deleteById(id){
        try {
            let response = await this.model.deleteMany({_id: id});
            return response;
        } catch (error) {
            console.log(error);
        }
    }

    async deleteCustom(value,key){
        try {
            let response = await this.model.deleteMany({[key]: value});
            return response;
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = ContenedorMongo
const fs = require('fs/promises');

class Chats {
    constructor(name) {
        this.fileName = name;
        this.countID = 0;
        this.content = [];
        this.init();
    }
    //Método para inicializar el archivo
    async init() {
        try {
			let data = await fs.readFile(this.fileName);
			this.content = JSON.parse(data);
			for (const element of this.content) {
				if (element.id > this.countID) this.countID = element.id;
			}
		} catch (error) {
			console.log('Aún no hay archivo');
		}
    }
    //Método que escribe/sobreescribe
    async write() {
        await fs.writeFile(this.fileName, JSON.stringify(this.content));
    }
    //Método para guardar un producto
    save(object) {
        this.countID++; 
        object["id"] = this.countID; 
        this.content.push(object); 
        this.write(); 
        return `El id del objeto añadido es ${this.countID}`; 
    }
    //Método para obtener todos los productos
    getAll() {
        return this.content;
    }
    
}

module.exports = Chats;
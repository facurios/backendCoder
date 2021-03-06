import fs from 'fs';

export default class Cart {  
    constructor(nombreArchivo) {
        this.nombreArchivo = nombreArchivo;
    }

    getCart = async () => {
        try {
            if (fs.existsSync(this.nombreArchivo)) {
                //console.log('existe')
                let content = fs.readFileSync(this.nombreArchivo, 'utf-8');
                return content;
            } else {
                
                return [];
            }
        } catch (error) {
            console.log(error);
        }
    }

    saveCart = async (cart) => {
        try {
            fs.writeFileSync(this.nombreArchivo, JSON.stringify(cart, null, '\t'), 'utf-8');
            return true;
        } catch (error) {
            console.log(error);
        }

    }

}
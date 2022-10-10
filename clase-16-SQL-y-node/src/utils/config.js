import __dirname from "../utils.js";
const config = {
    mariadb: {
        client: 'mysql',
        connection: {
            host: '127.0.0.1',
            user: 'root',
            password: '',
            database: 'mibase'
        }
    },
    sqlite3: {
        client: 'better-sqlite3',
        connection: { filename: __dirname +'//DB//ecommerce' },
        useNullAsDefault: true    
    }
        
        
};

export{
    config
}
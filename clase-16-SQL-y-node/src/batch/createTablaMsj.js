import knex from 'knex';
import { config } from '../utils/config.js';
const knexCli = knex(config.mariadb);


knexCli.schema.dropTableIfExists('mensaje')
.then(console.log('eliminada'))
knexCli.schema.createTable('mensaje', table =>{
    table.increments('id')
    table.string('author')
    table.string('date')
    table.string('text')
})
.then(()=>console.log('Tabla creada'))
.catch(err => console.log(err))

const articulos = [{author:"facuuni8@gmail.com",text:"kkkk",date:"02/09/2022, 18:46:45"}]
const creardatos = (articulos) =>{
    const res = knexCli('mensaje').insert(articulos)
    .then(()=>console.log('Datos ingresados'))
    .catch(err => console.log(err))
    .finally(()=> knexCli.destroy());    
}
creardatos(articulos);

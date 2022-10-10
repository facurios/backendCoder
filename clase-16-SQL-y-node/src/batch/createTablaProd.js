import knex from 'knex';
import { config } from '../utils/config.js';
const knexCli = knex(config.sqlite3);


knexCli.schema.dropTableIfExists('productos')
.then(console.log('eliminada'))
knexCli.schema.createTable('productos', table => {
    table.increments('id')
    table.string('title')
    table.float('price')
    table.string('thumbnail')
  })
.then(() => console.log('tabla creada'))
.catch(err => console.log(err))

const productos = [
          { title: "Mirinda", price: 180, thumbnail: "" },
          { title: "Seven Up", price: 190, thumbnail: "" },
          { title: "Pepsi", price: 185, thumbnail: "" },
      ]
knexCli('productos').insert(productos)
  .then(()=> console.log('insertados'))
  .catch(err => console.log(err))
  .finally(()=> knexCli.destroy());
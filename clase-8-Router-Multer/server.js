const express = require('express');
const app = express();
const routerProductos = require('./src/routes/routerProductos.js')


app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'))

app.use('/api/productos', routerProductos)

const PORT = process.env.PORT || 8080;
const server = app.listen(PORT, ()=>{console.log(`Server on http://localhost:${PORT}`)})
server.on('error', error=>{
    console.error(`Error en el servidor ${error}`);
});

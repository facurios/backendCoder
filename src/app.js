import express from 'express';
import prodRouter from './routes/productsRoute.js';
import cartRouter from './routes/cartRoute.js'
import __dirname from './utils.js';

const app = express();
const PORT = process.env.PORT || 8080;
const server = app.listen(PORT, ()=> console.log(`Listening on ${PORT}`));

app.use(express.json());
app.use(express.static(__dirname+'/public'))//esta al mismo nivel de app, por ello la ruta asi
app.use('/api/products', prodRouter)
app.use('/api/carts', cartRouter)

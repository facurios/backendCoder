const express = require('express');
const prodRouter = require('./routes/productsRoute.js')
const cartRouter = require('./routes/cartRoute')


const app = express();
const PORT = process.env.PORT || 8080;
const server = app.listen(PORT, ()=> console.log(`Listening on ${PORT}`));

app.use(express.json());
app.use(express.static(__dirname+'/public'))//esta al mismo nivel de app, por ello la ruta asi
app.use('/api/productos', prodRouter)
app.use('/api/carritos', cartRouter)
app.use("*", (req, res)=>{
    res.status(404).json({
        code: 404,
        msg: "not found"
    })
})

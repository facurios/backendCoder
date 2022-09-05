const express = require('express')
const cartController = require('../controller/cartController.js')

const Router = express.Router();

Router.post('/', cartController.createCart );//funciona
Router.delete('/:cid', cartController.deleteCartId );//funciona
Router.get('/:cid/productos', cartController.getCartId );//funciona
Router.post('/:cid/productos', cartController.addProduct );//funciona
Router.delete('/:cid/productos/:pid', cartController.deleteProduct );    //funciona


module.exports= Router;
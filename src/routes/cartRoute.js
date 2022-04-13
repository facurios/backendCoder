import express from "express";
import cartController from "../controller/cartController.js";



const Router = express.Router();


Router.post('/', cartController.createCart );//funciona
Router.delete('/:cid', cartController.deleteCartId );//funciona
Router.get('/:cid/products', cartController.getCartId );//funciona
Router.post('/:cid/products', cartController.addProduct );//funciona
Router.delete('/:cid/products/:pid', cartController.deleteProduct );    //funciona


export default Router;
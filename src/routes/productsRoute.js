import express from 'express';
import productController from '../controller/productController.js'

let admin = true;
const permitAdmin = (req, res, next)=>{
    if(admin){
        next();
    }else{
        res.status(401).send({
            message: "Autorization required",
        });
    };

};

const Router = express.Router();

Router.get('/:pid',productController.getProductsByid )
Router.get('/', productController.getProducts);
Router.post('/', permitAdmin, productController.createProduct);
Router.put('/:pid', permitAdmin, productController.updateProduct);
Router.delete('/:pid', permitAdmin, productController.deleteProduct);

export default Router;

const Cart = require('../models/cartModel.js')
// import __dirname from '../utils.js';

// //Inicializo el carro
let cart = new Cart(__dirname + '/fileSystem/carts/carts.txt');

let cartContent = [];

const updateCart = () => {
    cart.getCart().then(data => {

        if (data.length === 0) {
            cartContent = [];
        } else {

            cartContent = JSON.parse(data);
        }

    }).catch(err => {
        console.log(err);
    }
    )
}
updateCart();

//Funciones del controlador

//Crear un carro (Funcion del POST) // llamar el ultimo id y crear el siguiente
const createCart = (req, res) => {
    let newCart = cartContent.length-1
    if(newCart != -1){
    cartContent.push({
        id : cartContent[cartContent.length-1].id + 1,
        timestamp: new Date(),
        products: []
    })
    }else{
        cartContent.push({
            id : 1,
            timestamp: new Date(),
            products: []
        })
    };
    
    cart.saveCart(cartContent).then((resp) => {
            res.status(200).send({
            message: 'Carrito creado',
            cart: cartContent[cartContent.length-1].id 
            })

    }).catch(err => {
        res.status(500).send({
            message: 'Error',
            description: err
        })
    })
}

//Buscar un carro por id (Funcion del GET)
const getCartId = (req, res) => {
    let id = parseInt(req.params.cid);
    let cartId = cartContent.find(cart => cart.id === id);
    if (id === undefined) {
        res.status(400).send({
            message: 'Faltan datos',
            description: 'id'
        });
    } else {
        if (!cartId) {
            res.status(404).send({
                message: 'Carro inexistente',
                description: `id: ${id}`
            });
        } else {
            res.status(200).send({
                message: 'Carro',
                cart: cartId
            }
            );
        }
    }
}

//Borrar un carro por id
//(Funcion del DELETE)
//funcionando
const deleteCartId = (req, res) => {
    let id = parseInt(req.params.cid);
    
    let cartId = cartContent.find(cart => cart.id === id);
    if (id === undefined) {
        res.status(400).send({
            message: 'Faltan datos',
            description: 'id'
        });
    } else {
        if (!cartId) {
            res.status(404).send({
                message: 'Carro inexistente',
                description: `id: ${id}`
            });
        } else {
            cartContent = cartContent.filter(cart => cart.id !== id);
            cart.saveCart(cartContent).then(() => {
                res.status(200).send({
                    message: 'Carro eliminado',
                    cart: cartId
                })
            }).catch(err => {
                res.status(500).send({
                    message: 'Error',
                    description: err
                })
            }
            )
        }
    }
}

//Incorporar un producto al carro
//(Funcion del POST/:id)
const addProduct = (req, res) => {
    let id = parseInt(req.params.cid);
    let product = req.body;
    let cartIndex = cartContent.findIndex((prod) => prod.id === id )

    if (id === undefined) {
        res.status(400).send({
            message: 'Faltan datos',
            description: 'id'
        });
    } else {
        if (cartIndex === -1) {
            res.status(404).send({
                message: 'Carro inexistente',
                description: `id: ${id}`
            });
        } else {
            let cartProducts = cartContent[cartIndex].products
            let prodIndex = cartProducts.findIndex((prod) => prod.id === product.id);
            if (prodIndex != -1) {
                let noSe = cartContent[cartIndex].products[prodIndex]
                cartContent[cartIndex].products[prodIndex].quantity += 1;
            } else {
                cartContent[cartIndex].products.push({ id: product.id, quantity: 1 });
            }
            cart.saveCart(cartContent).then(() => {
                res.status(200).send({
                    message: 'Producto agregado',
                    cart: id,
                    product: product
                })
            }).catch(err => {
                res.status(500).send({
                    message: 'Error',
                    description: err
                })
            }
            )

        }
    }

}

//borrar item del carro
//(Funcion del DELETE/:id)
const deleteProduct = (req, res) => {
    let id = parseInt(req.params.cid);//cartId del front
    let prodId = parseInt(req.params.pid);//Product ID del Front
    let cartId = cartContent.findIndex((cart) => cart.id === id); //Index del Cart en CartContent
    let cartProducts = cartContent[cartId].products //Array de Productos
    let prodIndex = cartProducts.findIndex((prod) => prod.id === prodId)//Index del producto a eliminar
    if (id === undefined) {
        res.status(400).send({
            message: 'Faltan datos',
            description: 'Cart id'
        });
    } 
    if(prodId === undefined){
        res.status(400).send({
            message: 'Faltan datos',
            description: 'Product id'
        })
    }
    //else {
    if (cartId === -1) {
        res.status(404).send({
            message: 'Carro inexistente',
            description: `Cart id: ${id}`
        });
    } else {
        
        if (prodIndex === -1) {
            res.status(404).send({
                message: 'Producto inexistente',
                id: prodId
            })
        }else{
            const newArray = cartContent[cartId].products
            newArray.splice(prodIndex,1)
             cartContent[cartId].products = newArray
            
            cart.saveCart(cartContent).then(() => {
                res.status(200).send({
                    message: 'Producto eliminado',
                    cart: id,
                    product: prodId
                })
            }).catch(err => {
                res.status(500).send({
                    message: 'Error',
                    description: err
                })
            })
        }
            
    }

}
module.exports = {
    createCart,
    getCartId,
    deleteCartId,
    addProduct,
    deleteProduct
};
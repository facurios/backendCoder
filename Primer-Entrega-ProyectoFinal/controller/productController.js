const Products = require('../models/products.js')

// import __dirname from "../utils.js";

let products = new Products(__dirname + "/fileSystem/products/products.txt");

//inicializo productos
let productsContent = [];
const updateProductsArray = () => {
    products.getProducts().then(data => {
        if (data.length == 0) {
            productsContent = [];
        } else {

            productsContent = JSON.parse(data);
        }

    }).catch(err => {
        console.log(err);
    }
    )
}
updateProductsArray();



//Funciones controlador producto

//Get productos (Todos los productos)
//Metodo GET
const getProducts = (req, res) => {
    if (productsContent.length === 0) {
        res.status(404).send({
            message: 'No hay productos',
            description: 'No hay productos'
        });
    } else {
        res.status(200).send({
            message: 'Productos',
            products: productsContent
        });
    }
}


//get producto por id (Funcion del GET)
const getProductsByid = (req, res) => {
    let id = parseInt(req.params.pid);
    let product = productsContent.find(product => product.id === id);
    if (id === undefined) {
        res.status(400).send({
            message: 'Faltan datos',
            description: 'id'
        });
    } else {
        if (!product) {
            res.status(404).send({
                message: 'No hay productos',
                description: 'No hay productos'
            });
        } else {
            res.status(200).send({
                message: 'Producto',
                product: product
            });
        }
    }
}




//Crear un producto (Funcion del POST)
const createProduct = (req, res) => {
    let product = req.body;
    let { title, description, code, thumbnail, price, stock } = product;
    if (title === undefined || description === undefined || code === undefined || thumbnail === undefined || price === undefined || stock === undefined) {
        res.status(400).send({
            message: 'Faltan datos',
            description: 'Faltan datos'
        })
    } else {
        let id = productsContent[productsContent.length-1].id + 1;//tomo el id del ultimo objeto y le sumo 1
        product.id = id;
        let newProduct = {
            id: id,
            timestamp: Date.now(),
            title: title,
            description: description,
            code: code,
            thumbnail: thumbnail,
            price: price,
            stock: stock
        };
        productsContent.push(newProduct);
        products.saveProducts(productsContent).then(() => {
            res.status(200).send({
                message: 'Producto creado',
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
};


//Actualizar un producto (Funcion del PUT)
const updateProduct = (req, res) => {
    let id = parseInt(req.params.pid);
    let product = req.body;
    let { title, description, code, thumbnail, price, stock } = product;
    if (id === undefined) {
        res.status(400).send({
            message: 'Faltan datos',
            description: 'id'
        });
    } else {
        let productId = productsContent.find(product => product.id === id);
        if (!productId) {
            res.status(404).send({
                message: 'Producto inexistente',
                description: `id: ${id}`
            });
        } else {
            if (title === undefined || description === undefined || code === undefined || thumbnail === undefined || price === undefined || stock === undefined) {
                res.status(400).send({
                    message: 'Faltan datos',
                    description: 'Faltan datos'
                })
            } else {
                productId.title = title;
                productId.description = description;
                productId.code = code;
                productId.thumbnail = thumbnail;
                productId.price = price;
                productId.stock = stock;
                products.saveProducts(productsContent).then(() => {
                    res.status(200).send({
                        message: 'Producto actualizado',
                        product: productId
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
};


//Eliminar un producto (Funcion del DELETE)
const deleteProduct = (req, res) => {
    let id = parseInt(req.params.pid);
    if (id === undefined) {
        res.status(400).send({
            message: 'Faltan datos',
            description: 'id'
        });
    } else {
        let productId = productsContent.find(product => product.id === id);
        if (!productId) {
            res.status(404).send({
                message: 'Producto inexistente',
                description: `id: ${id}`
            });
        } else {
            productsContent = productsContent.filter(product => product.id !== id);
            products.saveProducts(productsContent).then(() => {
                res.status(200).send({
                    message: 'Producto eliminado',
                    description: `id: ${id}`
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




module.exports = {getProducts,
getProductsByid,
createProduct,
updateProduct,
deleteProduct}

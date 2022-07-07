const Contenedor = require('../../contenedor');
let contenedorShoppingCart = new Contenedor('shoppingCart');
let contenedorProduct = new Contenedor('product');

exports.create = async (req, res) => {
    let object = req.body;
    let id = await contenedorShoppingCart.save(object);
    res.send(id.toString());
};

exports.delete = async (req, res) => {
    let id = req.params.id;
    await contenedorShoppingCart.deleteById(id);
    res.send(id);
};

exports.getById = async (req, res) => {
    let id = req.params.id;
    let shoppingCart = await contenedorShoppingCart.getById(id);
    if (shoppingCart == null) {
        shoppingCart = { error: 'carrito no encontrado'};
    }
    res.send(shoppingCart);
};

exports.addProduct = async (req, res) => {
    let id = req.params.id;
    let id_prod = req.params.id_prod;
    let shoppingCart = await contenedorShoppingCart.getById(id);
    let product = await contenedorProduct.getById(id_prod);
    if (shoppingCart.productos === undefined) {
        shoppingCart.productos = [];
    }
    shoppingCart.productos.push(product);
    await contenedorShoppingCart.update(shoppingCart);
    res.send(id.toString());
};


exports.deleteProduct = async (req, res) => {
    let id = req.params.id;
    let id_prod = req.params.id_prod;
    let shoppingCart = await contenedorShoppingCart.getById(id);
    let productos = shoppingCart.productos.filter(element => element.id !== parseInt(id_prod));
    shoppingCart.productos = productos;
    console.log(shoppingCart);
    await contenedorShoppingCart.update(shoppingCart);
    res.send(id.toString());
};

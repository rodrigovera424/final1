const Contenedor = require('../../contenedor');
let contenedor = new Contenedor('product');

exports.get = async (req, res) => {
    let list = await contenedor.getAll();
    res.send(list);
};

exports.getById = async (req, res) => {
    let id = req.params.id;
    let product = await contenedor.getById(id);
    if (product == null) {
        product = { error: 'producto no encontrado'};
    }
    res.send(product);
};

exports.create = async (req, res) => {
    let product = req.body;
    let id = await contenedor.save(product);
    res.send(id.toString());
};

exports.update = async (req, res) => {
    let product = req.body;
    await contenedor.update(product);
    res.send();
};

exports.delete = async (req, res) => {
    let id = req.params.id;
    await contenedor.deleteById(id);
    res.send(id);
};
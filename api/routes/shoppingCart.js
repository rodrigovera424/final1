const express = require('express');
const router = express.Router();

const shoppingCartController = require('../controllers/shoppingCart');

router.post('/', shoppingCartController.create);
router.delete('/:id', shoppingCartController.delete);
router.get('/:id/productos', shoppingCartController.getById);
// No se entiende bien lo que pide la PPT, lo hize similar al delete, asumiendo que debo agregar un producto que existe en el catalogo al carrito
router.post('/:id/productos/:id_prod', shoppingCartController.addProduct);
//
router.delete('/:id/productos/:id_prod', shoppingCartController.deleteProduct);

router.use(function(req, res, next) {
    if (!req.route) {
        let message = { error : -2, descripcion: `ruta ${req.baseUrl} método ${req._parsedUrl.pathname} no implementada` }
        res.send(message);
    }
    next();
});

module.exports = router;
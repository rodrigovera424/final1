const express = require('express');
const router = express.Router();

const productController = require('../controllers/product');

router.get('/', productController.get);
router.get('/:id', productController.getById);
router.post('/', productController.create);
router.put('/:id', productController.update);
router.delete('/:id', productController.delete);

router.use(function(req, res, next) {
    if (!req.route) {
        let message = { error : -2, descripcion: `ruta ${req.baseUrl} método ${req._parsedUrl.pathname} no implementada` }
        res.send(message);
    }
});

module.exports = router;
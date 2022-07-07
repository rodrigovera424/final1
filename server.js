const express = require('express');

const administrador = true;
const productRoutes = require('./api/routes/product');
const shoppingCartRoutes = require('./api/routes/shoppingCart');

const app = express();

function errorHandler(err, req, res, next) {
    console.error(err);
    res.status(500).send(err.stack);
}

function authChecker(req, res, next) {
    if (administrador) {
        next();
    } else {
        let message = { error : -1, descripcion: `ruta ${req.baseUrl} método ${req._parsedUrl.pathname} no autorizada` }
        res.send(message);
    }
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(authChecker);
app.use("/api/productos", productRoutes);
app.use("/api/carrito", shoppingCartRoutes);

app.use(errorHandler);

const port = 8080;
app.listen(port, () => {
    console.log(`Servidor http escuchando en el puerto ${port}`);
});

const { Router } = require('express');
const path = require('path');
const ProductManager = require(path.resolve(__dirname, '../../manager/productsManager'));
const manager = new ProductManager('./src/data/products.json');

const router = Router();

router.get('/', async (req, res) => {

    const products = await manager.getProducts();
    const data = {
        title: "Productos agregados:",
        products
    }



    res.render('home', data);
})

router.get('/realtimeproducts', async (req, res) => {

    const products = await manager.getProducts();
    const data = {
        title: "Productos agregados:",
        products
    }



    res.render('realTimeProducts', data);
})

module.exports = router;
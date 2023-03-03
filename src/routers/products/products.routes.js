const { Router } = require('express');
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const ProductManager = require(path.resolve(__dirname, '../../manager/productsManager'));
const manager = new ProductManager('./src/data/products.json');

const router = Router();

// app.get('/', (req, res) => {
//     req.
//     res.send('Hello World!')
// })
//Routes
router.get('/', async (req, res) => {
    const products = await manager.getProducts();
    const limit = req.query.limit;
    const limitedProducts = [];
    console.log(products[0])

    if(req.query.limit) {

        for(let i=0; i<= +limit; i++) {
            limitedProducts.push(products[i]);
        }

        limitedProducts.length = +limit;

        return res.json({
            status: "success",
            data: limitedProducts
        })
    }
    res.json({
        status: "success",
        data: products
    })
})

router.get('/:pid', async (req, res) => {
    const products = await manager.getProducts();
    const productId = req.params.pid;
    const filteredProduct = products.find(prod => prod.id === productId);

    if(!filteredProduct) {
        return res.status(404).json({
            status: "error",
            error: "product not found"
        })
    }
    res.json({
        status: "success",
        data: filteredProduct
    })

})

router.post('/', async (req, res) => {
    const product = req.body;
    const id = uuidv4();
    product.id = id

    if(!product.title && !product.description && !product.code && !product.price && !product.status && !product.stock && !product.category) {
        return res.status(400).json({
            status: "error",
            error: "incomplete values"
        })
    }
    
    await manager.addProduct(product);

    res.json({
        status: "success",
        data: product
    })

})

router.put('/:pid', async (req, res) => {
    const productId = req.params.pid;
    const newProduct = req.body;
    const products = await manager.getProducts();

    const productIndex = products.findIndex(prod => prod.id === productId);

    
    if(!newProduct.title || !newProduct.description || !newProduct.code || !newProduct.price || !newProduct.status || !newProduct.stock || !newProduct.category) {
            return res.status(400).json({
                    status: "error",
                    error: "incomplete values"
                })
            }

    newProduct.id = products[productIndex].id;

    await manager.updateProduct(newProduct, productId);

    res.json({
        status: "success",
        data: newProduct,
    })
    
})

router.delete('/:pid', async (req, res) => {
    const productId = req.params.pid;
    const products = await manager.getProducts();
    const productIndex = products.findIndex(prod => prod.id === productId);
    manager.deleteProduct(productIndex);

    if(productIndex < 0) {
        return res.status(404).json({
            status: "error",
            error: "product not found"
        });
    }
    res.json({
        status: "success",
        data: "product deleted successfully"
    })
})

module.exports = router;
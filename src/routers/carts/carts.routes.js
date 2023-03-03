const { Router } = require('express');
const { v4: uuidv4 } = require('uuid');
const ProductManager = require('../../manager/productsManager');
const manager = new ProductManager('./src/data/carts.json');

const router = Router();

//Routes

router.get('/', async (req, res) => {
    const carts = await manager.getProducts();
    const limit = req.query.limit;
    const filteredCarts = [];

    if(req.query.limit) {

        for(let i=0; i <= +limit; i++) {
            filteredCarts.push(carts[i])
        }
        
        filteredCarts.length = +limit;

        return res.json({
            status:'success',
            data: filteredCarts
        })
    }

    res.json({
        status:'success',
        data: carts
    })
})

router.post('/', async (req, res) => {
    const id = uuidv4();
    const cart = {
        id: id,
        products: []
    }

    await manager.createCart(cart);

    res.json({
        status: "success",
        data: cart,
    })  
})

router.get('/:cid', async (req, res) => {
    const cartId = req.params.cid;

    const filteredCart = await manager.findItem(cartId);
    if(!filteredCart) {
        return res.status(404).json({
            status: "error",
            error: "cart not found"
        })
    }
    res.json({
        status: "succcess",
        data: filteredCart,
    })
})

router.post('/:cid/product/:pid', async (req, res) => {
    const cartId = req.params.cid;
    const productId = req.params.pid;

    const filteredCart = await manager.addToCart(cartId, productId);

    console.log(filteredCart)

    res.json({
        status: "success",
        data: filteredCart,
    })

})


module.exports = router;


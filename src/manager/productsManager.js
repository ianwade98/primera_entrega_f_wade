const fs = require('fs/promises');

class ProductManager {
    constructor(path) {
        this.path = path;
    }

    //products
    getProducts = async () => {
        const data = await fs.readFile(this.path, 'utf8');
        const products = await JSON.parse(data);
        return products;
    } 
    
    writeFile = async (data) => {
        const items = JSON.stringify(data, null, "\t");
        return await fs.writeFile(this.path, items, 'utf8');
    }
    
    addProduct = async (data) => {
        const products = await this.getProducts();
        const newProduct = data;
        products.push(newProduct);
        await this.writeFile(products);
        return products;
    }

    updateProduct = async (data, productId) => {
        const products = await this.getProducts();
        const newProduct = data;
        const productIndex = products.findIndex(prod => prod.id === productId);
        products[productIndex] = newProduct;
        await this.writeFile(products);
        return products;
    }

    deleteProduct = async (productIndex) => {
        const products = await this.getProducts();
        products.splice(productIndex, 1);
        await this.writeFile(products);
        return products;
    }

    //cart
    getCarts = async () => {
        const data = await fs.readFile(this.path, 'utf8');
        const carts = await JSON.parse(data);
        return carts;
    } 

    createCart = async (cart) => {
        const carts = await this.getProducts();
        carts.push(cart);
        await this.writeFile(carts);
        return carts;
    }

    findItem = async (id) => {
        const carts = await this.getProducts();
        const filteredCart = carts.find(cart => cart.id === id);
        if(filteredCart) {
            return filteredCart;
        }
    }

    addToCart = async (cartId, productId) => {
        const carts = await this.getProducts();
        const filteredCart = carts.find(cart => cart.id === cartId);

        if(filteredCart.products.some(prod => prod.product === productId)) {

            const filteredProduct = filteredCart.products.find(prod => prod.product === productId)
            filteredProduct.quantity ++;

            await this.writeFile(carts)
            return filteredProduct;
        } else {

            filteredCart.products.push({
                product: productId,
                quantity: 1
            })
            await this.writeFile(carts)
            return filteredCart;
        }
           
    }


}

module.exports = ProductManager;

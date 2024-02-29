import express from 'express';
import ProductManager from './ProductManager.js';

const app = express();
const PORT=8080;
const productManager = new ProductManager("./products.json");

app.use(express.urlencoded({extended:true}));

app.get('/',(req,res)=>{
    res.send("Home Page");
});

app.get('/products', async (req,res)=>{
    let products = await productManager.getProducts();
    let limit = req.query.limit;

    if(!limit)return res.send({products});

    let productsLimits = products.slice(0,limit);
    res.send({productsLimits});
});

app.get('/products/:pid', async (req,res)=>{
    let products = await productManager.getProducts();
    let idProduct = req.params.pid;
    
    let product = products.find(product=>product.id==idProduct);
    
    if(!product) return res.send("Product not found");

    res.send({product});
});

app.listen(PORT,()=>{console.log(`listening to the server on PORT ${PORT}`)});
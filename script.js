const products = [];

class ProductManager{
    constructor(title,description,price,thumbnail,code,stock){
    this.title = title;
    this.description = description;
    this.price = price;
    this.thumbnail = thumbnail;
    this.code = code;
    this.stock = stock;
    }

    static idProduct = 1;

    verificarCampos(product){
        if(product.title == "" || product.description == "" || product.price == undefined || product.thumbnail == "" || product.code == undefined || product.stock == undefined){
            return false;
        }else{
            return true;
        }      
    }

    addProduct(product){
        const existingCode = products.some(()=>products.code == product.code);
        const camposCompletos  = this.verificarCampos(product);

        if(existingCode && camposCompletos){
            console.log(`El producto con codigo ${product.code} ya existe`);
        }else if(!camposCompletos){
            console.log("La información del producto está incompleta");
        }else{
            products.push(product)
            product.id = ProductManager.idProduct;
            ProductManager.idProduct++;
            console.log(`Producto con código ${product.code} agregado con éxito.`);
        }
    }

    getProducts(){
        return products;
    }

    getProductById(id){
        const product = products.find((product)=>product.id == id);

        if(product == undefined){
            console.log(`El producto con id ${id} no existe`);
            return;
        }else{
            console.log(`El producto con ID: ${id} existe`);
            return product;

        }

    }
}

//inicializar taza
const clase1 = new ProductManager();
//CREO EL PRODUCTO
const producto1 = {
    title : "taza",
    description : "sirve para tomar el te o la leche",
    price : 400,
    thumbnail : "taza.png",
    code : 123,
    stock : 45,
}

const producto2 = {
    title : "vaso",
    description : "sirve para tomar el te o la leche",
    price : 200,
    thumbnail : "vaso.png",
    code : 321,
    stock : 45,
}

//agregar producto
clase1.addProduct(producto1);
clase1.addProduct(producto2);

//mostrar productos
console.log(clase1.getProducts());

//buscar por id
console.log(clase1.getProductById(4));
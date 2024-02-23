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

    //mejora de campos
    verifyFields({ title, description, price, thumbnail, code, stock }) {
        if (!title || !description || !price|| !thumbnail || !code || !stock) {
          return false;
        } else {
          return true;
        }
    }

    addProduct(product){
        //error corregido
        const existingCode = products.some((p)=>p.code == product.code);
        const camposCompletos  = this.verifyFields(product);

        if(existingCode){
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
        }else{
            console.log(`El producto con ID ${id}:`);
            return product;

        }
    }
}

//inicializar taza
const class1 = new ProductManager();

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

//producto con codigo repetido
const producto3 = {
    title : "plato",
    description : "sirve para poner comida y comer",
    price : 400,
    thumbnail : "plato.png",
    code : 123,
    stock : 45,
}

//producto con informacion incompleta
const producto4 = {
    title : "mesa",
    description : "sirve para comer en familia",
    price : 400,
    thumbnail : "",
    code : 1223,
    stock : 45,
}
//agregar producto
class1.addProduct(producto1);
class1.addProduct(producto2);
class1.addProduct(producto3);
class1.addProduct(producto4);

//mostrar productos
console.log(class1.getProducts());

//buscar por id
console.log(class1.getProductById(3));
import { promises as fs } from 'fs';

export default class ProductManager {
    constructor(path) {
        this.products = [];
        this.path = path;
    }

    //mejora de campos
    verifyFields({ title, description, price, thumbnail, code, stock }) {
        if (!title || !description || !price || !thumbnail || !code || !stock) {
            return false;
        } else {
            return true;
        }
    }

    async addProduct(product) {
        const existingCode = this.products.some((p) => p.code == product.code);
        const completedFields = this.verifyFields(product);

        if (existingCode) {
            console.log(`Product with code ${product.code} already exists.`);
        } else if (!completedFields) {
            console.log("Product information is incomplete.");
        } else {
            try {
                product.id = this.products.length + 1;
                this.products.push(product);
                console.log(`Product with code ${product.code} successfully added.`);
                await fs.writeFile(this.path, JSON.stringify(this.products, null, "\t"));
            } catch (error) {
                console.log(error);
            }
        }
    }

    async getProducts() {
        try {
            const productsFile = await fs.readFile(this.path, "utf-8");
            const products = JSON.parse(productsFile);
            return products;
        } catch (error) {
            console.log(error);
        }
    }

    async getProductById(id) {
        const products = await this.getProducts();
        const product = products.find((product) => product.id == id);
        if (!product) {
            console.log(`Product with id ${id} does not exist`);
        } else {
            return product;
        }
    }

    async updateProduct(id, updateProduct) {
        try {
            const products = await this.getProducts();
            const product = products.find((product) => product.id == id);
            const index = products.findIndex((product) => product.id == id);
            products[index] = { ...product, ...updateProduct };
            await fs.writeFile(this.path, JSON.stringify(products, null, "\t"));
            console.log("Product updated successfully.");
        } catch (error) {
            console.log(error);
        }
    }

    async deleteProduct(id) {
        try {
            const products = await this.getProducts();
            const index = products.findIndex((product) => product.id == id);
            products.splice(index, 1);
            await fs.writeFile(this.path, JSON.stringify(products, null, "\t"));
            console.log("Producto eliminado exitosamente.");
        } catch (error) {
            console.log(error);
        }
    }
}

//inicializar taza
const class1 = new ProductManager("./products.json");

//CREO EL PRODUCTO
const producto1 = {
    title: "taza",
    description: "sirve para tomar el te o la leche",
    price: 400,
    thumbnail: "taza.png",
    code: 12443,
    stock: 45,
}

const producto2 = {
    title: "vaso",
    description: "sirve para tomar el te o la leche",
    price: 200,
    thumbnail: "vaso.png",
    code: 321,
    stock: 50,
}

const producto3 = {
    title: "plato",
    description: "sirve para poner comida y comer",
    price: 400,
    thumbnail: "plato.png",
    code: 123,
    stock: 45,
}

//producto con informacion incompleta
const producto4 = {
    title: "mesa",
    description: "sirve para comer en familia",
    price: 400,
    thumbnail: "hola",
    code: 1223,
    stock: 45,
}

//---------TEST--------------
async function test() {
    await class1.addProduct(producto1);
    await class1.addProduct(producto2);
    await class1.addProduct(producto3);
    await class1.addProduct(producto4);

    //mostrar productos
    console.log(await class1.getProducts());

    //buscar por id
    console.log(await class1.getProductById(3));

    //actualizar producto
    await class1.updateProduct(2, {
        title: "vasoUpdate",
        description: "sirve para tomar el te o la leche",
        price: 200,
        thumbnail: "vaso.png",
        code: 321,
        stock:60
    });

    //eliminar producto
    await class1.deleteProduct(3);
    //mostrar productos con id eliminado
    console.log(await class1.getProducts());
}

//test();
//---------------------------------
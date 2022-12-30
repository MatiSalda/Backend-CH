import fs from 'fs';
import __dirname from '../utils.js';

export default class productManager{
    
    constructor(){
        this.path = `${__dirname}/files/products.json`;
        this.init();
    }

    init = async () => {
    if(!fs.existsSync(this.path)) await fs.promises.writeFile(this.path,JSON.stringify([]));
    }

    readProducts = async () => {
        let data =  await fs.promises.readFile(this.path,'utf-8');
        return JSON.parse(data);
    }

    getProducts = () => {
        return this.readProducts();
    }

    getProductsById = async (id) =>{
        const products = await this.readProducts();
        const product = products.find(prod => prod.id === id);

        return product;
    }

    exists = async(id) =>{
        let products = await this.readProducts();
        return products.some(products=> products.id === id);
    }

    addProduct = async (product) => {
        let products = await this.readProducts();
        const time = Date.now();
        const timestamp = new Date(time);
        product.timestamp = timestamp.toUTCString();
        if(products.length===0) product.id = 1 ;
        else product.id = products[products.length-1].id +1;
        products.push(product);
        await fs.promises.writeFile(this.path,JSON.stringify(products,null,'\t'));
    }

    updateProduct = async(id,data)=>{
        let products = await this.readProducts();
        let productUpdate = products.findIndex(p => p.id === id);
        data.id = parseInt(id)
        const time = Date.now();
        const timestamp = new Date(time);
        data.timestamp = timestamp.toUTCString()
        products[productUpdate] = data
        products = JSON.stringify(products,null,'\t')

        await fs.promises.writeFile(this.path , products);
    }


    deleteProduct = async (id) => {
        let data = await fs.promises.readFile(this.path, "utf-8")
        let productos = JSON.parse(data)
        if (productos.find(producto => producto.id === id)) {
        let newProduct = productos.filter((product) => product.id != id);
        await fs.promises.writeFile(this.path, JSON.stringify(newProduct, null,'\t'))}
    }
}
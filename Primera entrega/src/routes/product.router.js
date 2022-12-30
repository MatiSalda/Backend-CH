import { Router } from "express";
import productManager from "../managers/productManager.js";

const router = Router();
const productService = new productManager();

let admin=true

router.get('/', async (req,res)=>{
    const products = await productService.getProducts();
    res.send({status:"success",payload:products});
})

router.get('/:pid', async (req,res) => {
    const {pid} = req.params;
    const id = parseInt(pid)
    let product = await productService.getProductsById(id);
    res.send({status:"success",payload:product});
   
});

router.post('/', async (req,res)=>{
    if(admin==true){

        const {name,price,description,code,image,stock} = req.body;
        if(!name || !price || !description || !code || !image || !stock) return res.status(400).send({status:"error",error:"Incomplete Values"});
        const productToInsert ={
         name,
         price,
         description,
         code,
         image,
         stock
        }
        const result = await productService.addProduct(productToInsert);
        res.send({status:"success",message:"product is added"})
    } else {
        res.send({status:"error",message:"You dont have the required permissions"})
    }
})

router.put('/:pid', async (req,res) =>{
    if(admin===true){

        const {pid} = req.params;
        const id = parseInt(pid);

        let data = await productService.getProducts()

        let {name,price,description,code,image,stock} = req.body;
        
        let product = { 
            name,
            description,
            price,
            code,
            image,
            stock
        }
        

        if (!name || !description || !image || !price || !stock) {
            res.status(400).send({ status: "error", error: "Incomplete values" })
        
        } else if (data.some(prod => prod.id == pid)) {
            product.code = data.find(object => object.id == id).code;
            
            await productService.updateProduct(id, product)
            res.send({ status: "sucess", message: `Product with id ${pid} updated`})

        } else {
            res.send({ error: "Product not found"})
        }
    } else {
        res.send({status:"error",message:"You dont have the required permissions"})
    }
})

router.delete('/:pid', async (req,res)=>{
    if(admin==true){

        const {pid} = req.params;
        const id = parseInt(pid) 
        let product = await productService.deleteProduct(id)
        res.send({status:"success",payload:product});
    } else {
        res.send({status:"error",message:"You dont have the required permissions"})
    }
})
export default router;


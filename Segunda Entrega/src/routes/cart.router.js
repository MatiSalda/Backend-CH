import { Router } from "express"; 
import { Product, Cart } from "../daos/index.js";

const router = Router();

const carrito = new Cart("carritos");
const productos = new Product("productos")

router.get("/", async (req, res) => { 
    const result = await carrito.getAll()
    res.send({ status: "success", payload: result })
})

router.get("/:cid/products", async (req, res) => { 
    const { cid } = req.params
    const result = await carrito.getById(cid)
    if (result === null) {
        res.send({ error: "Cart not found"})
    } else {
        res.send({ status: "success", payload: result })
    }   
})

router.post("/", async (req, res) => {
    const result = await carrito.saveOne()
    res.send({ status: "sucess", message: "Cart added", idProduct: result })
})

router.post("/:cid/products/:pid", async (req, res) => { 
    let { cid, pid } = req.params;

    const carritoId = await carrito.getById(cid)
    const productoId = await productos.getById(pid)
    
    if (carritoId === null) {
        res.status(404).send({ status: "error", error: "Cart not found" })
    
    } else if (productoId === null) {
        res.status(404).send({ status: "error", error: "Product not found" })
    
    } else {
        carrito.saveContainerInContainer(cid, pid)
        res.send({ status: "success" })
    }
})

router.delete("/:cid", async (req, res) => {
    let { cid } = req.params
    const datosArchivo = await carrito.getAll()
    
    if (datosArchivo.some(carrito => carrito.id == cid)) { 
        await carrito.deleteById(cid)
        res.send({ status: "sucess", message: `Carrito con id ${cid} vaciado` })
    } else {
        res.send({ error: "Cart not found" })
    }
})

router.delete("/:cid/products/:pid", async (req, res) => {
    let { cid, pid } = req.params;

    const carritoId = await carrito.getById(cid)
    
    if (carritoId === null) {
        res.status(404).send({ status: "error", error: "Cart not found" })
    
    } else {
        const borrado = await carrito.deleteContainerInContainer(cid, pid)
        if (borrado) {
            res.send({ status: "success" })
        } else {
            res.status(404).send({ status: "error", error: "Product not found in cart" })
        }
        
    }
})

export default router;
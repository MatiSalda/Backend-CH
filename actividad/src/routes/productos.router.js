import {request, Router} from 'express'
import Contenedor from "../Contenedor/contenedor.js"
import uploader from '../servicios/upload.js'

const router = Router()
const contenedor = new Contenedor

router.get('/productos', async (req,res)=>{
   let all =  await contenedor.getAll()
       if (all.productos.length != 0) {
        res.render('home.handlebars', {        
            all
        })
    } else {
        res.render('home.handlebars', {        
            productos : {
                mensaje: "No se encontraron productos :c"
            }
        })
    }
})

router.get('/:id', async (req,res)=>{
    const id = req.params.id
    let getId = await contenedor.getById(id)
    res.send(getId)
})


router.post('/', uploader.single('imagen'), async (req,res)=>{
    let image = ""
    if (req.file) {
        image = "imagen/"+ req.file.filename
    }
    let producto = req.body;
    if ((producto.nombre && producto.precio) != '') {
        producto.imagen = image;
        const result = await contenedor.save(producto)
        res.send({ product: result })
    } else {
        res.send({ status: "error", message: "faltan completar campos obligatorios" })
    }
})

router.put('/:id', async (req,res)=>{
    const id = req.params.id
    const productoBody = req.body

    let result = await contenedor.actualizarProducto(productoBody, id)
    res.send(result)
})

router.delete('/:id',  (req, res) => {
    const id = req.params.id
    
    res.send(contenedor.deleteById(id))
})

// router.get('/', (req,res)=>{
//     res.render('chat.handlebars')
// })

export default router
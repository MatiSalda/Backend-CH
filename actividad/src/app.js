import express from 'express'
import __dirname from './utils.js'
import {Server} from 'socket.io'
import handlebars from 'express-handlebars'
import productosRouter from './routes/productos.router.js'
import viewsRouter from './routes/views.router.js'
import ContenedorSQL from './contenedor/contenedor.js'
import sqliteOpcions from './DB/knex.js'

const app = express()
const server = app.listen(8080, () => console.log("Escuchando :D"))
const io = new Server(server)

app.use(express.static(__dirname+'/public'))
app.use(express.json());
app.engine('handlebars',handlebars.engine())
app.set('views',__dirname +'/views')
app.set('view engine', 'handlebars')
app.use('/productos',productosRouter)
app.use('/chat', viewsRouter)
app.use('/',productosRouter)

const contenedor = new ContenedorSQL(sqliteOpcions, "products")
const arrayMsgServer = new ContenedorSQL(sqliteOpcions, "messages")

// PRODUCTOS
const products = [];
const readProducts = async () => {              
    let data = await contenedor.getAll()
    data.forEach(pdt => {
        products.push(pdt)
    });
}
readProducts();
io.on('connection', socket => {                 //conexion sv
    socket.emit('savedProducts', products)
    socket.on('addNew', data => {
        products.push(data)
        io.emit('savedProducts', products)
    })
})
    
// CHAT
const mensajes= []
io.on('connection', socket => {
    socket.emit('logs',mensajes)    
    socket.on('mensaje',data=>{
    mensajes.push(data)
    io.emit('logs',mensajes)
})   
socket.on('autenticado',data =>{
socket.broadcast.emit('nuevoUsuarioConectado', data)
    })
})
const readMessages = async () => {
    let data = await arrayMsgServer.getAll()
    data.forEach(msg => {
        messages.push(msg)
    })
}
readMessages();
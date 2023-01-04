import express from 'express'
import __dirname from './utils.js'
import handlebars from 'express-handlebars'
import productosRouter from './routes/productos.router.js'
import viewsRouter from './routes/views.router.js'
import {Server,Socket} from 'socket.io'

const app = express()
const server = app.listen(8080, () => console.log("Escuchando :D"))
const io = new Server(server)

app.use(express.static(__dirname+'/public'))
app.use(express.json());

// app.use('/api/productos',productosRouter)

app.engine('handlebars',handlebars.engine())
app.set('views',__dirname +'/views')
app.set('view engine', 'handlebars')

app.use('/productos',productosRouter)
app.use('/chat', viewsRouter)
app.use('/',productosRouter)

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






// const server = app.listen(8081, ()=>console.log('listening'));
// const io = new Server(server)

// const products = [];

// io.on('connection', socket => {            
//     socket.emit('savedProducts', products)

//     socket.on('addNew', data => {
//         products.push(data)
//         io.emit('savedProducts', products)
//     })
// })
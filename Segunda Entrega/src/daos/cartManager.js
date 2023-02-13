import fs from "fs"
import __dirname from "../utils.js"


class Cart { 
    constructor(nombreDelArchivo) {
        this.nombre = nombreDelArchivo
        this.path = `${__dirname}/json/${this.nombre}.json` 
    }

    async getAll() { 
        let datosArchivo = []
        if (fs.existsSync(this.path)) {
            datosArchivo = await fs.promises.readFile(this.path, "utf-8")
            datosArchivo = datosArchivo == "" ? [] : JSON.parse(datosArchivo) 
        }
        return datosArchivo
    }
    
    async saveOne() { 
        let datosArchivo = await this.getAll()
        const newContenedor = {
            timestamp: Date.now(),
            contenedor: [] 
        }
        if (datosArchivo.length === 0) {
            newContenedor.id = 1
        
        } else {
            const obtenerIds = datosArchivo.map(objeto => objeto.id)
            newContenedor.id = Math.max(...obtenerIds) + 1
        }
        datosArchivo.push(newContenedor) 
        datosArchivo = JSON.stringify(datosArchivo, null, "\t")
        await fs.promises.writeFile(this.path, datosArchivo)
        return newContenedor.id  
    }
    
    async getById(id) { 
        id = parseInt(id)
        const datosArchivo = await this.getAll()
        return datosArchivo.some(objeto => objeto.id === id) ? datosArchivo.find(contenedor => contenedor.id === id) : null
    }

    async saveContainerInContainer(idContGrande, idContChico) { 
        idContGrande = parseInt(idContGrande)
        idContChico = parseInt(idContChico)
        const datosArchivo = await this.getAll();
        let productos = datosArchivo.find(elemento => elemento.id === idContGrande).contenedor 

        if (productos.some(producto => producto.id === idContChico)) { 
            productos = productos.map(prod => {
                if (prod.id === idContChico){
                    prod.quantity++
                }
                return prod
            })
        } else {
            productos.push({
                id: idContChico,
                quantity: 1
            })
        }
        await fs.promises.writeFile(this.path, JSON.stringify(datosArchivo, null, "\t"));
    }

    async deleteById(id) { 
        id = parseInt(id)
        let datosArchivo = await this.getAll()
        let newDatosArchivo = datosArchivo.map(objeto => {
            if (objeto.id === id) {
                objeto.contenedor = []
            }
            return objeto
        })
        newDatosArchivo = JSON.stringify(newDatosArchivo, null, "\t")
        await fs.promises.writeFile(this.path, newDatosArchivo)
    }

    async deleteContainerInContainer(idContGrande, idContChico) { 
        idContGrande = parseInt(idContGrande)
        idContChico = parseInt(idContChico)
        let contenedorChicoBorrado = false
        const datosArchivo = await this.getAll();
        let newDatosArchivo = datosArchivo.map( objeto => { 
            if (objeto.id === idContGrande) {
                
                if (objeto.contenedor.some(producto => producto.id === idContChico)) { 
                    const indiceContChico = objeto.contenedor.findIndex(producto => producto.id === idContChico)
                    objeto.contenedor.splice(indiceContChico, 1);
                    contenedorChicoBorrado = true
                }
            }
            return objeto
        })
        newDatosArchivo = JSON.stringify(newDatosArchivo, null, "\t")
        await fs.promises.writeFile(this.path, newDatosArchivo)
        return contenedorChicoBorrado
    }
}

export default Cart
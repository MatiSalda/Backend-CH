import multer, { diskStorage } from 'multer'
import __dirname from '../utils.js'

const storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,__dirname+'/public/imagen')
    },filename:function(req,file,cb){
        cb(null,Date.now()+'-'+file.originalname)
    }
})

const uploader = multer({storage})

export default uploader
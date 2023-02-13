import mongoose from "mongoose";

const collection = 'productos';

const schema = new mongoose.Schema({
    title : {
        type : String,
        require : true
    },
    price : {
        type : Number,
        require : true
    },
    description: {
        type: String,
        required: true
    },
    thumbnail : {
        type : String,
        require : true
    }, 
    stock : { 
        type : Number,
        require : true
    }
});

const productModel = mongoose.model(collection,schema);

export default productModel;
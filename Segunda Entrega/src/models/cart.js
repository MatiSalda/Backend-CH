import mongoose from "mongoose";

const collection = 'Carts';

const schema = new mongoose.Schema({
    timestamp :{
        type : Number ,
        require : true
    },
    products : {
        type : Array,
        require : true
    }
});
const cartModel = mongoose.model(collection,schema);

export default cartModel;
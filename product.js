const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name:  {
    type:String,
    required: true
  },
  description:{
    type:String,
    default:""
  },
  price:{
    this:String,
    required:true
  },
  src:  {
    type:String,
    required: true
  },
  user_id:{
    type:String,
    required: true
  },
  stock: {
    type:Number,
    default:1
  }
},
{ timestamps: true }
);

const productModel = mongoose.model('product', cartSchema);

module.exports = productModel;

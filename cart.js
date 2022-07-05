const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  product_name:{
    type:String,
    required: true
  },
  product_price:{
    type:String,
    required: true
  },
  product_id:{
    type:String,
    required: true
  },
  product_image:  {
    type:String,
    required: true
  },
  product_description:{
    type:String,
    default:""
  },
  user_id:{
    type:String,
    required: true
  },
  quantity: {
    type:Number,
    default:1
  }
},
{ timestamps: true }
);

const cartModel = mongoose.model('cart', cartSchema);

module.exports = cartModel;

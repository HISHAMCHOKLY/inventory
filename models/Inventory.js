const mongoose=require('mongoose')
let inventorySchema=new mongoose.Schema({
    id:String,
    productId:String,
    productName:String,
    productQty:String
}) 
module.exports=mongoose.model('Inventory',inventorySchema)
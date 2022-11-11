const mongoose=require('mongoose')
let historySchema=new mongoose.Schema({
    id:String,
    productId:String,
    productName:String,
    itemId:String,
    employeeName:String,
    date:String,
    time:String
})
module.exports=mongoose.model('History',historySchema)
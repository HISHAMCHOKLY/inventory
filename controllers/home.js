let History=require('../models/History')
let Inventory=require('../models/Inventory')


exports.getHome=(req,res)=>{
    res.render('home')
}

exports.getAddItem=(req,res)=>{
    res.render('addItem')
}
exports.addItem=async(req,res)=>{
    let {productid,productname,itemid,employeename}=req.body
    let offset=+5.5 //india time zone code this code get from (https://timezonedb.com/time-zones)
    var date = new Date();
    var utc=date.getTime()+(date.getTimezoneOffset()*60000)
    var nd=new Date(utc+(3600000*offset))
    let today=nd.toLocaleString().split(',')
    var current_date = today[0]
    var current_time = today[1]
    await History.create({id:Date.now(),productId:productid,productName:productname,itemId:itemid,employeeName:employeename,date:current_date,time:current_time})
    let product=await Inventory.findOne({productId:productid})
    if(product){
        product.productQty++
        product.save()
    }else{
        await Inventory.create({id:Date.now(),productId:productid,productName:productname,productQty:1})
    }
    res.redirect('/addItem')
}

exports.getInventory=async(req,res)=>{
    let inventory=await Inventory.find()
    res.render('inventory',{inventory})
}
exports.getHistory=async(req,res)=>{
    let history=await History.find()
    res.render('history',{history})
}
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
    var date = new Date();
    var current_date = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+ date.getDate();
    var current_time = date.getHours()+":"+date.getMinutes()+":"+ date.getSeconds();
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
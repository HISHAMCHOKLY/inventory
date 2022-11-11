const express = require('express')
const { getAddItem, getHome, getInventory, getHistory, addItem } = require('../controllers/home')
const router=express.Router()


router
    .route('/')
    .get(getHome) 
router
    .route('/addItem')
    .get(getAddItem)
    .post(addItem)

router
    .route('/inventory')
    .get(getInventory)    

router
    .route('/history')
    .get(getHistory)    
    



module.exports=router

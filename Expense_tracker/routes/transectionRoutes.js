const express= require('express');
const { addTransection, getAllTransection,editTransection,deleteTransection } = require('../controllers/transectionController');


//router object
const router= express.Router()

//routes
//add transections
router.post('/add-transection',addTransection)

//edit transaction
router.post('/edit-transection',editTransection)

//delete transaction
router.post('/delete-transection',deleteTransection)

//get transections
router.post('/getall-transection',getAllTransection)


//export
module.exports=router
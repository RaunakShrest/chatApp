const express= require('express')
const { protect } = require('../middlewares/authMiddleware')

const router= express.Router()


// router.route('/').post(protect,sendMessage)

//for fetching the message for one single chat
// router.route('/:chatId').get(protect,allMessages) 

module.exports=router
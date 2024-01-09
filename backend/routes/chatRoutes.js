const express= require('express')
const {protect} = require("../middlewares/authMiddleware")
const {accessChat,removeFromGroup,fetchChats,createGroupChat,renameGroup,addToGroup}= require("../controllers/chatControllers")
const router= express.Router();
 router.route('/').post(protect,accessChat) // protect middleware because if the user is not loged In the user cannot access
 router.route('/').get(protect,fetchChats) 
router.route("/group").post(protect,createGroupChat)
 router.route("/rename").put(protect,renameGroup)
router.route("/groupremove").put(protect,removeFromGroup)
 router.route("/groupadd").put(protect,addToGroup)


module.exports= router;
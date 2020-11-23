const express = require("express")
const router = express.Router()
const messageCtrl = require("../controllers/message")
const multer = require("../middleware/multer-config")

router.get("/", messageCtrl.findAllMessages)
router.get("/users/:id", messageCtrl.findAllMessagesForOne)
router.get("/:id", messageCtrl.findOneMessage)
router.post("/", multer, messageCtrl.createMessage)
router.put("/:id", multer, messageCtrl.modifyMessage)
router.delete("/:id", messageCtrl.deleteMessage)

module.exports = router
const express = require("express")
const router = express.Router()
const commentCtrl = require("../controllers/comment")

router.get("/messages/:id", commentCtrl.findAllComments)
router.get("/:id", commentCtrl.findOneComment)
router.post("/", commentCtrl.createComment)
router.put("/:id", commentCtrl.modifyComment)
router.delete("/:id", commentCtrl.deleteComment)

module.exports = router
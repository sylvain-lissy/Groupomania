const express = require("express")
const router = express.Router()
const userCtrl = require("../controllers/user")
const multer = require("../middleware/multer-config")

router.get("/:id", userCtrl.findOneUser)
router.put("/:id", multer, userCtrl.modifyUser)

module.exports = router
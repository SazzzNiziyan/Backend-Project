const express = require("express")
const musicController = require("../controller/music.controller")
const { authCreator, authUser } = require("../middleware/auth.middleware")
const multer = require("multer")

const upload = multer({ storage: multer.memoryStorage() })

const router = express.Router()

router.post("/upload", authCreator, upload.single("music"), musicController.createMusic)
router.post("/create-album", authCreator, musicController.createAlbum)
router.get("/get-music", authUser, musicController.getMusic)
router.get("/get-album", authUser, musicController.getAlbum)
router.get("/get-album/:albumId", authUser, musicController.getAlb)


module.exports = router
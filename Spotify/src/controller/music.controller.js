const musicModel = require("../model/music.model");
const albumModel = require("../model/album.model");
const jwt = require("jsonwebtoken");
const { uploadFile } = require("../service/storage.service");

async function createMusic(req, res) {

    const { title } = req.body;
    const file = req.file;

    const result = await uploadFile(file.buffer.toString("base64"));

    const music = await musicModel.create({
      uri: result.url,
      title,
      artist: req.user.id,
    });

    res.status(201).json({
      message: "music created successfully",
      music,
    });
}
async function createAlbum(req, res) {

    const music = await musicModel.find().populate("artist", "name email");

    const { title } = req.body;

    const album = await albumModel.create({
      title,
      music: music.map((m) => m._id),
      aritst: req.user.id,
    });

    res.status(201).json({
      message: "album created successfully",
      album,
    });
} 
async function getMusic(req, res) {

  // .limit is used to limit the number of documents returned in the query. In this case, it limits the result to 10 music documents.
  // .skip is used to skip a certain number of documents in the query. In this case, it skips 0 documents, meaning it starts from the first document.

  try {
    const music = await musicModel
    .find()
    .limit(10)
    .skip(0)
    .populate("artist", "username email");

    res.status(200).json({
      message: "music retrieved successfully",
      music,
    });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving music", error });
  }
}
async function getAlbum(req, res) {

  //.select("title music aritst").populate("music", "title uri").populate("aritst", "username email")
  //this will retrieve all albums and populate the music and artist fields with their respective data. The select method is used to specify which fields to include in the response.
  try {
    const album = await albumModel.find().populate("aritst", "username email").populate("music", "title uri");    

    res.status(200).json({
      message: "album retrieved successfully",
      album,
    });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving album", error });
  }
}
async function getAlbumById(req, res) {
  const  albumId  = req.params.albumId;
  const album = await albumModel.findById(albumId).populate("aritst", "username email").populate("music", "title uri");

  return res.status(200).json({
    message: "album retrieved successfully",
    album,
  });
}

module.exports = {
  createMusic,
  createAlbum,
  getMusic,
  getAlbum,
  getAlbumById,
};
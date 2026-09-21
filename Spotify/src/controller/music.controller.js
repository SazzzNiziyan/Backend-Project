const musicModel = require("../model/music.model");
const jwt = require("jsonwebtoken");
const { uploadFile } = require("../service/storage.service");

async function createMusic(req, res) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(409).json({ message: "Unathroized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.role !== "creator") {
      return res.status(403).json({
        message:
          "the user is not have permission for creating a music or a song",
      });
    }

    const { title } = req.body;
    const file = req.file;

    const result = await uploadFile(file.buffer.toString("base64"));

    const music = await musicModel.create({
      uri: result.url,
      title,
      artist: decoded.id,
    });

    res.status(201).json({
      message: "music created successfully",
      music,
    });


  } catch (err) {
    return res.status(401).json({ message: "the user not found" });
  }
}

module.exports = { createMusic };

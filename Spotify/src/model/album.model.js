const mongoose = require('mongoose');

const albumSchema = new mongoose.Schema({});

const albumModel = mongoose.model('album', albumSchema);

module.exports = albumModel;
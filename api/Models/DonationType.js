const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const donTypeSchema = mongoose.Schema({
    _id: {type: mongoose.Types.ObjectId, auto: true},
    donName: { type: String, required: true},
    isActive: {type: Boolean, required:true, default:1},
});

module.exports = mongoose.model('DonationType', donTypeSchema);
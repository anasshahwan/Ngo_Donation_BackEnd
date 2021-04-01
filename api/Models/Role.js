const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const roleSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    type:{ type: String , required: true},
});

module.exports = mongoose.model('Role', roleSchema);
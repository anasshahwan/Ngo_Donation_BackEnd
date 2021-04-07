const mongoose = require('mongoose');
var Schema = mongoose.Schema

const donationSchema = mongoose.Schema({
    _id: {type: mongoose.Types.ObjectId, auto: true},
    userId : { type: Schema.Types.ObjectId, ref: 'User'},
    amount : Number,
    donType: [{ type: Schema.Types.ObjectId, ref:'DonationType'}],
    dateCreated: {type: Date, default: Date.now}
});
module.exports = mongoose.model('Donation', donationSchema);

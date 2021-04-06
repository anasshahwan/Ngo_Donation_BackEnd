const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const userInformationSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    cma:{ type: String , default :" "},
    phone_number:{ type: String ,default :" "},
    address:{ type: String ,default :" "},
    city:{ type: String , default :" "},
    state:{ type: String , default :" "},
    zip_code:{ type: String , default :" "},
    country:{ type: String , default :" "},

    user_id : { type: Schema.Types.ObjectId, ref: 'User'},

    
});

module.exports = mongoose.model('UserInformations', userInformationSchema);
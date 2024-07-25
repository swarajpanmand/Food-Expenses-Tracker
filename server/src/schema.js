const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true
    },
    item: {
        type: String,
        required: true
    },
    cost: {
        type: Number,
        required: true
    },
    itemBrief:{
        type: String,
        required: false
    }

})

const User = mongoose.model('User', UserSchema);

module.exports = User;
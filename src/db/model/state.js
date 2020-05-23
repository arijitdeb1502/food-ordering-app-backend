const mongoose = require('mongoose');

const State = mongoose.model('State', {
    state_uuid: {
        type: String,
        required: true,
        trim: true
    },
    state_name: {
        type: String,
        required: true,
        trim: true
    }
})

module.exports = State 
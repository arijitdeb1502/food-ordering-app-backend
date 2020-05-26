const mongoose = require('mongoose');

const stateSchema = mongoose.Schema({
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

// stateSchema.virtual('addresses', {
//     ref: 'Address',
//     localField: '_id',
//     foreignField: 'state'
// })

const State = mongoose.model('State', stateSchema);

module.exports = State 
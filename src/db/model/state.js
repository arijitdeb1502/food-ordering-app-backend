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


stateSchema.methods.toJSON = function () {
    const state = this;
    const stateObject = state.toObject();

    delete stateObject._id;
    
    return stateObject
}

const State = mongoose.model('State', stateSchema);

module.exports = State 
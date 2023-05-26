const mongoose = require('mongoose')

const discussionSchema = new mongoose.Schema({
    group: {type:mongoose.Types.ObjectId, ref: 'group'},
    
    recipients: [{ type: mongoose.Types.ObjectId, ref: 'user' }],
    title: String,
    text: String,
    media: Array,
    call: Object
}, {
    timestamps: true
})

module.exports = mongoose.model('discussion', discussionSchema)
const mongoose = require('mongoose');

const followSchema = new mongoose.Schema({   
    follower: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"instaUser",
        required: [true, 'Follower username is required']},
    followee: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"instaUser",
        required: [true, 'Followee username is required']},
    status: {type: String, 
    default: 'pending',
    enum: {
        values:['pending', 'accepted', 'rejected'],
        message: 'Status must be either pending, accepted, or rejected'
    }} ,
    timestamp: {type: Date, default: Date.now}
})

followSchema.index({ follower: 1, followee: 1 }, { unique: true });

const Followmodel = mongoose.model('Follow', followSchema);

module.exports = Followmodel;       


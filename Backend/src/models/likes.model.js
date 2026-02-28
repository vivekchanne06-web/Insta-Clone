const mongoose = require('mongoose');

const likesSchema = new mongoose.Schema({
    post:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'instaposts',
        required: [true, 'Post ID is required for a like']
    },
    user:{
        type: String,
        required: [true, 'Username is required for a like']
    },
    timestamp: { type: Date, default: Date.now }    

})
likesSchema.index({ post: 1, user: 1 }, { unique: true });

const LikesModel = mongoose.model('Like', likesSchema);

module.exports = LikesModel;
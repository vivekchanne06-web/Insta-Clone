const mongoose = require('mongoose');


const postSchema = new mongoose.Schema({
    caption: {
        type: String,
        default: ''
    },
    image: {
        type: String,
        required: [ true, 'Image is required']
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'instaUser',
        required: [ true, 'UserId is required']
    },

})


const PostModel = mongoose.model('instaPost', postSchema);

module.exports = PostModel; 
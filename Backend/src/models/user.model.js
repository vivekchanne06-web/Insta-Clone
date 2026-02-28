const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: [true,'Username already exists'],
        required: [ true, 'Username is required']
    },
    email: {
        type: String,
        unique: [true, 'Email already exists'],
        required: [ true, 'Email is required']
    },
    password: {
        type: String,
        required: [ true, 'Password is required'],
        select: false
    },
    bio:{
        type: String,
    },
    profilePicture: {
        type: String,
        default: 'https://ik.imagekit.io/92zjoomsi/24-248253_user-profile-default-image-png-clipart-png-download.png'
    },
})

const UserModel = mongoose.model('instaUser', userSchema);

module.exports = UserModel;
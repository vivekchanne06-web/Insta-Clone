const UserModel = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


async function registerController(req, res) {
   const { username, email, password, bio, profilePicture } = req.body;

   const isUserExist = await UserModel.findOne({
     $or: [{ username }, { email }] 
    });

    if (isUserExist) {
        return res.status(409).json({ 
            message: 'User already exists'
        });


    }

    const hash =  await bcrypt.hash(password, 10);

    const user = await UserModel.create({
        username,
        email,
        bio,
        profilePicture,
        password: hash
    }); 

    const token = jwt.sign({
      id: user._id,
      username: user.username
   }, process.env.JWT_SECRET, 
         { expiresIn: '1d' });

    res.cookie("token", token,)

    res.status(201).json({
         message: 'User registered successfully',
         user: {
            username: user.username,
            email: user.email,
            bio: user.bio,
            profilePicture: user.profilePicture
         }
    });

    
}; 



async function loginController(req, res) {

const { username, email, password } = req.body;


const user = await UserModel.findOne({
    $or: [{ username }, { email }] 
}).select("+password")

if (!user) {
    return res.status(404).json({ message: 'User not found' });
}


const validPassword = await bcrypt.compare(password, user.password);

if (!validPassword) {
    return res.status(401).json({ message: 'Invalid credentials' });    

}

const token = jwt.sign({
      id: user._id,
      username: user.username
   }, process.env.JWT_SECRET, 
    { expiresIn: '1d' });
 
res.cookie("token", token)


res.status(200).json({
    message: 'Login successful',
    user: {
        username: user.username,
        email: user.email,
        bio: user.bio,
        profilePicture: user.profilePicture
    }
}); 
}

async function getController (req , res) {
    const userId= req.user.id


    const user = await UserModel.findById(userId)


    res.status(200).json({
        message:"User Fetch Successfully",
        user: {
            username: user.username,
            email: user.email,
            bio: user.bio,
            profilePicture: user.profilePicture
         }
    })
}



module.exports = {
    registerController,
    loginController,
    getController
}
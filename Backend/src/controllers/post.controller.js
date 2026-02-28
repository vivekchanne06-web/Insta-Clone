const express = require('express');
const Postmodel = require('../models/post.model');
const { ImageKit, toFile } = require("@imagekit/nodejs");
require("dotenv").config();
const LikesModel = require('../models/likes.model');




const imagekit = new ImageKit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  
});



async function createPostController(req, res) {
    
    
   
    const file = await imagekit.files.upload({
        file: await toFile(req.file.buffer, req.file.originalname),
        fileName: req.file.originalname,
        folder: 'posts'
    });
 
    
    const Post = await Postmodel.create({
        
        
        caption: req.body.caption,
        image: file.url,
        userId: req.user.id
    })

    res.status(201).json({ 
        message: "Post created successfully",
        Post,
        });
}

async function getPostsController(req, res) {

    const posts = await Postmodel.find({ 
        userId: req.userid
    });

    res.status(200).json({
        message: "Posts retrieved successfully",
        posts
    });
}

async function getPostDetailsController(req, res) {
        const userId = req.userId;
        const postId = req.params.postId;

    const post = await Postmodel.findById(postId);
    if (!post) {
        return res.status(404).json({ message: "Post not found" });
    }

    const validPost = post.userId.toString() === userId.toString();
    if (!validPost) {
        return res.status(403).json({ message: "Forbidden access" });
    }

    res.status(200).json({
        message: "Post details retrieved successfully",
        post
    });
}


async function likePostController(req, res) {

    const userId = req.user.username;
    const postId = req.params.postId;




    const post = await Postmodel.findById(postId);
    if (!post) {
        return res.status(404).json({ message: "Post not found" });
    }

    const like = await LikesModel.create({
        post: postId,
        user: userId
    });

    res.status(200).json({
        message: "Post liked successfully",
        like
    });
}


async function unlikePostController(req, res) {

    const userId = req.user.username;
    const postId = req.params.postId;

    const like = await LikesModel.findOneAndDelete({
        post: postId,
        user: userId
    });

    if (!like) {
        return res.status(404).json({ message: "Like not found" });
    }

    res.status(200).json({
        message: "Post unliked successfully",
        like
    });
}


async function getFeedController (req,res){

    const user =req.user

    const posts  = await Promise.all((await Postmodel.find().populate('userId').sort({ _id: -1 }).lean())
    .map(async (post)=>{


        const isLiked = await LikesModel.findOne({
        user :user.username,
        post: post._id
    })

        post.isLiked =!!isLiked
        
    return post    
}))


    res.status(200).json({
        message: "Posts fetched successfully",
        posts
    });
}
    
module.exports = {
    createPostController,
    getPostsController,
    getPostDetailsController,
    likePostController,
    getFeedController,
    unlikePostController
};
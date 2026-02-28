const Followmodel = require('../models/follow.model');
const UserModel = require('../models/user.model');

async function followUserController(req, res) {

  const followerId = req.user.id;
  const followeeUsername = req.params.username;

  const followee = await UserModel.findOne({
    username: followeeUsername
  });

  if (!followee)
    return res.status(404).json({ message: "User not found" });

  if (followerId === followee._id.toString())
    return res.status(400).json({ message: "You cannot follow yourself" });

  const existingFollow = await Followmodel.findOne({
    follower: followerId,
    followee: followee._id
  });

  if (existingFollow)
    return res.status(400).json({ message: "Already requested" });

  const follow = await Followmodel.create({
    follower: followerId,
    followee: followee._id
  });

  res.status(201).json({ message: "Follow request sent", follow });
}

async function unfollowUserController(req, res) {

  const followerId = req.user.id;
  const followeeUsername = req.params.username;

  const followee = await UserModel.findOne({
    username: followeeUsername
  });

  await Followmodel.findOneAndDelete({
    follower: followerId,
    followee: followee._id
  });

  res.json({ message: "Unfollowed successfully" });
}

async function acceptFollowController(req, res) {

    const followerUsername = req.params.username;
    const followeeId = req.user.id;

    
    const follower = await UserModel.findOne({
        username: followerUsername
    });

    if (!follower) {
        return res.status(404).json({
            message: "Follower user not found"
        });
    }

    const followRequest = await Followmodel.findOne({
        follower: follower._id,
        followee: followeeId
    });

    if (!followRequest) {
        return res.status(404).json({
            message: "Follow request not found"
        });
    }

    if (followRequest.status !== "pending") {
        return res.status(400).json({
            message: "Request already processed"
        });
    }

    followRequest.status = "accepted";
    await followRequest.save();

    res.status(200).json({
        message: `${followerUsername} is now following you`
    });
}

async function rejectFollowRequest(req, res) {

    const followerUsername = req.params.username;
    const followeeId = req.user.id;

    const follower = await UserModel.findOne({
        username: followerUsername
    });

    if (!follower) {
        return res.status(404).json({
            message: "Follower user not found"
        });
    }

    const rejectFollow = await Followmodel.findOne({
        follower: follower._id,
        followee: followeeId
    });

    if (!rejectFollow) {
        return res.status(404).json({
            message: "Follow request not found"
        });
    }

    if (rejectFollow.status !== "pending") {
        return res.status(400).json({
            message: "Request already processed"
        });
    }

    rejectFollow.status = "rejected";
    await rejectFollow.save();

    res.status(200).json({
        message: "Follow request rejected"
    });
}


async function getFollowStatus(req, res) {

  const followerId = req.user.id;
  const followeeUsername = req.params.username;

  const followee = await UserModel.findOne({
    username: followeeUsername
  });

  const follow = await Followmodel.findOne({
    follower: followerId,
    followee: followee._id
  });

  if (!follow)
    return res.json({ status: "none" });

  res.json({ status: follow.status });
}

async function getFollowers(req, res) {

  const username = req.params.username;

  const user = await UserModel.findOne({ username });

  const followers = await Followmodel.find({
    followee: user._id,
    status: "accepted"
  })
  .populate("follower", "username profilePicture");

  res.json({ followers });
}

async function getFollowing(req, res) {

  const username = req.params.username;

  const user = await UserModel.findOne({ username });

  const following = await Followmodel.find({
    follower: user._id,
    status: "accepted"
  })
  .populate("followee", "username profilePicture");

  res.json({ following });
}

async function getSuggestions(req, res) {

    const currentUserId = req.user.id;

    
    const following = await Followmodel.find({
        follower: currentUserId,
        status: "accepted"
    }).select("followee");

    const followingIds = following.map(f => f.followee);

    
    const suggestions = await UserModel.find({
        _id: {
            $nin: [...followingIds, currentUserId]
        }
    })
    .select("username profilePicture")
    .limit(5);

    res.status(200).json({
        suggestions
    });
}

async function getPendingRequests(req, res) {

  const currentUserId = req.user.id;

  const requests = await Followmodel.find({
    followee: currentUserId,
    status: "pending"
  })
  .populate("follower", "username profilePicture");

  res.status(200).json({
    requests
  });
}

module.exports = { followUserController, unfollowUserController,getFollowing
    ,acceptFollowController,getPendingRequests,rejectFollowRequest ,getFollowStatus,getFollowers, getSuggestions};
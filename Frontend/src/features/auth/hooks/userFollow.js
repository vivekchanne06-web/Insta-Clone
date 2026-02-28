import React, { useContext } from 'react'
import { FollowContext } from "../../post/follow.context";
import { getFollowers,getPendingRequests ,getFollowing,getSuggestions,followUser,unfollowUser,acceptFollow,rejectFollow } from '../services/user.api'


export const userFollow = () => {
    const context =useContext(FollowContext);

    const { setFollowers,suggestions, requests, setRequests,setSuggestions ,setFollowing, followers, following } = context

    

    const fetchFollowers = async (username) => {
        try {
            const data = await getFollowers(username)
            setFollowers(data.followers);
        } catch (err) {
            console.error(err);
        }
    }

    const fetchFollowing = async (username) => {
        try {
            const data = await getFollowing(username)
            setFollowing(data.following);
        } catch (err) {
            console.error(err);
        }
    }

    const fetchSuggestions = async () => {
        try {
            const data = await getSuggestions()  
            setSuggestions(data.suggestions);
            } catch (err) {
            console.error(err);
        }
    }

    const handleFollow = async (targetUsername, currentUsername) => {
     try {
    setSuggestions(prev =>
      prev.filter(user => user.username !== targetUsername)
    );
    await followUser(targetUsername);
    await fetchFollowing(currentUsername);

  } catch (err) {
    console.error(err);
  }
    }

    const handleUnfollow = async (targetUsername, currentUsername) => {
  try {
    await unfollowUser(targetUsername);
    await fetchFollowing(currentUsername);

  } catch (err) {
    console.error(err);
  }
    }

    const fetchRequests = async () => {
    try {
    const data = await getPendingRequests();
    setRequests(data.requests);
    } catch (err) {
    console.error(err);
     }
    }

    const handleAccept = async (username, currentUsername) => {
    await acceptFollow(username);
    setRequests(prev =>
    prev.filter(r => r.follower.username !== username))
    await fetchFollowers(currentUsername);
    }

    const handleReject = async (username) => {
    
    await rejectFollow(username);
    setRequests(prev =>
    prev.filter(r => r.follower.username !== username))
    }
    
  return {
    fetchFollowers,
    fetchFollowing,
    fetchSuggestions,
    followers,
    following,
    suggestions,
    handleFollow,
    handleUnfollow,
    fetchRequests,
    handleAccept,
    handleReject,
    requests,
    setRequests
  }
}

 

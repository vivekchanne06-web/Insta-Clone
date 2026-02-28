import React, { useEffect } from "react";
import "./style/feed.scss";

import Post from "../components/Post";
import Nav from "../../shared/components/Nav";

import { usePost } from "../hooks/usePost";
import { useAuth } from "../hooks/useAuth";
import { userFollow } from "../hooks/userFollow";

const Feed = () => {
  const { user } = useAuth();

  const {
    feed,
    handleGetFeed,
    loading,
    handleLikePost,
    handleUnlikePost,
  } = usePost();

  const {
    followers,
    following,
    suggestions,
    requests,
    handleFollow,
    handleUnfollow,
    fetchFollowers,
    fetchFollowing,
    fetchSuggestions,
    handleAccept,
    handleReject,
    fetchRequests,
  } = userFollow();

  useEffect(() => {
    handleGetFeed();

    if (user) {
      fetchFollowers(user.username);
      fetchFollowing(user.username);
      fetchSuggestions();
      fetchRequests();
    }
  }, [user]);

  if (loading) {
    return (
      <main>
        <h1>feed is loading</h1>
      </main>
    );
  }

  

  return (
    <>
      <Nav />

      <main className="main-layout">
    
        <div className="left-sidebar">
          {/* FOLLOWING */}
          <h4>Following</h4>

          {following?.map((item) => (
            <div className="user-row" key={item._id}>
              <div className="user-info">
                <img src={item.followee.profilePicture} alt="" />
                <span>{item.followee.username}</span>
              </div>

              <button
                className="follow-btn"
                onClick={() =>
                  handleUnfollow(
                    item.followee.username,
                    user.username
                  )
                }
              >
                Following
              </button>
            </div>
          ))}

          {/* FOLLOWERS */}
          <h4 className="section-title">Followers</h4>

          {followers?.map((item) => (
            <div className="user-row" key={item._id}>
              <div className="user-info">
                <img src={item.follower.profilePicture} alt="" />
                <span>{item.follower.username}</span>
              </div>

              <button
                className="follow-btn"
                onClick={() =>
                  handleFollow(
                    item.follower.username,
                    user.username
                  )
                }
              >
                Follow
              </button>
            </div>
          ))}

          {/* SUGGESTIONS */}
          <h4 className="section-title">Suggestions For You</h4>

          {suggestions?.map((userItem) => (
            <div className="user-row" key={userItem._id}>
              <div className="user-info">
                <img src={userItem.profilePicture} alt="" />
                <span>{userItem.username}</span>
              </div>

              <button
                className="follow-btn"
                onClick={() =>
                  handleFollow(
                    userItem.username,
                    user.username
                  )
                }
              >
                Follow
              </button>
            </div>
          ))}
        </div>

        {/* ================= CENTER FEED ================= */}
        <div className="post">
          {feed.map((post) => (
            <Post
              key={post._id}
              user={post.userId}
              post={post}
              handleLikePost={handleLikePost}
              handleUnlikePost={handleUnlikePost}
            />
          ))}
        </div>

        {/* ================= RIGHT PROFILE ================= */}
        <div className="right-profile">
          {user ? (
            <>
              {/* PROFILE INFO */}
              <div className="profile-card">
                <img
                  className="profile-avatar"
                  src={user.profilePicture}
                  alt=""
                />
                <h4>{user.username}</h4>
                <p>{user.email}</p>
              </div>

              {/* FOLLOW REQUESTS */}
              <div className="request-section">
                <div className="request-header">
                  <h4>Follow Requests</h4>
                  <span className="request-count">
                    {requests?.length || 0}
                  </span>
                </div>

                {requests?.length === 0 && (
                  <p className="no-requests">
                    No pending requests
                  </p>
                )}

                <div className="request-list">
                  {requests?.map((req) => (
                    <div
                      className="request-item"
                      key={req._id}
                    >
                      <div className="request-user">
                        <img
                          src={
                            req.follower.profilePicture
                          }
                          alt=""
                        />
                        <span>
                          {req.follower.username}
                        </span>
                      </div>

                      <div className="request-actions">
                        <button
                          className="accept-btn"
                          onClick={() =>
                            handleAccept(
                              req.follower.username,
                              user.username
                            )
                          }
                        >
                          Accept
                        </button>

                        <button
                          className="reject-btn"
                          onClick={() =>
                            handleReject(
                              req.follower.username
                            )
                          }
                        >
                          Reject
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </main>
    </>
  );
};

export default Feed;
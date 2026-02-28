import { useContext, useEffect } from "react";
import { PostContext } from "../../post/post.context";
import { createPost, getFeed, likePost, unlikePost } from "../services/post.api";

export const usePost = () => {

  const context = useContext(PostContext);

  const {
    loading,
    setloading,
    setpost,
    post,
    feed,
    setfeed
  } = context;

  const handleGetFeed = async () => {
    try {
      setloading(true);

      const data = await getFeed();
      setfeed(data.posts);

    } catch (err) {
      console.error(err);
    } finally {
      setloading(false);
    }
  };

  useEffect(() => {
    handleGetFeed();
  }, []);

  const handleCreatePost = async (file, caption) => {
    try {
      setloading(true);

      const data = await createPost(file, caption);
      setfeed([data.post, ...feed]);

    } catch (err) {
      throw err;
    } finally {
      setloading(false);
    }
  };

 const handleLikePost = async (postId) => {
  try {
    await likePost(postId);

    setfeed(prev =>
      prev.map(p =>
        p._id === postId
          ? { ...p, isLiked: true }
          : p
      )
    );

  } catch (err) {
    console.error(err);
  }
};

const handleUnlikePost = async (postId) => {
  try {
    await unlikePost(postId);

    setfeed(prev =>
      prev.map(p =>
        p._id === postId
          ? { ...p, isLiked: false }
          : p
      )
    );

  } catch (err) {
    console.error(err);
  }
};

  return {
    loading,
    feed,
    post,
    handleGetFeed,
    handleCreatePost,
    handleLikePost,
    handleUnlikePost
  };
};
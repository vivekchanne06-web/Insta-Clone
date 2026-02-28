import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api/post",
  withCredentials: true,
});

export async function getFeed() {
  try {
    const response = await api.get("/feed");
    return response.data;
  } catch (err) {
    throw err;
  }
}


export async function createPost(file , caption) {
const formData = new FormData();

formData.append("image", file);
formData.append("caption", caption);

  const response = await api.post("/", formData)    
    return response.data;
};

export async function likePost(postId) {


  const response = await api.post(`/like/${postId}`);

  return response.data;
}

export async function unlikePost(postId) {


  const response = await api.post(`/unlike/${postId}`);

  return response.data;
}
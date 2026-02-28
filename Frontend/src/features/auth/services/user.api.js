import axios from "axios";

const api = axios.create({
  baseURL: "https://insta-clone-va4x.onrender.com/api/user",
  withCredentials: true,
});

export async function getFollowers(username){
  const response = await api.get(`/followers/${username}`)
  return response.data
}

export async function getFollowing(username){
  const response = await api.get(`/following/${username}`)
  return response.data
}
export async function getSuggestions(){
  const response = await api.get('/suggestions')
  return response.data
}
export async function followUser(username){
  const response = await api.post(`/follow/${username}`)
  return response.data
}
export async function unfollowUser(username){
  const response = await api.post(`/unfollow/${username}`)
  return response.data
}

export async function getPendingRequests(){
  const response = await api.get('/follow/requests')
  return response.data
}

export async function acceptFollow(username){
    const response = await api.post(`/follow/accept/${username}`)
    return response.data;
}

export async function rejectFollow(username){
    const response = await api.post(`/follow/reject/${username}`)
    return response.data;}
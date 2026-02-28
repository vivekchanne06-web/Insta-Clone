import axios from "axios";

const api=axios.create({
    baseURL:"https://insta-clone-va4x.onrender.com/api/auth",
    withCredentials:true
})

export async function register(username, email, password){
  try {
    const response = await api.post("/register", {
      username,
      email,
      password
    })
    return response.data
  } catch(err){
    throw err
  }
}

export async function login(username, password){
  try {
    const response = await api.post("/login", {
      username,
      password
    })
    return response.data
  } catch (err) {
    throw err
  }
}

export async function getMe() {
  const response = await api.get("/get-me");
  return response.data;
}
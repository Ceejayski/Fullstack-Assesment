import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true
})

export function isSignedIn() {
  return api.get("/api/auth/is_signed_in")
  .then((res) => res.data)
}

export const login = async(data) => {
  const response = await api.post("/api/users/sign_in", data)
  return response.data
}

export const logOut = async(data) => {
  const response = await api.delete("/api/users/sign_out", data)
  return response.data
}

export const SignUp = async(data) => {
  const response = await api.post("/api/users", data)
  return response.data
}

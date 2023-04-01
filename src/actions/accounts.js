import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import { BASE_URL, LOAD_USER, LOGIN, LOGOUT, REGISTER } from "./type"

export const loadUser = createAsyncThunk(
  LOAD_USER,
  async (something, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${BASE_URL}/auth/user`, tokenConfig())
      return res.data
    } catch (err) {
      return rejectWithValue(err?.res)
    }
  }
)

export const login = createAsyncThunk(
  LOGIN,
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const body = { username, password }
      const res = await axios.post(`${BASE_URL}/auth/login/`, body)
      localStorage.setItem("token", res.data.token)
      return res.data
    } catch (err) {
      return rejectWithValue(err?.res.data.non_field_errors[0])
    }
  }
)

export const logout = createAsyncThunk(
  LOGOUT,
  async (something, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${BASE_URL}/auth/logout/`,
        null,
        tokenConfig()
      )
      return res.data
    } catch (err) {
      return rejectWithValue(err?.res)
    }
  }
)

export const register = createAsyncThunk(
  REGISTER,
  async ({ name, surname, email, password }, { rejectWithValue }) => {
    try {
      const body = {
        first_name: name,
        last_name: surname,
        username: `${email}`,
        email,
        password,
      }
      const res = await axios.post(`${BASE_URL}/auth/register/`, body)
      return res.data
    } catch (err) {
      return rejectWithValue(err?.res)
    }
  }
)

export const getProfile = createAsyncThunk(
  "GET_PROFILE",
  async (profile_id, { rejectWithValue }) => {
    try {
      let params = { profile_id }
      const res = await axios.get(`${BASE_URL}/auth/profile`, {
        params: params,
      })
      return res.data
    } catch (err) {
      return rejectWithValue(err?.res)
    }
  }
)

export const updateProfile = createAsyncThunk(
  "UPDATE_USER_PROFILE",
  async (form_data, { rejectWithValue, dispatch }) => {
    try {
      const token = localStorage.getItem("token")
      const res = await axios.post(
        `${BASE_URL}/auth/updateprofile`,
        form_data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Token ${token}`,
          },
        }
      )
      dispatch(loadUser())
    } catch (err) {
      console.error(err)
      return rejectWithValue(err)
    }
  }
)

export const getThreads = createAsyncThunk(
  "GET_THREADS",
  async (something, { rejectWithValue }) => {
    try {
      console.log(tokenConfig())

      const res = await axios.get(`${BASE_URL}/threads`, tokenConfig())
      return { res }
    } catch (err) {
      console.error(err)
      return rejectWithValue(err?.res)
    }
  }
)
export const getThread = createAsyncThunk(
  "GET_THREAD",
  async ({ thread_id }, { rejectWithValue }) => {
    try {
      const params = { thread_id }
      console.log(params)

      const res = await axios.get(`${BASE_URL}/thread`, {
        params: params,
        headers: tokenConfig().headers,
      })
      return { res }
    } catch (err) {
      console.error(err)
      return rejectWithValue(err?.res)
    }
  }
)

export const followUser = createAsyncThunk(
  "FOLLOW",
  async (recipient_id, { rejectWithValue, dispatch }) => {
    try {
      const res = await axios.post(
        `${BASE_URL}/follow/${recipient_id}`,
        { recipient_id },
        tokenConfig()
      )
      dispatch(loadUser())
      return res
    } catch (err) {
      console.error(err)
      return rejectWithValue(err)
    }
  }
)

export const unfollowUser = createAsyncThunk(
  "UNFOLLOW",
  async (recipient_id, { rejectWithValue, dispatch }) => {
    try {
      const res = await axios.delete(
        `${BASE_URL}/follow/${recipient_id}`,
        tokenConfig()
      )
      dispatch(loadUser())
      return res
    } catch (err) {
      console.error(err)
      return rejectWithValue(err)
    }
  }
)

export const getFollowers = createAsyncThunk(
  "GET_FOLLOWERS",
  async ({ user_id, isFollowers }, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${BASE_URL}/follow/${user_id}`, {
        params: { isFollowers },
      })
      return res
    } catch (err) {
      console.error(err)
      return rejectWithValue(err)
    }
  }
)

export const isUsed = createAsyncThunk(
  "IS_USED",
  async (params, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${BASE_URL}/auth/is_used`, {
        params: params,
      })
      return res.data
    } catch (err) {
      console.error(err)
      return rejectWithValue(err)
    }
  }
)

export const tokenConfig = () => {
  const token = localStorage.getItem("token")

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  }

  if (token) {
    config.headers["Authorization"] = `Token ${token}`
  }

  return config
}

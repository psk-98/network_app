import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import { loadUser, tokenConfig } from "./accounts"
import { BASE_URL } from "./type"

export const getAllPosts = createAsyncThunk(
  "GET_POSTS",
  async (something, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${BASE_URL}/allposts`)
      return res.data
    } catch (err) {
      return rejectWithValue(err)
    }
  }
)

export const getPost = createAsyncThunk(
  "GET_POST",
  async (post_id, { rejectWithValue }) => {
    let params = { post_id }

    try {
      const res = await axios.get(`${BASE_URL}/post`, { params: params })
      return res.data
    } catch (err) {
      return rejectWithValue(err)
    }
  }
)

export const getUserPosts = createAsyncThunk(
  "GET_USER_POSTS",
  async ({ user_id, isLikes }, { rejectWithValue }) => {
    if (isLikes) var params = { liked_id: user_id }
    else var params = { user_id }

    try {
      const res = await axios.get(`${BASE_URL}/posts`, { params: params })
      return res.data
    } catch (err) {
      return rejectWithValue(err)
    }
  }
)

export const createPost = createAsyncThunk(
  "CREATE_POST",
  async (form_data, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token")
      console.log(form_data)
      const res = await axios.post(`${BASE_URL}/post/`, form_data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Token ${token}`,
        },
      })
    } catch (err) {
      return rejectWithValue(err)
    }
  }
)

export const createComment = createAsyncThunk(
  "CREATE_COMMENT",
  async (form_data, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token")
      const res = await axios.post(`${BASE_URL}/comment`, form_data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Token ${token}`,
        },
      })
      console.log(res)
    } catch (err) {
      return rejectWithValue(err)
    }
  }
)

export const likePost = createAsyncThunk(
  "LIKE_POST_OR_COMMENT",
  async ({ id, isComment }, { rejectWithValue, dispatch }) => {
    try {
      const res = await axios.post(
        `${BASE_URL}/like`,
        {
          id,
          isComment,
        },
        tokenConfig()
      )
      dispatch(loadUser())
      return res
    } catch (err) {
      return rejectWithValue(err)
    }
  }
)

export const unlikePost = createAsyncThunk(
  "UNLIKE_POST_OR_COMMENT",
  async ({ id, isComment }, { rejectWithValue }) => {
    try {
      const res = await axios.put(
        `${BASE_URL}/like`,
        { id, isComment },
        tokenConfig()
      )
      dispatch(loadUser())
      return res
    } catch (err) {
      return rejectWithValue(err)
    }
  }
)

import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import { tokenConfig } from "./accounts"
import { BASE_URL } from "./type"

export const getNotifications = createAsyncThunk(
  "GET_NOTIFICATIONS",
  async (something, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${BASE_URL}/notifications`, tokenConfig())
      return res.data
    } catch (err) {
      console.error(err)
      return rejectWithValue(err?.res)
    }
  }
)

export const updateSeen = createAsyncThunk(
  "UPDATE_SEEN",
  async (n_id, { rejectWithValue }) => {
    try {
      const res = await axios.put(`${BASE_URL}/notifications`, {
        n_id,
        headers: tokenConfig().headers,
      })
      return res.data
    } catch (err) {
      console.error(err)
      return rejectWithValue(err?.res)
    }
  }
)

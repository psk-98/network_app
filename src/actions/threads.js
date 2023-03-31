import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import { tokenConfig } from "./accounts"
import { BASE_URL } from "./type"

export const updateSeen = createAsyncThunk(
  "UPDATE_MSG_SEEN",
  async (msg_id, { rejectWithValue }) => {
    try {
      const res = await axios.put(`${BASE_URL}/message`, {
        msg_id,
        headers: tokenConfig().headers,
      })
      return { res }
    } catch (err) {
      console.error(err)
      return rejectWithValue(err?.res)
    }
  }
)

export const sendMessage = createAsyncThunk(
  "SEND_MSG",
  async (form_data, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token")
      console.log(form_data)
      const res = await axios.post(`${BASE_URL}/message`, form_data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Token ${token}`,
        },
      })
      console.log(res)
    } catch (err) {
      console.error(err)
      return rejectWithValue(err)
    }
  }
)

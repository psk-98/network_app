import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import { tokenConfig } from "./accounts"
import { BASE_URL } from "./type"

export const searchNetwork = createAsyncThunk(
  "SEARCH",
  async ({ isPost, search }, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${BASE_URL}/search`, {
        params: { search, isPost },
        headers: tokenConfig().headers,
      })
      return res.data
    } catch (err) {
      console.error(err)
      return rejectWithValue(err?.res)
    }
  }
)

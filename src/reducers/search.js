import { searchNetwork } from "@/actions/search"
import { createSlice } from "@reduxjs/toolkit"

export const searchSlice = createSlice({
  name: "search",
  initialState: {},
  reducers: {
    clearResults: (state) => {
      if (state.results) state.results = []
    },
  },
  extraReducers: (builder) => {
    builder.addCase(searchNetwork.fulfilled, (state, action) => {
      state.results = action.payload
    })
  },
})

export const { clearResults } = searchSlice.actions

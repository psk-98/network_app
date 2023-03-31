import { createSlice } from "@reduxjs/toolkit"
import {
  getFollowers,
  getProfile,
  getThread,
  getThreads,
  loadUser,
  login,
} from "../actions/accounts"

export const accountsSlice = createSlice({
  name: "accounts",
  initialState: {},
  extraReducers: (builder) => {
    builder.addCase(getThreads.pending, (state) => {
      state.loading = true
    })
    builder.addCase(getThreads.fulfilled, (state, action) => {
      state.loading = false
      state.threads = action.payload
    })
    builder.addCase(getThreads.rejected, (state) => {
      state.loading = false
    })
    // builder.addCase(getFollowers.pending, (state) => {
    //   state.loading = true
    // })
    builder.addCase(getFollowers.fulfilled, (state, action) => {
      console.log(action.payload)

      state.loading = false
      state.followers = action.payload
    })
    // builder.addCase(getFollowers.rejected, (state) => {
    //   state.loading = false
    // })
    builder.addCase(getThread.pending, (state) => {
      state.loading = true
    })
    builder.addCase(getThread.fulfilled, (state, action) => {
      state.loading = false
      state.thread = action.payload
    })
    builder.addCase(getThread.rejected, (state) => {
      state.loading = false
    })
    builder.addCase(getProfile.pending, (state) => {
      state.loading = true
    })
    builder.addCase(getProfile.fulfilled, (state, action) => {
      console.log(action.payload)

      state.loading = false
      state.profile = action.payload
    })
    builder.addCase(getProfile.rejected, (state) => {
      state.loading = false
    })
    builder.addCase(loadUser.pending, (state) => {
      state.loading = true
    })
    builder.addCase(loadUser.fulfilled, (state, action) => {
      state.loading = false
      state.user = action.payload
      state.isAuthenticated = true
    })
    builder.addCase(loadUser.rejected, (state) => {
      state.loading = false
      state.isAuthenticated = false
      state.user = null
      state.error = "Invalid creditionals"
    })
    builder.addCase(login.pending, (state) => {
      state.loading = true
    })
    builder.addCase(login.fulfilled, (state, action) => {
      state.loading = false
      state.user = action.payload
      state.isAuthenticated = true
    })
    builder.addCase(login.rejected, (state) => {
      state.loading = false
      state.isAuthenticated = false
      state.user = null
      state.error = "Invalid creditionals"
    })
  },
})
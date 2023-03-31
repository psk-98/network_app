import {
  createComment,
  createPost,
  getAllPosts,
  getPost,
  getUserPosts,
} from "@/actions/posts"
import { createSlice } from "@reduxjs/toolkit"

export const postsSlice = createSlice({
  name: "posts",
  initialState: { isCreate: false },
  reducers: {
    updateCreate: (state) => {
      state.isCreate = !state.isCreate
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createComment.pending, (state) => {
      state.createLoading = true
    })
    builder.addCase(createComment.fulfilled, (state) => {
      state.createLoading = false
      state.created = true
    })
    builder.addCase(createPost.pending, (state) => {
      state.createLoading = true
    })
    builder.addCase(createPost.fulfilled, (state) => {
      state.createLoading = false
      state.created = true
    })
    builder.addCase(getUserPosts.pending, (state) => {
      state.pLoading = true
    })

    builder.addCase(getUserPosts.fulfilled, (state, action) => {
      state.userPosts = action.payload
      state.pLoading = false
    })
    builder.addCase(getUserPosts.rejected, (state) => {
      state.pLoading = false
    })
    builder.addCase(getPost.pending, (state) => {
      state.loading = true
    })
    builder.addCase(getPost.fulfilled, (state, action) => {
      state.post = action.payload
      state.loading = false
    })
    builder.addCase(getPost.rejected, (state) => {
      state.loading = false
    })
    builder.addCase(getAllPosts.pending, (state, action) => {
      state.loading = true
    })
    builder.addCase(getAllPosts.fulfilled, (state, action) => {
      state.posts = action.payload
      state.loading = false
    })
    builder.addCase(getAllPosts.rejected, (state, action) => {
      state.loading = false
    })
  },
})

export const { updateCreate } = postsSlice.actions

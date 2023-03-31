import { getNotifications } from "@/actions/notifications"
import { createSlice } from "@reduxjs/toolkit"

export const notificationsSlice = createSlice({
  name: "notifications",
  initialState: {},
  extraReducers: (builder) => {
    builder.addCase(getNotifications.pending, (state, action) => {
      state.loading = true
    })
    builder.addCase(getNotifications.fulfilled, (state, action) => {
      state.loading = false
      state.notifications = action.payload
    })
    builder.addCase(getNotifications.rejected, (state) => {
      state.loading = false
    })
  },
})

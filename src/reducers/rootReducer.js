import { combineReducers } from "@reduxjs/toolkit"
import { accountsSlice } from "./accounts"
import { notificationsSlice } from "./notifications"
import { postsSlice } from "./posts"
import { searchSlice } from "./search"

export default combineReducers({
  accounts: accountsSlice.reducer,
  posts: postsSlice.reducer,
  notifications: notificationsSlice.reducer,
  search: searchSlice.reducer,
})

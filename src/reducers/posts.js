import { GET_ALL_POSTS, GET_POST, GET_POSTS, GET_COMMENTS, GET_USER_POSTS, NEW_POST_SUCCESS, NEW_POST_FAIL, COMMENT_FAIL, COMMENT_SUCCESS } from "../actions/types"

const initState = {
    posts: null,
    post: null,
    comments: null,
    userPosts: null,
    posted: false,
    posted_res: null
}

export default function(state = initState, action) {
    switch(action.type) {
        case GET_POSTS:
        case GET_ALL_POSTS:
            return {
                ...state,
                posted: false,
                posts: action.payload
            }
        case GET_POST:
            return {
                ...state,
                posted: false,
                post: action.payload
            }
        case GET_USER_POSTS:
            return {
                ...state,
                posted: false,
                userPosts: action.payload
            }
        case GET_COMMENTS: 
            return {
                ...state,
                posted: false,
                comments: action.payload
            }
        case NEW_POST_SUCCESS:
        case COMMENT_SUCCESS:
            return {
                ...state,
                posted: true,
                posted_res: action.payload
            }
        case NEW_POST_FAIL:
        case COMMENT_FAIL:
            return {
                ...state,
                posted: false
            }
        default: 
            return state
    }
}
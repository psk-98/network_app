import axios from 'axios'
import { tokenConfig } from './auth'
import {GET_POSTS, GET_ALL_POSTS, GET_POST, GET_COMMENTS, GET_USER_POSTS, NEW_POST_SUCCESS, NEW_POST_FAIL, COMMENT_SUCCESS, COMMENT_FAIL} from './types'

const BASE_URL = 'http://127.0.0.1:8000'

export const getPosts = () => (dispatch, getState) => {

    axios.get(`${BASE_URL}/following`, tokenConfig(getState))
    .then(res => {
        dispatch({
            type: GET_POSTS,
            payload: res.data
        })
    })
    .catch(err => console.log(err))
}

export const getAllPosts = () => dispatch => {

    axios.get(`${BASE_URL}/allposts`)
    .then(res => {
        dispatch({
            type: GET_ALL_POSTS,
            payload: res.data
        })
    })
    .catch(err => console.log(err))
}

export const likePost = (id, location) => (dispatch, getState) => {
    axios.post(`${BASE_URL}/like/${id}`, null, tokenConfig(getState))
    .then(res => {
        console.log("liked")
        if(location == "Home")
        {
            axios.get(`${BASE_URL}/following`, tokenConfig(getState))
            .then(res => {
                dispatch({
                    type: GET_POSTS,
                    payload: res.data
                })
            })
            .catch(err => console.log(err))
        }
        else if (location === "post")
        {
            axios.get(`${BASE_URL}/post/${id}`)
            .then(res => {
                dispatch({
                    type: GET_POST,
                    payload: res.data
                })
            })
            .catch(err => console.log(err))
        }
        else if(location == "Global")
        {
            axios.get(`${BASE_URL}/allposts`)
            .then(res => {
                dispatch({
                    type: GET_ALL_POSTS,
                    payload: res.data
                })
            })
            .catch(err => console.log(err))
        }
    })
} 

export const getPost = (id) => (dispatch) => {
    axios.get(`${BASE_URL}/post/${id}`)
    .then(res => {
        dispatch({
            type: GET_POST,
            payload: res.data
        })
    })
    .catch(err => console.log(err))
}

export const getComments = id => (dispatch, getState) => {

    axios.get(`${BASE_URL}/comments/${id}`, tokenConfig(getState))
    .then(res => {
        dispatch({
            type: GET_COMMENTS,
            payload: res.data
        })
    })
    .catch(err => console.log(err))
}

export const getLikedPosts = (id) => (dispatch, getState) => {
    axios.get(`${BASE_URL}/likedposts/${id}`, tokenConfig(getState))
    .then(res => {
        dispatch({
            type: GET_USER_POSTS,
            payload: res.data
        })
    })
    .catch(err => console.log(err))
}

export const getUserPosts = (id) => (dispatch, getState) => {
    axios.get(`${BASE_URL}/userposts/${id}`, tokenConfig(getState))
    .then(res => {
        dispatch({
            type: GET_USER_POSTS,
            payload: res.data
        })
    })
    .catch(err => console.log(err))
}

export const newPost = (content) => (dispatch, getState) => {
    
    const body = JSON.stringify({
        body: `${content}`,
    })

    axios.post(`${BASE_URL}/newpost`, body, tokenConfig(getState))
    .then(res => {
        dispatch({
            type: NEW_POST_SUCCESS,
            payload: res.data
        })
    })
    .catch(err => {
        console.log(err)
        /*dispatch(
            returnError(err.response.data, err.response.status)
        )*/
        dispatch({
            type: NEW_POST_FAIL
        })
    })
}

export const comment = (content, post_id) => (dispatch, getState) => {
    const body = JSON.stringify({
        body: `${content}`
    })


    axios.post(`${BASE_URL}/comment/${post_id}`, body, tokenConfig(getState))
    .then(res => {
        console.log(res)
        dispatch({
            type: COMMENT_SUCCESS,
            payload: res.data
        })
    })
    .catch(err => {
        console.log(err)
        dispatch({
            type: COMMENT_FAIL
        })
    })
}
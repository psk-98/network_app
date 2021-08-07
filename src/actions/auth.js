import { LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT_SUCCESS, IS_MY_PROFILE, PROFILE_LOADED, USER_LOADED, USER_LOADING, AUTH_ERROR, REGISTER_FAIL ,REGISTER_SUCCESS } from './types'
import axios from 'axios'

const BASE_URL = 'http://127.0.0.1:8000/api/auth'

export const loadUser = () => (dispatch, getState) => {
    dispatch({ type: USER_LOADING})

    axios.get(`${BASE_URL}/user`, tokenConfig(getState))
    .then(res => {
        dispatch({
            type: USER_LOADED,
            payload: res.data
        })
    })
    .catch(err => {
        dispatch({
            type: AUTH_ERROR
        })
    })
    
}

export const login = (username, password) => (dispatch, getState) => {
    const body = JSON.stringify({
                    username,
                    password
                })
    
    axios.post(`${BASE_URL}/login`, body, tokenConfig(getState))
    .then(res => {
            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data
            })
    })
    .catch(err => {
        /*dispatch(
            returnError(err.response.data, err.response.status)
        )*/
        dispatch({
            type: LOGIN_FAIL
        })
    })
}

export const logout = () => (dispatch, getState) => {

    axios.post(`${BASE_URL}/logout/`, null, tokenConfig(getState))
    .then(res => {
        dispatch({
            type: LOGOUT_SUCCESS
        })
    })
    .catch(err => {
        console.log(err)
    })     
}

export const register = ({username, email, password}) => (dispatch, getState) => {
    const body = JSON.stringify({
                    username: `${username}`,
                    email: `${email}`,
                    password: `${password}`
                })

    axios.post(`${BASE_URL}/register`, body, tokenConfig(getState))
    .then(res => {
        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        })
    })
    .catch(err => {
        /*dispatch(
            returnError(err.response.data, err.response.status)
        )*/
        dispatch({
            type: REGISTER_FAIL
        })
    })
}

export const updateProfile = user => (dispatch, getState) => {

    const {username, bio, email} = user

    const body = JSON.stringify({
        bio
    })

    axios.post(`${BASE_URL}/updateprofile`, body, tokenConfig(getState))
    .then(res => {
        const body = JSON.stringify({
            username,
            email
        })

        axios.post(`${BASE_URL}/updateuser`, body, tokenConfig(getState))
        .then(res => {
            console.log(res.data)
        })
        .catch(err => console.log(err.data))
    })
    .catch(err => console.log(err.data))
}

export const getProfile = id => (dispatch, getState) => {

    axios.get(`http://127.0.0.1:8000/profile/${id}`)
    .then(res => {
        dispatch({
            type: PROFILE_LOADED,
            payload: res.data
        })
        if(parseInt(localStorage.getItem('userid')) === res.data.id )
        {
            dispatch({
                type: IS_MY_PROFILE,
                payload: true
            })
        }
        else {
            dispatch({
                type: IS_MY_PROFILE,
                payload: false
            })
        }
    })
}



export const follow = id => (dispatch, getState) => {

    axios.post(`http://127.0.0.1:8000/follow/${id}`, null, tokenConfig(getState))
    .then(res => {
        console.log(res.data)
    })
    .catch(err => err.data)
}

export const unfollow = id => (dispatch, getState) => {

    axios.post(`http://127.0.0.1:8000/unfollow/${id}`, null, tokenConfig(getState))
    .then(res => {
        console.log(res.data)
    })
    .catch(err => err.data)
}




export const tokenConfig = getState => {
    const token = getState().auth.token

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
 
    if(token) {
        config.headers["Authorization"] = `Token ${token}`
    }

    return config
}
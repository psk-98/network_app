import {  LOGIN_FAIL, LOGIN_SUCCESS, LOGOUT_SUCCESS, PROFILE_LOADED, USER_LOADED , IS_MY_PROFILE, AUTH_ERROR, REGISTER_FAIL ,REGISTER_SUCCESS} from "../actions/types";

const initState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    isLoading: false,
    user: null,
    profile: null,
    isMyProfile: false
}

export default function( state = initState, action) {
    switch (action.type) {
        case IS_MY_PROFILE:
            return{
                ...state,
                isMyProfile: action.payload
            }
        case PROFILE_LOADED:
            return{
                ...state,
                profile: action.payload
            }
        case USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                isLoading: false,
                user: action.payload
            }
        case LOGIN_SUCCESS:
        case REGISTER_SUCCESS:
            localStorage.setItem('token', action.payload.token)
            localStorage.setItem('userid', action.payload.user.id) 
            return {
                ...state,
                ...action.payload,
                isAuthenticated: true,
                isLoading: false
            }
        case AUTH_ERROR:
        case LOGIN_FAIL:
        case LOGOUT_SUCCESS:
        case REGISTER_FAIL:
            localStorage.removeItem('token')
            localStorage.removeItem('userid')
            return {
                ...state,
                token: null,
                isAuthenticated: null,
                isLoading: false,
                user: null
            }
        default:
            return state
    }
}
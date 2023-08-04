import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAIL,
    LOAD_USER_REQUEST,
    LOAD_USER_SUCCESS,
    LOAD_USER_FAIL,
    LOAD_USER_AUTH_FAIL,
    SEARCH_USER_REQUEST,
    SEARCH_USER_SUCCESS,
    SEARCH_USER_FAIL,
    ALL_USERS_REQUEST,
    ALL_USERS_SUCCESS,
    ALL_USERS_FAIL,
    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_FAIL,
    UPDATE_USER_REQUEST,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_FAIL,
    DELETE_USER_REQUEST,
    DELETE_USER_SUCCESS,
    DELETE_USER_FAIL,
    LOGOUT_FAIL,
    LOGOUT_SUCCESS,
    UPDATE_PROFILE_REQUEST,
    UPDATE_PROFILE_SUCCESS,
    UPDATE_PROFILE_FAIL,
    UPDATE_PASSWORD_REQUEST,
    UPDATE_PASSWORD_SUCCESS,
    UPDATE_PASSWORD_FAIL,
    FORGOT_PASSWORD_REQUEST,
    FORGOT_PASSWORD_SUCCESS,
    FORGOT_PASSWORD_FAIL,
    RESET_PASSWORD_REQUEST,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_FAIL,

    FETCH_USER_CHATS_REQUEST,
    FETCH_USER_CHATS_SUCCESS,
    FETCH_USER_CHATS_FAIL,
    DELETE_CHAT_REQUEST,
    DELETE_CHAT_SUCCESS,
    DELETE_CHAT_FAIL,
    SUBMIT_FEEDBACK_REQUEST,
    SUBMIT_FEEDBACK_SUCCESS,
    SUBMIT_FEEDBACK_FAIL,
    GET_ALL_FEEDBACK_REQUEST,
    GET_ALL_FEEDBACK_SUCCESS,
    GET_ALL_FEEDBACK_FAIL,
    DELETE_FEEDBACK_REQUEST,
    DELETE_FEEDBACK_SUCCESS,
    DELETE_FEEDBACK_FAIL,
    CLEAR_ERRORS,
} from "../constants/userConstants"
import axios from "axios"

// LOGIN
export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({ type: LOGIN_REQUEST })

        const config = { headers: { 'Content-Type': 'application/json' } }

        const { data } = await axios.post(
            "/login",
            { email, password },
            config
        )

        dispatch({ type: LOGIN_SUCCESS, payload: data.user })


    } catch (error) {
        dispatch({ type: LOGIN_FAIL, payload: error.response.data.message })
    }
}

// REGISTER
export const register = (userData) => async (dispatch) => {
    try {
        dispatch({ type: REGISTER_USER_REQUEST })

        const config = { headers: { 'Content-Type': 'application/json' } }

        const { data } = await axios.post(
            "/register",
            userData,
            config
        )

        dispatch({ type: REGISTER_USER_SUCCESS, payload: data.user })


    } catch (error) {
        dispatch({ type: REGISTER_USER_FAIL, payload: error.response.data.message })
    }
}

// LOAD USER
export const loadUser = () => async (dispatch) => {
    try {
        dispatch({ type: LOAD_USER_REQUEST });

        const { data } = await axios.get('/profile');

        // If the API response indicates a successful user data fetch, dispatch LOAD_USER_SUCCESS
        dispatch({ type: LOAD_USER_SUCCESS, payload: data.user });
    } catch (error) {
        if (!error.response.data.success) {
            // If the API response indicates an authentication failure, dispatch LOAD_USER_AUTH_FAIL
            dispatch({ type: LOAD_USER_AUTH_FAIL });
            return; // Return early to prevent further execution
        }
        // Handle any errors that occur during the API call
        // Dispatch LOAD_USER_FAIL to indicate the failure and pass the error message
        dispatch({ type: LOAD_USER_FAIL, payload: error.response.data.message });
    }
};

// LOGOUT
export const logout = () => async (dispatch) => {
    try {
        await axios.get(
            "/logout",
        )
        dispatch({ type: LOGOUT_SUCCESS, })

    } catch (error) {
        dispatch({ type: LOGOUT_FAIL, payload: error.response.data.message })
    }
}

// updare PROFILE
export const updateProfile = (userData) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_PROFILE_REQUEST })

        const config = { headers: { 'Content-Type': 'multipart/form-data' } }

        const { data } = await axios.put(
            "/profile/update",
            userData,
            config
        )

        dispatch({ type: UPDATE_PROFILE_SUCCESS, payload: data.success })


    } catch (error) {
        dispatch({ type: UPDATE_PROFILE_FAIL, payload: error.response.data.message })
    }
}

// update Password
export const updatePassword = (passwords) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_PASSWORD_REQUEST })

        const config = { headers: { 'Content-Type': 'application/json' } }

        const { data } = await axios.put(
            "/password/update",
            passwords,
            config
        )

        dispatch({ type: UPDATE_PASSWORD_SUCCESS, payload: data.success })


    } catch (error) {
        dispatch({ type: UPDATE_PASSWORD_FAIL, payload: error.response.data.message })
    }
}

// forgot password
export const forgotPassword = (email) => async (dispatch) => {
    try {
        dispatch({ type: FORGOT_PASSWORD_REQUEST })

        const config = { headers: { 'Content-Type': 'application/json' } }

        const { data } = await axios.post(
            "/password/forgot",
            email,
            config
        )

        dispatch({ type: FORGOT_PASSWORD_SUCCESS, payload: data.message })


    } catch (error) {
        dispatch({ type: FORGOT_PASSWORD_FAIL, payload: error.response.data.message })
    }
}
// reset password
export const resetPassword = (token, passwords) => async (dispatch) => {
    try {
        dispatch({ type: RESET_PASSWORD_REQUEST })

        const config = { headers: { 'Content-Type': 'application/json' } }

        const { data } = await axios.put(
            `/password/reset/${token}`,
            passwords,
            config
        )

        dispatch({ type: RESET_PASSWORD_SUCCESS, payload: data.success })


    } catch (error) {
        dispatch({ type: RESET_PASSWORD_FAIL, payload: error.response.data.message })
    }
}

// User action creators
export const searchUser = (id) => async (dispatch) => {
    try {
        dispatch({ type: SEARCH_USER_REQUEST });

        // Perform the API request to search for books using the provided keyword
        const { data } = await axios.get(`/admin/search-users/${id}`)

        dispatch({ type: SEARCH_USER_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: SEARCH_USER_FAIL, payload: error.message });
    }
};

// get All Users
export const getAllUsers = () => async (dispatch) => {
    try {
        dispatch({ type: ALL_USERS_REQUEST });
        const { data } = await axios.get(`/admin/users`);

        dispatch({ type: ALL_USERS_SUCCESS, payload: data.users });
    } catch (error) {
        dispatch({ type: ALL_USERS_FAIL, payload: error.response.data.message });
    }
};

// GET A uSER DEATILS ACTION
export const getUserDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: USER_DETAILS_REQUEST })
        const { data } = await axios.get(`/admin/user/${id}`)
        dispatch({
            type: USER_DETAILS_SUCCESS,
            payload: data.user,
        })
    } catch (error) {
        dispatch({ type: USER_DETAILS_FAIL, payload: error.response.data.message });
    }
}

// Update User
export const updateUser = (id, userData) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_USER_REQUEST });

        const config = { headers: { "Content-Type": "application/json" } };

        const { data } = await axios.put(
            `/admin/user/${id}`,
            userData,
            config
        );

        dispatch({ type: UPDATE_USER_SUCCESS, payload: data.success });
    } catch (error) {
        dispatch({
            type: UPDATE_USER_FAIL,
            payload: error.response.data.message,
        });
    }
};

// Delete User
export const deleteUser = (id) => async (dispatch) => {
    try {
        dispatch({ type: DELETE_USER_REQUEST });

        const { data } = await axios.delete(`/admin/user/${id}`);

        dispatch({ type: DELETE_USER_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: DELETE_USER_FAIL,
            payload: error.response.data.message,
        });
    }
};


// Action creator to fetch user's chat messages
export const fetchUserChats = () => async (dispatch) => {
    try {
        dispatch({ type: FETCH_USER_CHATS_REQUEST });

        const res = await axios.get('/notifications'); // Adjust the API endpoint as per your backend route

        dispatch({
            type: FETCH_USER_CHATS_SUCCESS,
            payload: res.data.chats,
        });
    } catch (error) {
        dispatch({
            type: FETCH_USER_CHATS_FAIL,
            payload: error.response.data.message,
        });
    }
};

export const deleteChat = (chatId) => async (dispatch) => {
    try {
        dispatch({ type: DELETE_CHAT_REQUEST });

        const { data } = await axios.delete(`/notification/${chatId}`);

        dispatch({ type: DELETE_CHAT_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: DELETE_CHAT_FAIL,
            payload: error.response.data.message,
        });
    }
};

// User action feedback
export const submitFeedback = (formData) => async (dispatch) => {
    try {
        dispatch({ type: SUBMIT_FEEDBACK_REQUEST });

        const config = { headers: { "Content-Type": "application/json" } };


        const { data } = await axios.post(`/feed-back`, formData, config)

        dispatch({ type: SUBMIT_FEEDBACK_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: SUBMIT_FEEDBACK_FAIL, payload: error.message });
    }
};

// Action creator to fetch user's FEEDBACK messages
export const userFeedbacks = () => async (dispatch) => {
    try {
        dispatch({ type: GET_ALL_FEEDBACK_REQUEST });

        const {data} = await axios.get('/admin/feed-backs'); // Adjust the API endpoint as per your backend route

        dispatch({
            type: GET_ALL_FEEDBACK_SUCCESS,
            payload: data.feedbacks,
        });
    } catch (error) {
        dispatch({
            type: GET_ALL_FEEDBACK_FAIL,
            payload: error.response.data.message,
        });
    }
};

export const deleteFeedback = (id) => async (dispatch) => {
    try {
        dispatch({ type: DELETE_FEEDBACK_REQUEST });

        const { data } = await axios.delete(`/admin/feed-back/${id}`);

        dispatch({ type: DELETE_FEEDBACK_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: DELETE_FEEDBACK_FAIL,
            payload: error.response.data.message,
        });
    }
};


// Clearing Error
export const clearErrors = async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS })
}
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
    LOGOUT_SUCCESS,
    LOGOUT_FAIL,
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
    UPDATE_USER_RESET,
    DELETE_USER_REQUEST,
    DELETE_USER_SUCCESS,
    DELETE_USER_FAIL,
    DELETE_USER_RESET,

    UPDATE_PROFILE_REQUEST,
    UPDATE_PROFILE_SUCCESS,
    UPDATE_PROFILE_RESET,
    UPDATE_PROFILE_FAIL,
    UPDATE_PASSWORD_REQUEST,
    UPDATE_PASSWORD_SUCCESS,
    UPDATE_PASSWORD_RESET,
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
    DELETE_CHAT_RESET,

    SUBMIT_FEEDBACK_REQUEST,
    SUBMIT_FEEDBACK_SUCCESS,
    SUBMIT_FEEDBACK_FAIL,
    SUBMIT_FEEDBACK_RESET,
    GET_ALL_FEEDBACK_REQUEST,
    GET_ALL_FEEDBACK_SUCCESS,
    GET_ALL_FEEDBACK_FAIL,
    DELETE_FEEDBACK_REQUEST,
    DELETE_FEEDBACK_SUCCESS,
    DELETE_FEEDBACK_FAIL,
    DELETE_FEEDBACK_RESET,


    CLEAR_ERRORS,
} from "../constants/userConstants"

export const userDetailsReducer = (state = { user: {} }, action) => {
    switch (action.type) {
        case USER_DETAILS_REQUEST:
            return {
                loading: true,
                ...state,
            };
        case USER_DETAILS_SUCCESS:
            return {
                user: action.payload,
                loading: false,
            };
        case USER_DETAILS_FAIL:
            return {
                error: action.payload,
                loading: false,
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };
        default:
            return state;
    }
};
export const userReducer = (state = { user: {} }, action) => {
    switch (action.type) {
        case LOGIN_REQUEST:
        case REGISTER_USER_REQUEST:
        case LOAD_USER_REQUEST:
            return {
                loading: true,
                isAuthenticated: false,
            }
        case LOGOUT_SUCCESS:
            return {
                loading: false,
                user: null,
                isAuthenticated: false
            }
        case LOAD_USER_AUTH_FAIL:
            return {
                ...state,
                isAuthenticated: false,
                loading: false,
                error: null,
            };
        case LOGIN_SUCCESS:
        case REGISTER_USER_SUCCESS:
        case LOAD_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                isAuthenticated: true,
                user: action.payload,
            }


        case LOGIN_FAIL:
        case REGISTER_USER_FAIL:
            return {
                ...state,
                loading: false,
                isAuthenticated: false,
                user: null,
                error: action.payload
            }
        case LOAD_USER_FAIL:
            return {
                loading: false,
                isAuthenticated: false,
                user: null,
                error: action.payload
            }

        case LOGOUT_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        default:
            return state
    }
}



export const profileReducer = (state = {}, action) => {
    switch (action.type) {
        case UPDATE_PROFILE_REQUEST:
        case UPDATE_PASSWORD_REQUEST:
        case UPDATE_USER_REQUEST:
        case DELETE_USER_REQUEST:
            return {
                ...state,
                loading: true,
            }

        case UPDATE_PROFILE_SUCCESS:
        case UPDATE_PASSWORD_SUCCESS:
        case UPDATE_USER_SUCCESS:

            return {
                ...state,
                loading: false,
                isUpdated: action.payload,
            }

        case DELETE_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: action.payload.success,
                message: action.payload.message,
            };
        case UPDATE_PROFILE_FAIL:
        case UPDATE_PASSWORD_FAIL:
        case UPDATE_USER_FAIL:
        case DELETE_USER_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case UPDATE_PROFILE_RESET:
        case UPDATE_PASSWORD_RESET:
        case UPDATE_USER_RESET:

            return {
                ...state,
                isUpdated: false
            }

        case DELETE_USER_RESET:
            return {
                ...state,
                isDeleted: false,
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        default:
            return state
    }

}


export const forgotPasswordReducer = (state = {}, action) => {
    switch (action.type) {
        case FORGOT_PASSWORD_REQUEST:
        case RESET_PASSWORD_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            }
        case FORGOT_PASSWORD_SUCCESS:
            return {
                ...state,
                loading: false,
                message: action.payload,
            }
        case RESET_PASSWORD_SUCCESS:
            return {
                ...state,
                loading: false,
                success: action.payload,
            }
        case FORGOT_PASSWORD_FAIL:
        case RESET_PASSWORD_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        default:
            return state
    }

}

export const searchUserReducer = (state = { users: [] }, action) => {
    switch (action.type) {
        case SEARCH_USER_REQUEST:
            return { ...state, loading: true, users: [] };
        case SEARCH_USER_SUCCESS:
            return { ...state, loading: false, users: action.payload.users };
        case SEARCH_USER_FAIL:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};


export const allUsersReducer = (state = { users: [] }, action) => {
    switch (action.type) {
        case ALL_USERS_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case ALL_USERS_SUCCESS:
            return {
                ...state,
                loading: false,
                users: action.payload,
            };

        case ALL_USERS_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };

        default:
            return state;
    }
};

export const userChatsReducer = (state = {}, action) => {
    switch (action.type) {
        case FETCH_USER_CHATS_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case FETCH_USER_CHATS_SUCCESS:
            return {
                ...state,
                loading: false,
                chats: action.payload,
                error: null,
            };
        case FETCH_USER_CHATS_FAIL:
            return {
                ...state,
                loading: false,
                chats: [],
                error: action.payload,
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };
        default:
            return state;
    }
};

export const deleteChatsReducer = (state = {}, action) => {
    switch (action.type) {
        case DELETE_CHAT_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case DELETE_CHAT_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: action.payload.success,
                message: action.payload.message
            };
        case DELETE_CHAT_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case DELETE_CHAT_RESET:
            return {
                ...state,
                isDeleted: false,
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };
        default:
            return state;
    }
};

export const feedbackReducer = (state = {}, action) => {
    switch (action.type) {
        case SUBMIT_FEEDBACK_REQUEST:
            return {
                ...state,
            };
        case SUBMIT_FEEDBACK_SUCCESS:
            return {
                ...state,
                isSubmitted: action.payload.success,
                message: action.payload.message,
            };
        case SUBMIT_FEEDBACK_FAIL:
            return {
                ...state,
                error: action.payload,
            };
        case SUBMIT_FEEDBACK_RESET:
            return {
                ...state,
                isSubmitted: false,
            }
            case CLEAR_ERRORS:
                return {
                    ...state,
                    error: null,
                };
        default:
            return state;
    }
};

export const userFeedbacksReducer = (state = {}, action) => {
    switch (action.type) {
        case GET_ALL_FEEDBACK_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case GET_ALL_FEEDBACK_SUCCESS:
            return {
                ...state,
                loading: false,
                feedback: action.payload,
                error: null,
            };
        case GET_ALL_FEEDBACK_FAIL:
            return {
                ...state,
                loading: false,
                feedback: [],
                error: action.payload,
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };
        default:
            return state;
    }
};

export const deleteFeedbackReducer = (state = {}, action) => {
    switch (action.type) {
        case DELETE_FEEDBACK_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case DELETE_FEEDBACK_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: action.payload.success,
                message: action.payload.message
            };
        case DELETE_FEEDBACK_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case DELETE_FEEDBACK_RESET:
            return {
                ...state,
                isDeleted: false,
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };
        default:
            return state;
    }
};
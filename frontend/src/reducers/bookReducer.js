import {
  ALL_BOOK_FAIL,
  ALL_BOOK_REQUEST,
  ALL_BOOK_SUCCESS,
  ADMIN_BOOK_REQUEST,
  ADMIN_BOOK_SUCCESS,
  ADMIN_BOOK_FAIL,
  NEW_BOOK_REQUEST,
  NEW_BOOK_SUCCESS,
  NEW_BOOK_RESET,
  NEW_BOOK_FAIL,
  ISSUE_BOOK_REQUEST,
  ISSUE_BOOK_SUCCESS,
  ISSUE_BOOK_RESET,
  ISSUE_BOOK_FAIL,
  SEARCH_BOOK_REQUEST,
  SEARCH_BOOK_SUCCESS,
  SEARCH_BOOK_FAIL,
  ALL_ISSUED_BOOK_REQUEST,
  ALL_ISSUED_BOOK_SUCCESS,
  ALL_ISSUED_BOOK_FAIL,
  GET_ISSUED_BOOKS_REQUEST,
  GET_ISSUED_BOOKS_SUCCESS,
  GET_ISSUED_BOOKS_FAIL,
  RETURN_BOOK_REQUEST,
  RETURN_BOOK_SUCCESS,
  RETURN_BOOK_FAIL,
  DELETE_ISSUED_BOOK_REQUEST,
  DELETE_ISSUED_BOOK_SUCCESS,
  DELETE_ISSUED_BOOK_FAIL,
  DELETE_ISSUED_BOOK_RESET,
  REQUEST_BOOK_REQUEST,
  REQUEST_BOOK_SUCCESS,
  REQUEST_BOOK_FAIL,
  NEW_REQUEST_BOOK_REQUEST,
  NEW_REQUEST_BOOK_SUCCESS,
  NEW_REQUEST_BOOK_FAIL,
  NEW_REQUEST_BOOK_RESET,
  DELETE_REQUESTED_BOOK_REQUEST,
  DELETE_REQUESTED_BOOK_SUCCESS,
  DELETE_REQUESTED_BOOK_RESET,
  DELETE_REQUESTED_BOOK_FAIL,
  ALL_BOOK_RESERVE_REQUEST,
  ALL_BOOK_RESERVE_SUCCESS,
  ALL_BOOK_RESERVE_FAIL,
  CANCEL_RESERVATION_RESET,
  CANCEL_RESERVATION_REQUEST,
  CANCEL_RESERVATION_SUCCESS,
  CANCEL_RESERVATION_FAIL,
  DELETE_BOOK_RESERVE_REQUEST,
  DELETE_BOOK_RESERVE_SUCCESS,
  DELETE_BOOK_RESERVE_FAIL,
  DELETE_BOOK_RESERVE_RESET,
  UPDATE_BOOK_REQUEST,
  UPDATE_BOOK_SUCCESS,
  UPDATE_BOOK_RESET,
  UPDATE_BOOK_FAIL,
  DELETE_BOOK_REQUEST,
  DELETE_BOOK_SUCCESS,
  DELETE_BOOK_RESET,
  DELETE_BOOK_FAIL,
  BOOK_DETAILS_SUCCESS,
  BOOK_DETAILS_REQUEST,
  BOOK_DETAILS_FAIL,
  BOOK_RESERVE_REQUEST,
  BOOK_RESERVE_SUCCESS,
  BOOK_RESERVE_FAIL,
  BOOK_RESERVE_RESET,
  CLEAR_ERRORS,
} from "../constants/bookConstant";

export const bookDetailsReducer = (state = { book: {} }, action) => {
  switch (action.type) {
    case BOOK_DETAILS_REQUEST:
      return {
        loading: true,
        ...state,
      };
    case BOOK_DETAILS_SUCCESS:
      return {
        book: action.payload,
        loading: false,
      };
    case BOOK_DETAILS_FAIL:
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

export const booksReducer = (state = { books: [] }, action) => {
  switch (action.type) {
    case ALL_BOOK_REQUEST:
    case ADMIN_BOOK_REQUEST:
      return {
        loading: true,
        books: [],
      };
    case ALL_BOOK_SUCCESS:
      return {
        books: action.payload.books,
        booksCount: action.payload.booksCount,
        resultPerPage: action.payload.resultPerPage,
        filteredBooksCount:action.payload.filteredBooksCount,
        loading: false,
      };
    case ADMIN_BOOK_SUCCESS:
      return {
        loading: false,
        books: action.payload,
      };
    case ALL_BOOK_FAIL:
    case ADMIN_BOOK_FAIL:
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

// CREATE NEW BOOOK -- ADMIN
export const newBookReducer = (state = { book: {} }, action) => {
  switch (action.type) {
    case NEW_BOOK_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case NEW_BOOK_SUCCESS:
      return {
        loading: false,
        success: action.payload.success,
        book: action.payload.book,
      };
    case NEW_BOOK_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case NEW_BOOK_RESET:
      return {
        ...state,
        success: false,
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

// DELETE BOOOK -- ADMIN
// UPDATE BOOK --   ADMIN
export const bookReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_BOOK_REQUEST:
    case UPDATE_BOOK_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case DELETE_BOOK_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload.success,
        message: action.payload.message,
      };
    case UPDATE_BOOK_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: action.payload.success,
        message: action.payload.message
      };
    case DELETE_BOOK_FAIL:
    case UPDATE_BOOK_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case DELETE_BOOK_RESET:
      return {
        ...state,
        isDeleted: false,
      };
    case UPDATE_BOOK_RESET:
      return {
        ...state,
        isUpdated: false,
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

// issue BOOk reducer Admin
export const issueBookReducer = (state = { success: false }, action) => {
  switch (action.type) {
    case ISSUE_BOOK_REQUEST:
      return { loading: true };
    case ISSUE_BOOK_SUCCESS:
      return { loading: false, success: true, issueBook: action.payload };
    case ISSUE_BOOK_FAIL:
      return { loading: false, success: false, error: action.payload };
    case ISSUE_BOOK_RESET:
      return {
        ...state,
        success: false,
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

// DELETE ISSUE BOOK -- ADMIN
export const deleteIssueBookReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_ISSUED_BOOK_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case DELETE_ISSUED_BOOK_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload,
      };
    case DELETE_ISSUED_BOOK_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case DELETE_ISSUED_BOOK_RESET:
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

export const returnBookReducer = (state = {}, action) => {
  switch (action.type) {
    case RETURN_BOOK_REQUEST:
      return { loading: true };
    case RETURN_BOOK_SUCCESS:
      return { loading: false, success: true };
    case RETURN_BOOK_FAIL:
      return { loading: false, error: action.payload };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

// Reducer for book reservation
export const bookReserveReducer = (state = {}, action) => {
  switch (action.type) {
    case BOOK_RESERVE_REQUEST:
      return { ...state, loading: true };
    case BOOK_RESERVE_SUCCESS:
      return { 
        ...state, 
        loading: false, 
        isReserved: action.payload.success,
        message: action.payload.message
      };
    case BOOK_RESERVE_FAIL:
      return { ...state, loading: false, error: action.payload };
    case BOOK_RESERVE_RESET:
      return { ...state, isReserved:false};
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

// Book reducer
export const searchBookReducer = (state = { books: [] }, action) => {
  switch (action.type) {
    case SEARCH_BOOK_REQUEST:
      return { ...state, loading: true, error: null };
    case SEARCH_BOOK_SUCCESS:
      return {
        ...state,
        loading: false,
        books: action.payload.books,
        error: null,
      };
    case SEARCH_BOOK_FAIL:
      return { ...state, loading: false, books: [], error: action.payload };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const issuedBooksReducer = (state = { issueBooks: [] }, action) => {
  switch (action.type) {
    case ALL_ISSUED_BOOK_REQUEST:
      return {
        loading: true,
        issueBooks: [],
      };
    case ALL_ISSUED_BOOK_SUCCESS:
      return {
        loading: false,
        issueBooks: action.payload,
      };
    case ALL_ISSUED_BOOK_FAIL:
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

export const issuedBooksToUserReducer = (state = { issues: [] }, action) => {
  switch (action.type) {
    case GET_ISSUED_BOOKS_REQUEST:
      return {
        loading: true,
        issues: [],
      };
    case GET_ISSUED_BOOKS_SUCCESS:
      return {
        loading: false,
        issues: action.payload,
      };
    case GET_ISSUED_BOOKS_FAIL:
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

export const requestedBooksReducer = (
  state = { requestedBooks: [] },
  action
) => {
  switch (action.type) {
    case REQUEST_BOOK_REQUEST:
      return {
        loading: true,
        requestedBooks: [],
      };
    case REQUEST_BOOK_SUCCESS:
      return {
        loading: false,
        requestedBooks: action.payload,
      };
    case REQUEST_BOOK_FAIL:
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

// CREATE NEW requested BOOOK -- ADMIN
export const newRequestBookReducer = (state = {}, action) => {
  switch (action.type) {
    case NEW_REQUEST_BOOK_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case NEW_REQUEST_BOOK_SUCCESS:
      return {
        loading: false,
        success: action.payload.success,
        message: action.payload.message,
      };
    case NEW_REQUEST_BOOK_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case NEW_REQUEST_BOOK_RESET:
      return {
        ...state,
        success: false,
        message: null,
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

// DELETE REQUEST BOOK -- ADMIN
export const deleteRequestedBookReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_REQUESTED_BOOK_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case DELETE_REQUESTED_BOOK_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload,
      };
    case DELETE_REQUESTED_BOOK_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case DELETE_REQUESTED_BOOK_RESET:
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

export const reservedBooksReducer = (state = { reservedBooks: [] }, action) => {
  switch (action.type) {
    case ALL_BOOK_RESERVE_REQUEST:
      return {
        loading: true,
        reservedBooks: [],
      };
    case ALL_BOOK_RESERVE_SUCCESS:
      return {
        loading: false,
        reservedBooks: action.payload,
      };
    case ALL_BOOK_RESERVE_FAIL:
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

export const cancelReservationReducer = (state = {}, action) => {
  switch (action.type) {
    case CANCEL_RESERVATION_REQUEST:
      return { ...state,loading: true };
    case CANCEL_RESERVATION_SUCCESS:
      return { ...state,loading: false,  isCancled: action.payload.success, message: action.payload.message };
    case CANCEL_RESERVATION_FAIL:
      return { ...state,loading: false, error: action.payload };
      case CANCEL_RESERVATION_RESET:
        return { ...state, isCancled: false };
    default:
      return state;
  }
};

// DELETE Reserved BOOK -- ADMIN
export const deleteReservedBookReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_BOOK_RESERVE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case DELETE_BOOK_RESERVE_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload,
      };
    case DELETE_BOOK_RESERVE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case DELETE_BOOK_RESERVE_RESET:
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

import axios from "axios"

import {
  ALL_BOOK_FAIL,
  ALL_BOOK_REQUEST,
  ALL_BOOK_SUCCESS,
  ADMIN_BOOK_REQUEST,
  ADMIN_BOOK_SUCCESS,
  ADMIN_BOOK_FAIL,
  NEW_BOOK_REQUEST,
  NEW_BOOK_SUCCESS,
  NEW_BOOK_FAIL,
  ISSUE_BOOK_REQUEST,
  ISSUE_BOOK_SUCCESS,
  ISSUE_BOOK_FAIL,
  RETURN_BOOK_REQUEST,
  RETURN_BOOK_SUCCESS,
  RETURN_BOOK_FAIL,
  SEARCH_BOOK_REQUEST,
  SEARCH_BOOK_SUCCESS,
  SEARCH_BOOK_FAIL,
  ALL_ISSUED_BOOK_REQUEST,
  ALL_ISSUED_BOOK_SUCCESS,
  ALL_ISSUED_BOOK_FAIL,
  GET_ISSUED_BOOKS_REQUEST,
  GET_ISSUED_BOOKS_SUCCESS,
  GET_ISSUED_BOOKS_FAIL,
  UPDATE_BOOK_REQUEST,
  UPDATE_BOOK_SUCCESS,
  UPDATE_BOOK_FAIL,
  DELETE_BOOK_REQUEST,
  DELETE_BOOK_SUCCESS,
  DELETE_BOOK_FAIL,
  DELETE_ISSUED_BOOK_REQUEST,
  DELETE_ISSUED_BOOK_SUCCESS,
  DELETE_ISSUED_BOOK_FAIL,
  NEW_REQUEST_BOOK_REQUEST,
  NEW_REQUEST_BOOK_SUCCESS,
  NEW_REQUEST_BOOK_FAIL,
  REQUEST_BOOK_REQUEST,
  REQUEST_BOOK_SUCCESS,
  REQUEST_BOOK_FAIL,
  DELETE_REQUESTED_BOOK_REQUEST,
  DELETE_REQUESTED_BOOK_SUCCESS,
  DELETE_REQUESTED_BOOK_FAIL,
  ALL_BOOK_RESERVE_REQUEST,
  ALL_BOOK_RESERVE_SUCCESS,
  ALL_BOOK_RESERVE_FAIL,
  DELETE_BOOK_RESERVE_REQUEST,
  DELETE_BOOK_RESERVE_SUCCESS,
  DELETE_BOOK_RESERVE_FAIL,

  BOOK_DETAILS_REQUEST,
  BOOK_DETAILS_SUCCESS,
  BOOK_DETAILS_FAIL,
  BOOK_RESERVE_REQUEST,
  BOOK_RESERVE_SUCCESS,
  BOOK_RESERVE_FAIL,
  CANCEL_RESERVATION_REQUEST,
  CANCEL_RESERVATION_SUCCESS,
  CANCEL_RESERVATION_FAIL,


  CLEAR_ERRORS,
} from "../constants/bookConstant"


// GET ALL BOOKS ACTION
export const getBook = (keyword = "", currentPage = 1,) => async (dispatch) => {


  try {
    dispatch({ type: ALL_BOOK_REQUEST })
    let url = `/books?keyword=${keyword}&page=${currentPage}`;


    const { data } = await axios.get(url)
    dispatch({
      type: ALL_BOOK_SUCCESS,
      payload: data
    })
  } catch (error) {
    dispatch({ type: ALL_BOOK_FAIL, payload: error.response.data.message });
  }

}


// GET ALL BOOKS by Admin
export const getAdminBook = () => async (dispatch) => {


  try {
    dispatch({ type: ADMIN_BOOK_REQUEST })

    const { data } = await axios.get('/admin/books')
    dispatch({
      type: ADMIN_BOOK_SUCCESS,
      payload: data.books
    })
  } catch (error) {
    dispatch({ type: ADMIN_BOOK_FAIL, payload: error.response.data.message });
  }

}

// Create Product ADMIN
export const createBook = (bookData) => async (dispatch) => {
  try {
    dispatch({ type: NEW_BOOK_REQUEST });

    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const { data } = await axios.post(
      `/admin/book/new`,
      bookData,
      config
    );

    dispatch({
      type: NEW_BOOK_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: NEW_BOOK_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Update Product ADMIN
export const updateBook = (id, bookData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_BOOK_REQUEST });

    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const { data } = await axios.put(
      `/admin/book/${id}`,
      bookData,
      config
    );

    dispatch({
      type: UPDATE_BOOK_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_BOOK_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Issue BOOk  ADMIN
export const issueBook = (issueData) => async (dispatch) => {
  try {
    dispatch({ type: ISSUE_BOOK_REQUEST });

    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const { data } = await axios.post(
      `/admin/issue-book`,
      issueData,
      config
    );

    dispatch({
      type: ISSUE_BOOK_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ISSUE_BOOK_FAIL,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
    });
  }
};

// Book search for issue
export const searchBook = (id) => async (dispatch) => {
  try {
    dispatch({ type: SEARCH_BOOK_REQUEST });

    // Perform the API request to search for books using the provided keyword
    const { data } = await axios.get(`/admin/search-books/${id}`,)

    dispatch({ type: SEARCH_BOOK_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: SEARCH_BOOK_FAIL, payload: error.message });
  }
};

// return book action admin
export const returnBook = (issueBookId, bookId) => async (dispatch) => {
  try {
    dispatch({ type: RETURN_BOOK_REQUEST });

    const config = {
      headers: { 'Content-Type': 'application/json' },
    };

    const { data } = await axios.put(
      `/admin/issued-book-return/${issueBookId}`,
      { book: bookId },
      config
    );

    dispatch({
      type: RETURN_BOOK_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: RETURN_BOOK_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// GET ALL ISSued BOOKS by Admin
export const getIssuedBooks = () => async (dispatch) => {


  try {
    dispatch({ type: ALL_ISSUED_BOOK_REQUEST })

    const { data } = await axios.get('/admin/issued-books')
    dispatch({
      type: ALL_ISSUED_BOOK_SUCCESS,
      payload: data.issueBooks
    })
  } catch (error) {
    dispatch({ type: ALL_ISSUED_BOOK_FAIL, payload: error.response.data.message });
  }

}

// Action to get issued books for a particular user
export const getIssueBooks = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ISSUED_BOOKS_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.get(`/issue-user`, config);

    dispatch({ type: GET_ISSUED_BOOKS_SUCCESS, payload: data.issues });
  } catch (error) {
    dispatch({
      type: GET_ISSUED_BOOKS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// Delete Book ADMIN
export const deleteBook = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_BOOK_REQUEST });


    const { data } = await axios.delete(
      `/admin/book/${id}`
    );

    dispatch({
      type: DELETE_BOOK_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: DELETE_BOOK_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Delete Issue Book ADMIN
export const deleteIssueBook = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_ISSUED_BOOK_REQUEST });

    const { data } = await axios.delete(
      `/admin/issued-book/${id}`
    );

    dispatch({
      type: DELETE_ISSUED_BOOK_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_ISSUED_BOOK_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,

    });
  }
};

// GET A BOOK DEATILS ACTION
export const getBookDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: BOOK_DETAILS_REQUEST })
    const { data } = await axios.get(`/book/${id}`)
    dispatch({
      type: BOOK_DETAILS_SUCCESS,
      payload: data.book,
    })
  } catch (error) {
    dispatch({
      type: BOOK_DETAILS_FAIL, payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
}

// Action to reserve a book
export const reserveBook = (bookId) => async (dispatch) => {
  try {
    dispatch({ type: BOOK_RESERVE_REQUEST });

    const config = { headers: { 'Content-Type': 'application/json' } }

    // Send a POST request to the API to reserve the book
    const { data } = await axios.post(`/book-reserve`, { bookId }, config);

    dispatch({ type: BOOK_RESERVE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: BOOK_RESERVE_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const cancelReservation = (reservationId, userId) => async (dispatch) => {
  try {
    dispatch({ type: CANCEL_RESERVATION_REQUEST });

    const config = {
      headers: { 'Content-Type': 'application/json' },
    };

    const { data } = await axios.put(`/book-reserve/${reservationId}`, { userId }, config);

    dispatch({ type: CANCEL_RESERVATION_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: CANCEL_RESERVATION_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// Create request for book ADMIN
export const createRequestedBook = (bookData) => async (dispatch) => {
  try {
    dispatch({ type: NEW_REQUEST_BOOK_REQUEST });

    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const { data } = await axios.post(
      `/book-request`,
      bookData,
      config
    );

    dispatch({
      type: NEW_REQUEST_BOOK_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: NEW_REQUEST_BOOK_FAIL,
      payload: error.response.data.message,
    });
  }
};


// Action to get All requested Book a book
export const getAllRequestedBooks = () => async (dispatch) => {
  try {
    dispatch({ type: REQUEST_BOOK_REQUEST });

    const { data } = await axios.get(`/admin/requested-books`);

    dispatch({ type: REQUEST_BOOK_SUCCESS, payload: data.requestedBooks });
  } catch (error) {
    dispatch({
      type: REQUEST_BOOK_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

// Delete Requested Book ADMIN
export const deleteRequestedBook = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_REQUESTED_BOOK_REQUEST });

    const { data } = await axios.delete(
      `/admin/requested-book/${id}`
    );

    dispatch({
      type: DELETE_REQUESTED_BOOK_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_REQUESTED_BOOK_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,

    });
  }
};

// Delete RESERVED Book ADMIN
export const deleteReservedBook = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_BOOK_RESERVE_REQUEST });

    const { data } = await axios.delete(
      `/admin/reserved-book/${id}`
    );

    dispatch({
      type: DELETE_BOOK_RESERVE_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_BOOK_RESERVE_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,

    });
  }
};

// Action to get All reserved Book a book
export const getAllReservedBooks = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_BOOK_RESERVE_REQUEST });

    const { data } = await axios.get(`/admin/reserved-books`);

    dispatch({ type: ALL_BOOK_RESERVE_SUCCESS, payload: data.reservedBooks });
  } catch (error) {
    dispatch({
      type: ALL_BOOK_RESERVE_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

// Clearing Error
export const clearErrors = async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS })
}
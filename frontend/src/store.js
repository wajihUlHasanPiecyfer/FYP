// import { createStore, combineReducers, applyMiddleware } from "redux"

// import thunk from "redux-thunk"

// import { composeWithDevTools } from "redux-devtools-extension"
// import { bookReducer , bookDetailsReducer} from "./reducers/bookReducer"
// import { userReducer } from "./reducers/userReducer"

// const reducer = combineReducers({
//     books: bookReducer,
//     bookDetails: bookDetailsReducer,
//     user: userReducer

// })

// let initialState = {}

// const middleware = [thunk]

// const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

// export default store

import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import {
  booksReducer,
  bookDetailsReducer,
  bookReserveReducer,
  newBookReducer,
  bookReducer,
  issueBookReducer,
  searchBookReducer,
  issuedBooksReducer,
  returnBookReducer,
  deleteIssueBookReducer,
  requestedBooksReducer,
  deleteRequestedBookReducer,
  reservedBooksReducer,
  cancelReservationReducer,
  deleteReservedBookReducer,
  issuedBooksToUserReducer,
  newRequestBookReducer
} from "./reducers/bookReducer";
import {
  forgotPasswordReducer,
  profileReducer,
  searchUserReducer,
  userDetailsReducer,
  userReducer,
  allUsersReducer,
  userChatsReducer,
  deleteChatsReducer,
  feedbackReducer,
  deleteFeedbackReducer,
  userFeedbacksReducer,
} from "./reducers/userReducer";

const reducer = {
  books: booksReducer,
  bookDetails: bookDetailsReducer,
  user: userReducer,
  userDetails: userDetailsReducer,
  profile: profileReducer,
  forgotPassword: forgotPasswordReducer,
  bookreserve: bookReserveReducer,
  newBook: newBookReducer,
  book: bookReducer,
  issueBook: issueBookReducer,
  searchBook: searchBookReducer,
  searchUser: searchUserReducer,
  issuedBooks: issuedBooksReducer,
  returnBook: returnBookReducer,
  deleteIssueBook: deleteIssueBookReducer,
  requestedBooks: requestedBooksReducer,
  deleteReqeuestedBook: deleteRequestedBookReducer,
  reservedBooks: reservedBooksReducer,
  cancelReservation: cancelReservationReducer,
  deleteReservedBook: deleteReservedBookReducer,
  allusers : allUsersReducer,
  issuedBooksToUser:issuedBooksToUserReducer,
  newRequestBook:newRequestBookReducer,
  userChats:userChatsReducer,
  deleteChats:deleteChatsReducer,
  feedback:feedbackReducer,
  deleteFeedback:deleteFeedbackReducer,
  userFeedbacks:userFeedbacksReducer
};

const middleware = [thunk];

const store = configureStore({
  reducer,
  middleware,
  devTools: process.env.NODE_ENV !== "production",
});

export default store;

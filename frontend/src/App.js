import "./App.css";
import React from "react";
import Header from "./components/layout/Header/Header.js";
import { BrowserRouter as Router, Route, Routes, } from "react-router-dom";
import Footer from "./components/layout/Footer/Footer.js";
import Home from "./components/Home/Home";
import BookDetails from "./components/Book/BookDetails.js";
import Search from "./components/Book/Search.js";
import Books from "./components/Book/Books.js";
import LoginSignUp from "./components/User/LoginSignUp";
import Profile from "./components/User/Profile.js";
import UpdateProfile from "./components/User/UpdateProfile.js";
import UpdatePassword from "./components/User/UpdatePassword";
import ForgotPassword from "./components/User/ForgotPassword.js";
import ResetPassword from "./components/User/ResetPassword.js";
import BookList from "./components/admin/BookList.js";
import store from "./store";
import { loadUser } from "./actions/userAction";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import Dashboard from "./components/admin/Dashboard.js";
import NewBook from "./components/admin/NewBook";
import UpdateProduct from "./components/admin/UpdateProduct.js"
import ProtectedRoute from "./components/Route/ProtectedRoute";
import IssueBook from "./components/admin/IssueBook";
import BorrowedBooks from "./components/admin/BorrowedBooks.js";
import RequestedBooks from "./components/admin/RequestedBooks"
import ReservedBooks from "./components/admin/ReservedBooks"
import UserList from "./components/admin/UserList.js"
import UpdateUser from "./components/admin/UpdateUser.js"
import RequestForBook from "./components/admin/RequestForBook.js"
import Notifications from "./components/admin/Notifications.js"
import Feedbacks from "./components/admin/FeedbackList"
import AboutUs from "./components/AboutUs/AboutUs"
import ContactUs from "./components/ContactUs/ContactUs"

function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  React.useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Router>
      <ToastContainer />
      <Header user={user} isAuthenticated={isAuthenticated} />

      <Routes>

        <Route exact path="/" element={<Home />} />
        <Route exact path="/about" element={<AboutUs />} />
        <Route exact path="/contact" element={<ContactUs />} />
        <Route exact path="/book/:id" element={<BookDetails />} />
        <Route exact path="/books" element={<Books />} />
        <Route exact path="/books/:keyword" element={<Books />} />
        <Route exact path="/search" element={<Search />} />
        <Route exact path="/password/forget" element={<ForgotPassword />} />
        <Route
          exact
          path="/password/reset/:token"
          element={<ResetPassword />}
        />
        <Route exact path="/login" element={<LoginSignUp />} />
        <Route exact path="/profile" element={<Profile />} />

        <Route element={<ProtectedRoute/>}>
          <Route
            exact
            path="/profile/update"
            element={<UpdateProfile />}
          />
          <Route
            exact
            path="/dashboard"
            element={<Dashboard />}
          />
          <Route
            exact
            path="/password/update"
            element={<UpdatePassword user={user} />}
          />
          <Route
            exact
            path="/request-book"
            element={<RequestForBook />}
          />
          <Route
            exact
            path="/notifications"
            element={<Notifications />}
          />
        </Route>

        <Route element={<ProtectedRoute isAdmin={true} />}>
          <Route exact
            path="/admin/reserved-books"
            element={<ReservedBooks />}
          />
          <Route
            exact
            path="/admin/books"
            element={<BookList />}
          />
          <Route
            exact
            path="/admin/book/:id"
            element={<UpdateProduct />}
          />
          <Route
            exact
            path="/admin/book/new"
            element={<NewBook />}
          />
          <Route
            exact
            path="/admin/issue-book"
            element={<IssueBook />}
          />

          <Route
            exact
            path="/admin/issued-books"
            element={<BorrowedBooks />}
          />
          <Route
            exact
            path="/admin/requested-books"
            element={<RequestedBooks />}
          />
          <Route
            exact
            path="/admin/users"
            element={<UserList />}
          />
          <Route
            exact
            path="/admin/user/:id"
            element={<UpdateUser />}
          />
          <Route
            exact
            path="/admin/feed-backs"
            element={<Feedbacks />}
          />
        </Route>

      </Routes>
      <Footer />
    </Router>
  );
}

export default App;

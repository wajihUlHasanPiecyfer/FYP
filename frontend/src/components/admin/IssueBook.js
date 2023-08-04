import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  searchBook,
  issueBook,
  clearErrors,
  getBookDetails,
} from "../../actions/bookAction";
import Swal from "sweetalert2";
import { searchUser, getUserDetails } from "../../actions/userAction";
import Sidebar from "./Sidebar";
import "./IssueBook.css";
import { useNavigate } from "react-router-dom";
import { ISSUE_BOOK_RESET } from "../../constants/bookConstant";
import MetaData from "../layout/MetaData";

const IssueBooks = () => {
  const dispatch = useDispatch();
  const history = useNavigate()

  const { user: issuedBy } = useSelector((state) => state.user);

  const {
    books,
  } = useSelector((state) => state.searchBook);
  const {
    users,
  } = useSelector((state) => state.searchUser);

  const { book } = useSelector((state) => state.bookDetails);
  const { user } = useSelector((state) => state.userDetails);

  const { success, error: issueError } = useSelector((state) => state.issueBook);

  const [selectedUser, setSelectedUser] = useState("");
  const [selectedBook, setSelectedBook] = useState("");
  const [issueDate, setIssueDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [userSuggestions, setUserSuggestions] = useState([]);
  const [bookSuggestions, setBookSuggestions] = useState([]);

  useEffect(() => {
  
    if (issueError) {
      Swal.fire("Error!", issueError, "error");
      dispatch(clearErrors);
    }

    if (success) {
      Swal.fire("Issued!", "Book issued successfully", "success");
      setSelectedUser("");
      setSelectedBook("");
      setIssueDate("");
      setReturnDate("");
      history("/admin/issue-book")
      dispatch({type: ISSUE_BOOK_RESET})
    }
  }, [success, dispatch, history, issueError]);

  const handleUserSearch = (value) => {
    setSelectedUser(value);
    dispatch(searchUser(selectedUser));
    if (value.trim() === "") {
      setUserSuggestions([]);
    } else {
      const filteredUsers =
        users &&
        users.filter(
          (user) =>
            (user && user.name.toLowerCase().includes(value.toLowerCase())) ||
            (user && user._id.toLowerCase().includes(value.toLowerCase()))
        );

      setUserSuggestions(filteredUsers);
    }
  };

  const handleUserClick = (user) => {
    setSelectedUser(user.name);
    dispatch(getUserDetails(user._id));
    setUserSuggestions([]);
  };

  const handleBookSearch = (value) => {
    setSelectedBook(value);
    dispatch(searchBook(selectedBook));
    if (value.trim() === "") {
      setBookSuggestions([]);
    } else {
      const filteredBooks =
        books &&
        books.filter(
          (book) =>
            book && book.title.toLowerCase().includes(value.toLowerCase())
        );

      setBookSuggestions(filteredBooks);
    }
  };
  const handleBookClick = (book) => {
    setSelectedBook(book.name);
    dispatch(getBookDetails(book._id));
    setBookSuggestions([]);
  };

  const handleIssueBook = (e) => {
    e.preventDefault();
    const myForm = new FormData();

    myForm.set("book", book._id);
    myForm.set("user", user._id);
    myForm.set("issueDate", issueDate);
    myForm.set("returnDate", returnDate);
    myForm.set("issuedBy", issuedBy._id);


      Swal.fire({
      title: 'Do you want to save the changes?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Save',
      denyButtonText: `Don't save`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        dispatch(issueBook(myForm));
      } else if (result.isDenied) {
        Swal.fire('Book not issued', '', 'info')
     }
    })
  };

  return (
    <>
    <MetaData tiltle="Issue Book" />
    <div className="dashboard">
      <Sidebar />

      <div className="newProductContainer">
        <div className="content">
          <div className="card">
            <div className="card-body">
              <section className="content-header">
                <div className="container-fluid">
                  <div className="row mb-2">
                    <div className="col-sm-6">
                      <h1 className="bookCreateHeading"> Issue Book </h1>
                    </div>
                  </div>
                </div>
              </section>

              <section className="content">
                <div className="row">
                  <div className="col-md-12 col-12 mb-10">
                    <form action="" id="issueBook">
                      <div className="card">
                        <div className="card-body">
                          <div className="form-row mb-10">
                            <div className="mb-10 col-md col-6">
                              <div className="form-row mb-10">
                                <div className="input-group">
                                  <div className="input-group-prepend">
                                    <span className="input-group-text">
                                      Search User
                                    </span>
                                  </div>
                                  <input
                                    // id="user_autocomplete"
                                    type="text"
                                    placeholder="Search user by name or ID"
                                    value={selectedUser}
                                    onChange={(e) => handleUserSearch(e.target.value)}
                                    className="form-control"
                                    autoComplete="off"
                                  ></input>
                                </div>
                                {userSuggestions && userSuggestions.length > 0 && (
                                  <ul className="user-suggestions">
                                    {userSuggestions.map((user) => (
                                      <li
                                        className="list-group-item"
                                        key={user._id}
                                        onClick={() => handleUserClick(user)}
                                      >
                                        Name: {user.name} | ID: {user._id}

                                      </li>
                                    ))}
                                  </ul>
                                )}
                              </div>
                              <div className="form-row">
                                <div className="col-md-3">
                                  <img
                                    id="user_image"
                                    src={
                                      user?.avatar?.url ||
                                      "https://via.placeholder.com/400X400"
                                    }
                                    className="ui-state-default img-thumbnail"
                                    alt="juzz"
                                  />
                                </div>
                                <div className="col-md-9">
                                  <ul className="list-group text-sm">
                                    <li className="list-group-item text-capitalize">
                                      User ID : <span>{user?._id || "N/A"}</span>
                                    </li>
                                    <li className="list-group-item text-capitalize">
                                      Name : <span>{user?.name || "N/A"}</span>
                                    </li>
                                    <li className="list-group-item">
                                      Email : <span>{user?.email || "N/A"}</span>
                                    </li>
                                    <li className="list-group-item">
                                      Phone Number :{" "}
                                      <span>{user?.phoneNumber || "N/A"}</span>
                                    </li>
                                    <li className="list-group-item address_li">
                                      Address :<span>{user?.address || "N/A"}</span>
                                    </li>
                                    <li className="list-group-item address_li">
                                      Borrowed Books :
                                      <span>
                                        {user?.reservedBooks?.length || "N/A"}
                                      </span>
                                    </li>

                                    <li className="list-group-item user_history_holder">
                                      Borrowing History
                                      <a
                                        target="_blank"
                                        href="/"
                                        id="user_history"
                                        className="float-right"
                                      >
                                        <i className="fas fa-search mr-1"></i>
                                      </a>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </div>
                            <div className="mb-10 col-md col-6">
                              <div className="form-row mb-10">
                                <div className="input-group">
                                  <div className="input-group-prepend ">
                                    <span className="input-group-text ">
                                      Search Book
                                      <a
                                        data-toggle="tooltip"
                                        data-placement="top"
                                        title="Try Book Id : Type 97"
                                        alt="juzz"
                                        href="/"
                                      >
                                        <i className="fas fa-info-circle"></i>
                                      </a>
                                    </span>{" "}
                                  </div>
                                  <input
                                    type="text"
                                    placeholder="Search user by name or ID"
                                    value={selectedBook}
                                    onChange={(e) => handleBookSearch(e.target.value)}
                                    className="form-control"
                                    autoComplete="off"
                                  />
                                </div>
                                {bookSuggestions && bookSuggestions.length > 0 && (
                                  <ul className="user-suggestions">
                                    {bookSuggestions.map((book) => (
                                      <li
                                        className="list-group-item"
                                        key={book._id}
                                        onClick={() => handleBookClick(book)}
                                      >
                                        Title: {book.title} | Id: {book._id}
                                      </li>
                                    ))}
                                  </ul>
                                )}
                              </div>
                              <div className="form-row">
                                <div className="col-md-3">
                                  <img
                                    id="book_image"
                                    src={
                                      book && book.images && book.images[0]?.url
                                        ? book.images[0].url
                                        : "https://via.placeholder.com/400X400"
                                    }
                                    className="ui-state-default img-thumbnail"
                                    alt="juzz"
                                  />
                                </div>
                                <div className="col-md-9">
                                  <ul className="list-group text-sm">
                                    <li className="list-group-item text-capitalize">
                                      Book ID : <span>{book?._id || "N/A"}</span>
                                    </li>
                                    <li className="list-group-item text-capitalize">
                                      ISBN : <span>{book?.ISBN || "N/A"}</span>
                                    </li>
                                    <li className="list-group-item text-capitalize">
                                      Title : <span>{book?.title || "N/A"}</span>
                                    </li>
                                    <li className="list-group-item text-capitalize">
                                      Author : <span>{book?.author || "N/A"}</span>
                                    </li>
                                    <li className="list-group-item text-capitalize">
                                      Publisher :
                                      <span>{book?.publisher || "N/A"}</span>
                                    </li>
                                    <li className="list-group-item text-capitalize">
                                      Category :{" "}
                                      <span>{book?.catagory || "N/A"}</span>
                                    </li>
                                    <li className="list-group-item text-capitalize">
                                      Quantity :{" "}
                                      <span>{book?.quantity || "N/A"}</span>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="form-row mb-10">
                            <div className="col-md mb-10">
                              <div className="input-group">
                                <div className="input-group-prepend ">
                                  <span className="input-group-text ">Issue Date</span>{" "}
                                </div>
                                <input
                                  type="date"
                                  value={issueDate}
                                  onChange={(e) => setIssueDate(e.target.value)}
                                  className="form-control hasDatepicker"
                                />
                                <input
                                  type="hidden"
                                  id="issue_date"
                                  value="2023-07-09"
                                />
                              </div>
                            </div>
                            <div className="col-md mb-10">
                              <div className="input-group">
                                <div className="input-group-prepend ">
                                  <span className="input-group-text ">Return Date</span>{" "}
                                </div>
                                <input
                                  type="date"
                                  value={returnDate}
                                  onChange={(e) => setReturnDate(e.target.value)}
                                  className="form-control hasDatepicker"
                                />
                                <input
                                  type="hidden"
                                  id="return_date"
                                  value="2023-07-09"
                                />
                              </div>
                            </div>
                            <div className="col-md mb-10">
                              <button
                                type="button"
                                className="btn btn-danger"
                                onClick={handleIssueBook}
                                disabled={!user._id || !book._id || !returnDate || !issueDate}
                              >
                                Issue Book
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default IssueBooks;

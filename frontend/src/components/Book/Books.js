import React, { Fragment, useEffect, useState } from "react";
import { clearErrors, getBook } from "../../actions/bookAction";
import { useSelector, useDispatch } from "react-redux";
import { Loader } from "../layout/Loader/Loader";
import BookCard from "../Home/BookCard";
import "./Book.css";
import { useParams, Link } from "react-router-dom";
import Pagination from "react-js-pagination";
import Swal from "sweetalert2";
import MetaData from "../layout/MetaData";
import SearchIcon from '@mui/icons-material/Search';
import FeedbackForm from "./Feedback";

const catagories = [
  "Technology",
  "Computer Science",
  "Science",
  "Religion",
  "Business",
  "Literature",
  "Management",
  "Electronics",
  "Physics",
  "Chemistry",
  "Mathematics",
  "Fiction",
  "Romance",
  "Philosophy",
  "Language",
  "Arts",
];

const Books = () => {
  const dispatch = useDispatch();
  const { keyword } = useParams();
  const {
    books,
    loading,
    error,
    booksCount,
    resultPerPage,
    filteredBooksCount,
  } = useSelector((state) => state.books);
  const count = filteredBooksCount
  const [currentPage, setCurrentPage] = useState(1);
  const [catagory, setCatagory] = useState("");
  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };
  useEffect(() => {
    if (error) {
      Swal.fire("Error!", error, "error");
      dispatch(clearErrors);
    }

    dispatch(getBook(keyword, currentPage, catagory));
  }, [dispatch, keyword, currentPage, catagory, error]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="BOOKS -- SCHOLAR'S LIBRARY" />
            <h2 className="booksHeading">Available Books</h2>
            <div className="container">
              <div className="row book-wrapper">
                <div className="col-lg-3 col-md-3">
                  <div className="portfolio-menu text-center">

                    <Link className="zurbail" to="/books">
                      <button
                        className={`btn btn-outline-dark cat-btn ${catagory === "" ? "active" : ""
                          }`}
                        onClick={() => setCatagory("")}
                      >
                        All Books
                      </button>
                    </Link>

                    {catagories.map((catagoryItem) => (
                      <Link className="zurbail" key={catagoryItem} to={`/books/${catagoryItem}`}>
                        <button
                          className={`btn btn-outline-dark cat-btn ${catagory === catagoryItem ? "active" : ""
                            }`}
                          onClick={() => setCatagory(catagoryItem)}
                        >
                          {catagoryItem}
                        </button>
                      </Link>
                    ))}
                  </div>

                </div>

                <div className="col-lg-9 col-md-9">
                  <div className="row row-btn">
                    <div className="col-12">
                      <Link to="/Search"
                        style={{ width: "100%" }}
                      >
                        <button

                          type="button"
                          className="search-btn"
                          style={{ width: "100%" }}
                        >
                          <SearchIcon /> Search Books by Title, Author, Publisher
                        </button>
                      </Link>
                    </div>
                  </div>
                  <div className="books">
                    {books &&
                      books.map((book) => (
                        <BookCard key={book._id} book={book} />
                      ))}
                  </div>
                </div>
            </div>
          </div>
          {resultPerPage < count && (
            <div className="paginationBox">
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resultPerPage}
                totalItemsCount={booksCount}
                onChange={setCurrentPageNo}
                nextPageText="Next"
                prevPageText="Prev"
                firstPageText="1st"
                lastPageText="Last"
                itemClass="page-item"
                linkClass="page-link"
                activeClass="pageItemActive"
                activeLinkClass="pageLinkActive"
              />
            </div>
      )}
      <div>
        <FeedbackForm />
      </div>


    </Fragment>
  )
}
    </Fragment >
  );
};

export default Books;

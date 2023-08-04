import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearErrors,
  getIssuedBooks,
  returnBook,
  deleteIssueBook,
} from "../../actions/bookAction";
import { useNavigate } from "react-router-dom";
import "./BookList.css";
import Swal from "sweetalert2";
import MetaData from "../layout/MetaData";
import Sidebar from "./Sidebar";
import { DELETE_ISSUED_BOOK_RESET } from "../../constants/bookConstant";

import { TablePagination } from "@mui/material";

const IssuedBooks = () => {
  const dispatch = useDispatch();
  const history = useNavigate();

  const { error, issueBooks } = useSelector((state) => state.issuedBooks);
  const { error: returnError, success } = useSelector(
    (state) => state.returnBook
  );
  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.deleteIssueBook
  );

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const deleteIssueBookHandler = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteIssueBook(id));
      }
    });
  };

  useEffect(() => {
    if (error) {
      Swal.fire("Error!", error, "error");
      dispatch(clearErrors);
    }
    if (returnError) {
      Swal.fire("Error!", returnError, "error");
      dispatch(clearErrors);
    }
    if (deleteError) {
      Swal.fire("Error!", deleteError, "error");
      dispatch(clearErrors);
    }
    if (success) {
      Swal.fire("Returnd!", "Book returned.", "success");
      history("/admin/issued-books");
    }
    if (isDeleted) {
      Swal.fire("Deleted!", "The ISSUED-BOOK has been deleted successfully.", "success");
      history("/admin/issued-books");
      dispatch({ type: DELETE_ISSUED_BOOK_RESET });
    }

    dispatch(getIssuedBooks());
  }, [dispatch, error, history, success, isDeleted, deleteError, returnError]);

  const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setCurrentPage(0);
  };

  const filteredBooks = issueBooks.filter((book) => {
    const user = book?.user?.name ?? "";
    const title = book?.book?.title ?? "";
    const ISBN = book?.book?.ISBN ?? "";

    if (!isNaN(searchTerm)) {
      return (
        typeof ISBN === "number" &&
        String(ISBN).toLowerCase().includes(searchTerm.toLowerCase())
      );
    } else {
      return (
        user.toLowerCase().includes(searchTerm.toLowerCase()) ||
        title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
  });

  const indexOfLastBook = (currentPage + 1) * rowsPerPage;
  const indexOfFirstBook = currentPage * rowsPerPage;
  const currentBooks =
    filteredBooks && filteredBooks.slice(indexOfFirstBook, indexOfLastBook);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(0);
  };

  const handleReturnBook = (issueBookId, bookId) => {
    Swal.fire({
      title: "Are you confirm that Book is returned?",
      showCancelButton: true,
      confirmButtonText: "Yes",
      denyButtonText: `Don't save`,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        dispatch(returnBook(issueBookId, bookId));
      }
    });
  };

  const rows = currentBooks?.map((item) => ({
    id: item._id,
    bookid: item.book?._id,
    userid: item.user?._id,
    title: item.book?.title,
    name: item.user?.name,
    issueDate: item.issueDate,
    returnDate: item.returnDate,
    issuedBy: item.issuedBy,
    returned: item.returned,
  }));

  return (
    <Fragment>
      <MetaData title={"All BORROWED BOOKS -- ADMIN"} />

      <div className="dashboard">
        <Sidebar />
        <div className="productListContainer">
          <div className="content">
            <div className="card">
              <div className="card-body">
                <h1 className="bookCreateHeading">ISSUED BOOKS</h1>

                <div className="form-group col-md-12 col-12">
                  <div className="input-group">
                    <div className="input-group-preppend">
                      <div className="input-group-text">Search by Name, Title, Author, Publisher</div>
                    </div>
                    <input
                      className="form-control"
                      type="text"
                      placeholder="search..."
                      value={searchTerm}
                      onChange={handleSearch}
                    />
                  </div>
                </div>

                <div className="table-responsive myTable">
                  <table className="table table-striped table-bordered">
                    <thead>
                      <tr>
                        <th>Book ID</th>
                        <th>Book Title</th>
                        <th>User ID</th>
                        <th>User Name</th>
                        <th>Issue Date</th>
                        <th>Return Date</th>
                        <th>Issued By</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {rows &&
                        rows.map((row) => (
                          <tr key={row.id}>
                            <td>{row.bookid}</td>
                            <td>{row.title}</td>
                            <td>{row.userid}</td>
                            <td>{row.name}</td>
                            <td>{row.issueDate && row.issueDate.substring(0, 10)}</td>
                            <td>
                              {row.returnDate && row.returnDate.substring(0, 10)}
                            </td>
                            <td>{row.issuedBy}</td>
                            <td>
                              {row.returned ? (
                                <strong className="returned-book">Returned</strong>
                              ) : (
                                <button
                                  className="btn btn-secondary"
                                  onClick={() => handleReturnBook(row.id, row.bookid)}
                                >
                                  Return
                                </button>
                              )}
                            </td>
                            <td>
                              <button
                                className="btn btn-danger"
                                onClick={() => deleteIssueBookHandler(row.id)}
                              >
                                DELETE
                              </button>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>

                <TablePagination
                  component="div"
                  count={filteredBooks && filteredBooks.length}
                  page={currentPage}
                  onPageChange={handleChangePage}
                  rowsPerPage={rowsPerPage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  colSpan={3}
                  SelectProps={{
                    inputProps: {
                      "aria-label": "rows per page",
                    },
                    native: true,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default IssuedBooks;

import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearErrors,
  getAllReservedBooks,
  cancelReservation,
  deleteReservedBook,
} from "../../actions/bookAction";
import { useNavigate } from "react-router-dom";
import "./BookList.css";
import Swal from "sweetalert2";
import MetaData from "../layout/MetaData";
import Sidebar from "./Sidebar";
import { CANCEL_RESERVATION_RESET, DELETE_BOOK_RESERVE_RESET } from "../../constants/bookConstant";

import { TablePagination } from "@mui/material";

const ReservedBooks = () => {
  const dispatch = useDispatch();
  const history = useNavigate();

  const { error, reservedBooks } = useSelector((state) => state.reservedBooks);
  const { error: cancelError, isCancled, message } = useSelector(
    (state) => state.cancelReservation
  );
  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.deleteReservedBook
  );

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const deleteReservedBookHandler = (id) => {
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
        dispatch(deleteReservedBook(id));
      }
    });
  };

  useEffect(() => {
    if (error) {
      Swal.fire("Error!", error, "error");
      dispatch(clearErrors);
    }
    if (cancelError) {
      Swal.fire("Error!", cancelError, "error");
      dispatch(clearErrors);
    }
    if (deleteError) {
      Swal.fire("Error!", error, "error");
      dispatch(clearErrors);
    }
    if (isCancled) {
      Swal.fire("Cancled!", message, "success");
      history("/admin/reserved-books");
      dispatch({ type: CANCEL_RESERVATION_RESET });
    }
    if (isDeleted) {
      Swal.fire("Deleted!", "Your file has been deleted.", "success");
      history("/admin/reserved-books");
      dispatch({ type: DELETE_BOOK_RESERVE_RESET });
    }

    dispatch(getAllReservedBooks());
  }, [dispatch, error, history, message, isDeleted, deleteError, isCancled, cancelError]);

  const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setCurrentPage(0);
  };

  const filteredBooks = reservedBooks.filter((book) => {
    const user = book?.user?.name ?? "";
    const title = book?.book?.title ?? "";
    if (searchTerm) {
      return (
        user.toLowerCase().includes(searchTerm.toLowerCase()) ||
        title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    } else {
      return true
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

  const handleCancleReserveBook = (reservationId, userId) => {
    Swal.fire({
      title: "Are you confirm to cancel Book Reservation?",
      showCancelButton: true,
      confirmButtonText: "Yes",
      denyButtonText: `Don't save`,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        Swal.fire("Reservation cancled Successfully!", "", "success");
        dispatch(cancelReservation(reservationId, userId));
      }
    });
  };

  const rows = currentBooks?.map((item) => ({
    id: item._id,
    bookid: item.bookId?._id,
    userid: item.userId?._id,
    title: item.bookId?.title,
    name: item.userId?.name,
    reservedDate: item.createdAt,
    cancelReservation: item.cancelReservation
  }));

  return (
    <Fragment>
      <MetaData title={"RESERVED BOOKS -- ADMIN"} />

      <div className="dashboard">
        <Sidebar />
        <div className="productListContainer">
          <div className="content">
            <div className="card">
              <div className="card-body">
                <h1 className="bookCreateHeading">Rserved BOOKS</h1>

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
                        <th>Reserve Date</th>
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
                            <td>{row.reservedDate && row.reservedDate.substring(0, 10)}</td>
                            <td>
                              {row.cancelReservation ? (
                                <strong className="returned-book">Cancled</strong>
                              ) : (
                                <button
                                  className="btn btn-secondary"
                                  onClick={() => handleCancleReserveBook(row.id, row.userid)}
                                >
                                  Cancle
                                </button>
                              )}
                            </td>
                            <td>
                              <button
                                className="btn btn-danger"
                                onClick={() => deleteReservedBookHandler(row.id)}
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

export default ReservedBooks;

import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearErrors,
  getIssueBooks,
} from "../../actions/bookAction";
import { useNavigate } from "react-router-dom";
import "./BookList.css";
import Swal from "sweetalert2";
import { TablePagination } from "@mui/material";

const BorrowedBooksByUser = () => {
  const dispatch = useDispatch();
  const history = useNavigate();

  const { error, issues } = useSelector((state) => state.issuedBooksToUser);
  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);


  useEffect(() => {
    if (error) {
      Swal.fire("Error!", error, "error");
      dispatch(clearErrors);
    }

    dispatch(getIssueBooks());
  }, [dispatch, error, history,]);

  const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setCurrentPage(0);
  };


  const indexOfLastBook = (currentPage + 1) * rowsPerPage;
  const indexOfFirstBook = currentPage * rowsPerPage;
  const currentBooks =
    issues && issues.slice(indexOfFirstBook, indexOfLastBook);



  const rows = currentBooks?.map((item) => ({
    id: item._id,
    bookid: item.book?._id,
    userid: item.user?._id,
    title: item.book?.title,
    name: item.user?.name,
    issueDate: item.issueDate,
    returnDate: item.returnDate,
    issuedBy: item.issuedBy.name,
    returned: item.returned,
    dateReturned: item.updatedAt,
  }));

  return (
    <Fragment>
      <div className="productListContainer">
        <div className="content">
          <div className="card">
            <div className="card-body">
            <h1 className="bookCreateHeading">Borrowed Books</h1>

              <div className="table-responsive myTable">
                <table className="table table-striped table-bordered">
                  <thead>
                    <tr>
                      <th>Book ID</th>
                      <th>Book Title</th>
                      <th>Date Of Issue</th>
                      <th>Date OF Return</th>
                      <th>Actual Date OF Returned</th>
                      <th>Issued By</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rows &&
                      rows.map((row) => (
                        <tr key={row.id}>
                          <td>{row.bookid}</td>
                          <td>{row.title}</td>

                          <td>{row.issueDate && row.issueDate.substring(0, 10)}</td>
                          <td>
                            {row.returnDate && row.returnDate.substring(0, 10)}
                          </td>
                          <td>  {row.returned ? (
                            <strong className="greenColor">{row.dateReturned}</strong>
                          ) : (
                            <strong
                              className="redColor">
                              Not Returned yet
                            </strong>
                          )}
                          </td>
                          <td>{row.issuedBy}</td>

                          <td>
                            {row.returned ? (
                              <strong className="greenColor">Returned</strong>
                            ) : (
                              <strong
                                className="redColor">
                                Not Returned
                              </strong>
                            )}
                          </td>

                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>

              <TablePagination
                component="div"
                count={issues && issues.length}
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
    </Fragment>
  );
};

export default BorrowedBooksByUser;

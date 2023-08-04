import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    clearErrors,
    getAllRequestedBooks,
    deleteRequestedBook,
} from "../../actions/bookAction";
import { useNavigate } from "react-router-dom";
import "./BookList.css";
import Swal from "sweetalert2";
import MetaData from "../layout/MetaData";
import Sidebar from "./Sidebar";
import { DELETE_REQUESTED_BOOK_RESET } from "../../constants/bookConstant";

import { TablePagination } from "@mui/material";

const RequestedBooks = () => {
    const dispatch = useDispatch();
    const history = useNavigate();

    const { error, requestedBooks } = useSelector((state) => state.requestedBooks);

    const { error: deleteError, isDeleted } = useSelector(
        (state) => state.deleteReqeuestedBook
    );

    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const deleteRequestedBookHandler = (id) => {
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
                dispatch(deleteRequestedBook(id));
            }
        });
    };

    useEffect(() => {
        if (error) {
            Swal.fire("Error!", error, "error");
            dispatch(clearErrors);
        }
        if (deleteError) {
            Swal.fire("Error!", deleteError, "error");
            dispatch(clearErrors);
        }
        if (isDeleted) {
            Swal.fire("Deleted!!", "The REQUESTED-BOOK has been deleted successfully", "error");
            history("/admin/requested-books");
            dispatch({ type: DELETE_REQUESTED_BOOK_RESET });
        }

        dispatch(getAllRequestedBooks());
    }, [dispatch, history, isDeleted, deleteError, error]);

    const handleChangePage = (event, newPage) => {
        setCurrentPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setCurrentPage(0);
    };

    const filteredBooks = requestedBooks.filter((book) => {
        const user = book?.requestedby?.name ?? "";
        const title = book?.bookName ?? "";

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


    const rows = currentBooks?.map((item) => ({
        id: item._id,
        book: item.bookName,
        author: item.AuthorName,
        publisher: item.publisherName,
        user: item.requestedby?.name,
        userId: item.requestedby?._id,
        requestedDate: item.requestDate,

    }));

    return (
        <Fragment>
            <MetaData title={"All BOOKS -- ADMIN"} />

            <div className="dashboard">
                <Sidebar />
                <div className="productListContainer">
                    <div className="content">
                        <div className="card">
                            <div className="card-body">
                                <h1 className="bookCreateHeading">Requested Books</h1>

                                <div className="form-group col-md-12 col-12">
                                    <div className="input-group">
                                        <div className="input-group-preppend">
                                            <div className="input-group-text">Search by Name, Title</div>
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
                                                <th>Book Title</th>
                                                <th>Book Author</th>
                                                <th>Book Publisher</th>
                                                <th>Requested By</th>
                                                <th>Requested Date</th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {rows &&
                                                rows.map((row) => (
                                                    <tr key={row.id}>
                                                        <td>{row.book}</td>
                                                        <td>{row.author}</td>
                                                        <td>{row.publisher}</td>
                                                        <td><strong>Name: </strong>{row.user} <br />
                                                            <strong>ID: </strong>{row.userId}</td>
                                                        <td>{row.requestedDate && row.requestedDate.substring(0, 10)}</td>
                                                        <td>
                                                            <button
                                                                className="btn btn-danger"
                                                                onClick={() => deleteRequestedBookHandler(row.id)}
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

export default RequestedBooks;

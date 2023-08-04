import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    clearErrors,
    userFeedbacks,
    deleteFeedback
} from "../../actions/userAction";
import { useNavigate } from "react-router-dom";
import "./BookList.css";
import Swal from "sweetalert2";
import MetaData from "../layout/MetaData";
import { TablePagination } from "@mui/material";
import Sidebar from "./Sidebar";
import { DELETE_FEEDBACK_RESET } from "../../constants/userConstants";

const BorrowedBooksByUser = () => {
    const dispatch = useDispatch();
    const history = useNavigate();

    const { error, feedback } = useSelector((state) => state.userFeedbacks);
    const { error:deleteError, isDeleted,message } = useSelector((state) => state.deleteFeedback);
    const [currentPage, setCurrentPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);


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
            Swal.fire("isDeleted!", message, "success");
            history("/admin/feed-backs")
            dispatch({type: DELETE_FEEDBACK_RESET })
        }

        dispatch(userFeedbacks());
    }, [dispatch, error, history,deleteError,message,isDeleted]);

    const handleChangePage = (event, newPage) => {
        setCurrentPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setCurrentPage(0);
    };

    const handleDeleteFeedback =(id)=>{
       dispatch(deleteFeedback(id))
    }

    const indexOfLastBook = (currentPage + 1) * rowsPerPage;
    const indexOfFirstBook = currentPage * rowsPerPage;
    const feedbacks =feedback && feedback.slice(indexOfFirstBook, indexOfLastBook);

    const rows = feedbacks?.map((item) => ({
        id: item._id,
        email: item.email,
        name: item.name,
        feedback: item.feedback,
    }));

    return (
        <Fragment>
            <MetaData title={"Borrowed Books"} />
            <div className="dashboard">
                <Sidebar />
                <div className="productListContainer">
                    <div className="content">
                        <div className="card">
                            <div className="card-body">
                                <h1 className="bookCreateHeading">User Feedbacks</h1>

                                <div className="table-responsive myTable">
                                    <table className="table table-striped table-bordered">
                                        <thead>
                                            <tr>
                                                <th>FeedBacks</th>
                                                <th>Name</th>
                                                <th>Email</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {rows &&
                                                rows.map((row) => (
                                                    <tr key={row.id}>
                                                        <td>{row.feedback}</td>
                                                        <td>{row.name}</td>
                                                        <td>{row.email}</td>
                                                        <td>
                                                            <button
                                                                className="delete-button"
                                                            onClick={() => handleDeleteFeedback(row.id)}
                                                            >
                                                                Delete
                                                            </button>
                                                        </td>


                                                    </tr>
                                                ))}
                                        </tbody>
                                    </table>
                                </div>

                                <TablePagination
                                    component="div"
                                    count={feedback && feedback.length}
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

export default BorrowedBooksByUser;

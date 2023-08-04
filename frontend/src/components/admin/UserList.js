import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import './BookList.css';
import MetaData from '../layout/MetaData';
import Sidebar from './Sidebar';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Swal from "sweetalert2";
import { DELETE_USER_RESET } from '../../constants/userConstants';
import { TablePagination } from '@mui/material';
import { getAllUsers, deleteUser, clearErrors } from '../../actions/userAction';

const UserList = () => {
    const dispatch = useDispatch();
    const history = useNavigate();

    const { error, users } = useSelector((state) => state.allusers);
    const { error: deleteError, isDeleted, message } = useSelector((state) => state.profile);

    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const deleteUserHandler = (id) => {
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
                dispatch(deleteUser(id));
            }
        });
    };

    useEffect(() => {
        if (error) {
            Swal.fire("Error!", error, "error");
            dispatch(clearErrors());
        }
        if (deleteError) {
            Swal.fire("Error!", deleteError, "error");
            dispatch(clearErrors);
        }
        if (isDeleted) {
            Swal.fire("Deleted!", message, "success");
            history('/admin/users');
            dispatch({ type: DELETE_USER_RESET });
        }
        dispatch(getAllUsers());
    }, [dispatch, error, isDeleted, deleteError, history, message]);

    const handleChangePage = (event, newPage) => {
        setCurrentPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setCurrentPage(0);
    };

    const filteredBooks = users.filter((user) => {
        const name = user?.name ?? '';
        const role = user?.role ?? '';
        const email = user?.email ?? '';
        const userId = user?._id ?? '';

        if ((searchTerm)) {
            return (
                name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                role.toLowerCase().includes(searchTerm.toLowerCase()) ||
                email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                userId.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }
        else {
            return true
        }
    });


    const indexOfLastBook = (currentPage + 1) * rowsPerPage;
    const indexOfFirstBook = currentPage * rowsPerPage;
    const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(0);
    };

    const rows = currentBooks?.map((item) => {
        const reservedBooksList = item.reservedBooks?.map((books) => books.book).join(', ') || '';
        const borrowedBooksList = item.borrowedBooks?.map((books) => books.book).join(', ') || '';
        return {
            id: item._id,
            name: item.name,
            email: item.email,
            edition: item.edition,
            phoneNumber: item.phoneNumber,
            education: item.education,
            address: item.address,
            role: item.role,
            reservedbooks: reservedBooksList,
            borrowedBooks: borrowedBooksList,
            issuedbooks: item.issuebooks
        };
    });

    return (
        <Fragment>
            <MetaData title={'All USERS -- ADMIN'} />

            <div className="dashboard">
                <Sidebar />
                <div className="dashboardContainer">
                    <div className="productListContainer">
                        <div className="content">
                            <div className="card">
                                <div className="card-body">
                                    <h1 className="bookCreateHeading">ALL USERS</h1>


                                    <div className="form-group col-md-12 col-12">
                                        <div className="input-group">
                                            <div className="input-group-preppend">
                                                <div className="input-group-text">Search by Name, Email, Role, UserId</div>
                                            </div>
                                            <input
                                                className="form-control"
                                                type="text" placeholder="Search..." value={searchTerm} onChange={handleSearch}
                                            />
                                        </div>
                                    </div>

                                    <div className="table-responsive myTable">
                                        <table className="table table-striped table-bordered">
                                            <thead>
                                                <tr>
                                                    <th>User ID</th>
                                                    <th>Name</th>
                                                    <th>email</th>
                                                    <th>Phone Number</th>
                                                    <th>Education</th>
                                                    <th>Address</th>
                                                    <th>Role</th>
                                                    <th>Rreserved Books (BookId)</th>
                                                    <th>Issued Books</th>
                                                    <th>Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {rows &&
                                                    rows.map((row) => (
                                                        <tr key={row.id}>
                                                            <td>{row.id}</td>
                                                            <td>{row.name}</td>
                                                            <td>{row.email}</td>
                                                            <td>{row.phoneNumber}</td>
                                                            <td>{row.education}</td>
                                                            <td>{row.address}</td>
                                                            <td className={row.role === "admin" ? "greenColor" : "redColor"}>{row.role}</td>
                                                            <td>{row.reservedbooks}</td>
                                                            <td>{row.borrowedBooks}</td>
                                                            <td>
                                                                <div className='del-btn'>
                                                                <Link  to={`/admin/user/${row.id}`}>
                                                                   <button className='btn greenColor' > <EditIcon /></button>
                                                                </Link>
                                                                <button className='btn redColor' onClick={() => deleteUserHandler(row.id)}>
                                                                    <DeleteIcon />
                                                                </button>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    ))}
                                            </tbody>
                                        </table>
                                    </div>

                                    <TablePagination
                                        component="div"
                                        count={filteredBooks.length}
                                        page={currentPage}
                                        onPageChange={handleChangePage}
                                        rowsPerPage={rowsPerPage}
                                        onRowsPerPageChange={handleChangeRowsPerPage}
                                        colSpan={3}
                                        SelectProps={{
                                            inputProps: {
                                                'aria-label': 'rows per page',
                                            },
                                            native: true,
                                        }}

                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};


export default UserList
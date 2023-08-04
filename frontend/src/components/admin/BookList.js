import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, getAdminBook, deleteBook } from '../../actions/bookAction';
import { Link, useNavigate } from 'react-router-dom';
import './BookList.css';
import MetaData from '../layout/MetaData';
import Sidebar from './Sidebar';
import EditIcon from '@mui/icons-material/Edit';
import Swal from "sweetalert2";
import DeleteIcon from '@mui/icons-material/Delete';
import { DELETE_BOOK_RESET } from '../../constants/bookConstant';
import { TablePagination } from '@mui/material';

const BookList = () => {
  const dispatch = useDispatch();
  const history = useNavigate();

  const { error, books } = useSelector((state) => state.books);
  const { error: deleteError, isDeleted, message } = useSelector((state) => state.book);

  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const deleteBookHandler = (id) => {
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
        dispatch(deleteBook(id));
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
      Swal.fire("Deleted!", message, "success");
      history('/admin/books');
      dispatch({ type: DELETE_BOOK_RESET });
    }
    dispatch(getAdminBook());
  }, [dispatch, error, isDeleted, deleteError, message, history]);

  const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setCurrentPage(0);
  };

  const filteredBooks = books.filter((book) => {
    const title = book?.title ?? '';
    const bookId = book?._id ?? '';
    const author = book?.author ?? '';
    const publisher = book?.publisher ?? '';
    const ISBN = book?.ISBN ?? '';

    if (!isNaN(searchTerm)) {
      return (
        (typeof ISBN === 'number' && String(ISBN).toLowerCase().includes(searchTerm.toLowerCase()))
      );
    } else {
      return (
        title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        author.toLowerCase().includes(searchTerm.toLowerCase()) ||
        publisher.toLowerCase().includes(searchTerm.toLowerCase()) ||
        bookId.toLowerCase().includes(searchTerm.toLowerCase())

      )
    }
  });

  const indexOfLastBook = (currentPage + 1) * rowsPerPage;
  const indexOfFirstBook = currentPage * rowsPerPage;
  const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(0);
  };

  const rows = currentBooks?.map((item) => ({
    id: item._id,
    title: item.title,
    quantity: item.quantity,
    edition: item.edition,
    publisher: item.publisher,
    author: item.author,
    catagory: item.catagory,
    shelfNumber: item.shelfNumber,
    cabnotNumber: item.cabnotNumber,
    ISBN: item.ISBN,
  }));

  return (
    <Fragment>
      <MetaData title={'All BOOKS -- ADMIN'} />

      <div className="dashboard">
        <Sidebar />
        <div className="productListContainer">
          <div className="content">
            <div className="card">
              <div className="card-body">
                <h1 className="bookCreateHeading">ALL BOOKS</h1>

                <div className="content">

                  <div className="form-group col-md-12 col-12">
                    <div className="input-group">
                      <div className="input-group-preppend">
                        <div className="input-group-text">Search by Name, Title, Author, Publisher</div>
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
                          <th >Book ID</th>
                          <th >ISBN</th>
                          <th >Title</th>
                          <th >Author</th>
                          <th >Publisher</th>
                          <th >Edition</th>
                          <th >Quantity</th>
                          <th >Classification</th>
                          <th >Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {rows &&
                          rows.map((row) => (
                            <tr key={row.id}>
                              <td>{row.id}</td>
                              <td>{row.ISBN}</td>
                              <td>{row.title}</td>
                              <td>{row.author}</td>
                              <td>{row.publisher}</td>
                              <td>{row.edition}</td>
                              <td>{row.quantity}</td>
                              <td >
                                <div className='w-130'>
                                <strong>Shelf No. : {row.shelfNumber}</strong> <br />
                                <strong>Cabnot No. : {row.cabnotNumber}</strong>
                                </div>
                              </td>
                              <td >
                                <div className='del-btn'>
                                <Link  to={`/admin/book/${row.id}`}>
                                  <button className='btn greenColor' ><EditIcon /></button>
                                </Link>
                                <button className="btn redColor" onClick={() => deleteBookHandler(row.id)}>
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

export default BookList;

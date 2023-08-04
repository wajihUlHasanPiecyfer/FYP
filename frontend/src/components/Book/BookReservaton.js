
import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, reserveBook } from '../../actions/bookAction';
import Swal from "sweetalert2";
import { BOOK_RESERVE_RESET } from '../../constants/bookConstant';

const ReserveBook = ({ bookId }) => {
  const dispatch = useDispatch();
  const { loading, isReserved, message, error } = useSelector((state) => state.bookreserve);

  useEffect(() => {
    if (error) {
      Swal.fire("Error!", error, "error");
      dispatch(clearErrors)
    }
    if (isReserved) {
      Swal.fire("Reserved!", message, "success");
      dispatch({type: BOOK_RESERVE_RESET})
    }
  }, [dispatch, error, message, isReserved]);

  const handleReserveClick = (e) => {
    e.preventDefault();
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, reserve it!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(reserveBook(bookId));
      }
    });
  };

  return (
    <Fragment>

        <button className='btn btn-dark' onClick={handleReserveClick} disabled={loading}>
          {loading ? 'Reserving...' : 'Reserve Book'}
        </button>

    </Fragment>
  );
};

export default ReserveBook;

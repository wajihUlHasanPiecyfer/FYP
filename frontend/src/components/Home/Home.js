import React, { Fragment, useEffect } from 'react';
import "./Home.css"
import BookCard from './BookCard';
import MetaData from '../layout/MetaData';
import { clearErrors, getBook } from "../../actions/bookAction"
import { useSelector, useDispatch } from "react-redux"
import { Loader } from '../layout/Loader/Loader';
import Swal from "sweetalert2";
import SearchIcon from '@mui/icons-material/Search';


const Home = () => {

  const dispatch = useDispatch()
  const { loading, error, books, } = useSelector(
    (state) => state.books
  )
  useEffect(() => {

    if (error) {
      Swal.fire("Error!", error, "error");
            dispatch(clearErrors)
    }

    dispatch(getBook())

  }, [dispatch, error,])


  return (
    <Fragment>
      {loading ? <Loader /> :
        <Fragment>

          <MetaData title="SCHOLAR'S LIBRARY" />
          <section className="head-over">
          <div className='banner'>
            <p>Welcome To Library</p>
            <h1>Find The Amazing Books</h1>
            <a href='/Search'>
              <button>
                <SearchIcon /> Search Books
              </button>
            </a>
          </div>
          <h1 className='books-avb'>Recent Uploaded Books</h1>
          <div className='main'>

            <div className='right'>

              <div className='container' >
                {books && books.map(book => (

                  <BookCard key={book._id} book={book} />
                ))}
              </div>
            </div>
          </div>
          </section >
        </Fragment>

      }

    </Fragment>
  )

};

export default Home;




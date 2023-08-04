import React, { Fragment, useEffect } from 'react'
import "./BookDetails.css"
import { useDispatch, useSelector } from "react-redux"
import { clearErrors, getBookDetails } from '../../actions/bookAction'
import { Link, useParams } from 'react-router-dom'
import { Loader } from '../layout/Loader/Loader'
import Reservebook from "./BookReservaton"
import Swal from "sweetalert2";
import FeedbackForm from "./Feedback";
import EBook from "./E-Book.js"
import MetaData from "../layout/MetaData"


const BookDetails = () => {

    const dispatch = useDispatch()
    const { id } = useParams()
    const { isAuthenticated } = useSelector((state) => state.user)
    const { book, loading, error } = useSelector((state) => state.bookDetails)

    useEffect(() => {
        if (error) {
            Swal.fire("Error!", error, "error");
            dispatch(clearErrors())
        }
        dispatch(getBookDetails(id))

    }, [dispatch, id, error])


    return (
        <Fragment>
            {loading ? <Loader /> : <Fragment>
                <MetaData title={`${book.title} -- LIBRARY`} />

                <div className='BookDetails main'>
                    <div className='left'>
                        {book.images &&
                            book.images.map((item, i) =>
                                <img className='CarouselImage'
                                    key={item.url}
                                    src={item.url}
                                    alt={`${i} Slide`}
                                />
                            )
                        }

                    </div>

                    <div className='right1'>
                        <div className='title'>
                            <h1>{book.title}</h1>
                            {/* <p>{book._id}</p> */}
                        </div>
                        <div className='details-div'>
                            <div className="form-row">
                                <div className="mt-2 col-md-6 col-12">
                                    <strong>Author- </strong>
                                    <Link className="btn-link" to={`/books/${book.author}`}>
                                        <span>{book.author}</span>
                                    </Link>
                                </div>
                                <div className="mt-2 col-md-6 col-12">
                                    <strong>Publisher- </strong>
                                    <Link className="btn-link" to={`/books/${book.publisher}`}>{book.publisher}</Link>
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="mt-2 col-md-6 col-12">
                                    <strong>Category- </strong>
                                    <Link className="btn-link" to={`/books/${book.catagory}`}>
                                        <span>{book.catagory}</span>
                                    </Link>
                                </div>
                                <div className="mt-2 col-md-6 col-12">
                                    <strong>ISBN- </strong>
                                    <span>{book.ISBN}</span>
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="mt-2 col-md-6 col-12">
                                    <strong>Edition- </strong>
                                    <span>{book.edition}</span>
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="mt-2 col-md-6 col-12">
                                    <strong>Book Status- </strong>
                                    <b className={book.quantity < 1 ? 'redColor' : 'greenColor'}>
                                        {book.quantity < 1 ? 'Out of Stock' : `${book.quantity} qantity available`}
                                    </b>
                                </div>
                                {isAuthenticated ? (
                                    <div className="mt-2 col-md-6 col-12">
                                        < Reservebook bookId={id} />
                                    </div>
                                ) : null}

                            </div>
                            <div className="form-row">
                                <div className="mt-2 col-md-6 col-12">
                                    <strong>Shelf Number- </strong>
                                    <span>{book.shelfNumber}</span>
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="mt-2 col-md-6 col-12">
                                    <strong>Cabnot Number- </strong>
                                    <span>{book.cabnotNumber}</span>
                                </div>
                            </div>

                            <div className="mt-2  col-12">
                                <strong>Description:  </strong>
                                <p style={{ textAlign: "justify", backgroundColor: "#f0f0f0", padding: "10px", borderRadius: "15px" }}>{book.description}</p>
                            </div>

                            <div className="form-row">
                                <div className="mt-2 col-md-6 col-12">
                                    <EBook isbn={book.ISBN} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <FeedbackForm />
                </div>
            </Fragment>
            }
        </Fragment>
    )
}

export default BookDetails
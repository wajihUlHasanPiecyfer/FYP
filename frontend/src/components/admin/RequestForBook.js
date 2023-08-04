import React, { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./newBook.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, createRequestedBook } from "../../actions/bookAction";
import Swal from "sweetalert2";
import MetaData from "../layout/MetaData";
import Sidebar from "./Sidebar.js";
import { NEW_REQUEST_BOOK_RESET } from "../../constants/bookConstant";

const NewBook = () => {
  const dispatch = useDispatch();
  const history = useNavigate();

  const { loading, error, success, message } = useSelector((state) => state.newRequestBook);

  const [title, setTitle] = useState("");
  const [edition, setEdition] = useState("");
  const [publisher, setPublisher] = useState("");
  const [author, setAuthor] = useState("");

  useEffect(() => {
    if (error) {
      Swal.fire("Error!", error, "error");
      dispatch(clearErrors);
    }

    if (success) {
      Swal.fire("Success!", message, "success");
      history("/dashboard");
      dispatch({ type: NEW_REQUEST_BOOK_RESET });
    }
  }, [dispatch, error, history, success, message]);

  const createProductSubmitHandler = (e) => {
    e.preventDefault();
    const myForm = new FormData();

    myForm.set("title", title);
    myForm.set("edition", edition);
    myForm.set("author", author);
    myForm.set("publisher", publisher);


    dispatch(createRequestedBook(myForm));
  };



  return (
    <Fragment>
      <MetaData tiltle="Request For Book" />
      <div className="dashboard">
        <Sidebar />

        <div className="newProductContainer">
          <div className="content">
            <div className="card">
              <div className="card-body">
                <form
                  className="createProductForm"
                  encType="multipart/form-data"
                  onSubmit={createProductSubmitHandler}
                >
                  <h1 className="bookCreateHeading">Request For Books</h1>

                  <div className="bookCreateMain">


                    <div className="col-md-12 col-12 mb-10 bookCreateRight">
                      <div className="row no-gutters">


                        <div className="form-group col-md-6 col-12">
                          <div className="input-group">
                            <div className="input-group-preppend">
                              <div className="input-group-text ">Book Title</div>
                            </div>
                            <input
                              className="form-control"
                              type="text"
                              required
                              value={title}
                              onChange={(e) => setTitle(e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="form-group col-md-6 col-12">
                          <div className="input-group">
                            <div className="input-group-preppend">
                              <div className="input-group-text ">Author</div>
                            </div>
                            <input
                              className="form-control"
                              type="text"
                              required
                              value={author}
                              onChange={(e) => setAuthor(e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="form-group col-md-6 col-12">
                          <div className="input-group">
                            <div className="input-group-preppend">
                              <div className="input-group-text ">Publisher</div>
                            </div>
                            <input
                              className="form-control"
                              type="text"
                              required
                              value={publisher}
                              onChange={(e) => setPublisher(e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="form-group col-md-6 col-12">
                          <div className="input-group">
                            <div className="input-group-prepend">
                              <div className="input-group-text ">Edition</div>
                            </div>
                            <input
                              className="form-control"
                              type="number"
                              required
                              value={edition}
                              onChange={(e) => setEdition(e.target.value)}
                            />
                          </div>
                        </div>


                        <div>
                          <button
                            className="btn btn-primary createBookBtn"
                            type="submit"
                            disabled={loading ? true : false}
                          >
                            Request
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default NewBook;

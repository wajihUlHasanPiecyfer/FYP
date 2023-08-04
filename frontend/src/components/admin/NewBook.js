import React, { Fragment, useEffect, useState } from "react";
import {  useNavigate } from "react-router-dom";
import "./newBook.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, createBook } from "../../actions/bookAction";
import MetaData from "../layout/MetaData";
import Swal from "sweetalert2";
import Sidebar from "./Sidebar.js";
import { NEW_BOOK_RESET } from "../../constants/bookConstant";

const NewBook = () => {
  const dispatch = useDispatch();
  const history = useNavigate();

  const { loading, error, success } = useSelector((state) => state.newBook);

  const [title, setTitle] = useState("");
  const [edition, setEdition] = useState("");
  const [description, setDescription] = useState("");
  const [catagory, setCatagory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [ISBN, setISBN] = useState("");
  const [publisher, setPublisher] = useState("");
  const [author, setAuthor] = useState("");
  const [shelfNumber, setShelfNumber] = useState("");
  const [cabnotNumber, setCabnotNumber] = useState("");
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  const catagories = [
    "Technology",
    "Computer Science",
    "Science",
    "Religion",
    "Business",
    "Literature",
    "Management",
    "Electronics",
    "Physics",
    "Chemistry",
    "Mathematics",
    "Fiction",
    "Romance",
    "Philosophy",
    "Language",
    "Arts",
  ];

  useEffect(() => {
    if (error) {
      Swal.fire("Error!",error, "error");
      dispatch(clearErrors);
    }

    if (success) {
      Swal.fire("Created!","Book Created Succcessfully", "success");
            history("/admin/books");
      dispatch({ type: NEW_BOOK_RESET });
    }
  }, [dispatch, error, history, success]);

  const createProductSubmitHandler = (e) => {
    e.preventDefault();
    const myForm = new FormData();

    myForm.set("title", title);
    myForm.set("description", description);
    myForm.set("catagory", catagory);
    myForm.set("edition", edition);
    myForm.set("quantity", quantity);
    myForm.set("ISBN", ISBN);
    myForm.set("author", author);
    myForm.set("publisher", publisher);
    myForm.set("ISBN", ISBN);
    myForm.set("cabnotNumber", cabnotNumber);
    myForm.set("shelfNumber", shelfNumber);

    images.forEach((image) => {
      myForm.append("images", images);
    });
    dispatch(createBook(myForm));
  };

  const createProductImagesChange = (e) => {
    const file = e.target.files[0];

    setImages([]);
    setImagesPreview([]);

    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setImagesPreview([reader.result]);
        setImages([reader.result]);
      }
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  return (
    <Fragment>
      <MetaData tiltle="Create Book" />
      <div className="dashboard">
        <Sidebar />

        <div className="newProductContainer">
          <form
            className="createProductForm"
            encType="multipart/form-data"
            onSubmit={createProductSubmitHandler}
          >
            <h1 className="bookCreateHeading">Create BOOK</h1>

            <div className="bookCreateMain">
              <div className="col-md-3 col-12 mb-10 bookCreateLeft">
                <div className="image_holder pb-3">
                  {imagesPreview.length > 0 ? (
                    <img
                      src={imagesPreview[0]}
                      className="img-thumbnail"
                      alt="Book Preview"
                    />
                  ) : (
                    <img
                      src="https://via.placeholder.com/250X300"
                      className="img-thumbnail"
                      alt="Book Preview"
                    />
                  )}
                </div>
                <div className="border border-light mb-2">
                  <span>Upload Cover Image <br/>
                    Max. size (1mb)</span>
                </div>

                <div className="createBookFormFile form-control text-xs">
                  <input
                    type="file"
                    name="avatar"
                    accept="image/*"
                    onChange={createProductImagesChange}
                  />
                </div>
              </div>

              <div className="col-md-9 col-12 mb-10 bookCreateRight">
                <div className="row no-gutters">
                  
                  <div className="form-group col-md-6 col-12">
                    <div className="input-group">
                      <div className="input-group-preppend">
                        <div className="input-group-text ">ISBN</div>
                      </div>
                      <input
                        className="form-control"
                        type="text"
                        required
                        value={ISBN}
                        onChange={(e) => setISBN(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="form-group col-md-6 col-12">
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <div className="input-group-text">Category</div>
                      </div>
                      <select
                        className="form-control"
                        onChange={(e) => setCatagory(e.target.value)}
                      >
                        <option value="">Select</option>
                        {catagories.map((cate) => (
                          <option key={cate} value={cate}>
                            {cate}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="form-group col-md-12 col-12">
                    <div className="input-group">
                      <div className="input-group-preppend">
                        <div className="input-group-text">Book Title</div>
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
                  <div className="form-group col-md-12 col-12">
                    <div className="input-group">
                      <div className="input-group-preppend">
                        <div className="input-group-text">Author</div>
                      </div>
                      <input
                        className="form-control"
                        type="text"
                        required
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                      />
                    </div>
                  </div>{" "}
                  <div className="form-group col-md-12 col-12">
                    <div className="input-group">
                      <div className="input-group-preppend">
                        <div className="input-group-text">Publisher</div>
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
                      <div className="input-group-preppend">
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
                  <div className="form-group col-md-6 col-12">
                    <div className="input-group">
                      <div className="input-group-preppend">
                        <div className="input-group-text ">Quantity</div>
                      </div>
                      <input
                        className="form-control"
                        type="number"
                        required
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="form-group col-md-6 col-12">
                    <div className="input-group">
                      <div className="input-group-preppend">
                        <div className="input-group-text ">Shelf Number</div>
                      </div>
                      <input
                        className="form-control"
                        type="number"
                        required
                        value={shelfNumber}
                        onChange={(e) => setShelfNumber(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="form-group col-md-6 col-12">
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <div className="input-group-text ">Cabnot Number</div>
                      </div>
                      <input
                        className="form-control"
                        type="number"
                        required
                        value={cabnotNumber}
                        onChange={(e) => setCabnotNumber(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="form-group col-md-12">
                    <div className="input-group">
                      {/* <div className="input-group-prepend">
                        <div className="input-group-text ">Description of Book</div>
                      </div> */}

                      <textarea
                        style={{ height: 170, display: "" }}
                        className="form-control summernote_small"
                        placeholder="Book Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        cols="30"
                        rows="1"
                      ></textarea>
                    </div>
                  </div>
      

                      <div>
                    <button
                      className="btn btn-primary createBookBtn"
                      type="submit"
                      disabled={loading ? true : false}
                      >
                      Create
                    </button>
                        </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default NewBook;

import React, { Fragment, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./newBook.css";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  updateBook,
  getBookDetails,
} from "../../actions/bookAction";
import MetaData from "../layout/MetaData";
import Sidebar from "./Sidebar.js";
import Swal from "sweetalert2";
import { UPDATE_BOOK_RESET } from "../../constants/bookConstant";

const UpdateBook = () => {
  const dispatch = useDispatch();
  const history = useNavigate();

  const { error, book } = useSelector((state) => state.bookDetails);

  const {
    loading,
    error: updateError,
    isUpdated,
    message
  } = useSelector((state) => state.book);

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
  const [oldimages, setOldImages] = useState([]);
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

  const { id } = useParams();
  const bookId = id;

  useEffect(() => {
    if (book && book._id !== bookId) {
      dispatch(getBookDetails(bookId));
    } else {
      setTitle(book.title);
      setCatagory(book.catagory);
      setDescription(book.description);
      setEdition(book.edition);
      setQuantity(book.quantity);
      setISBN(book.ISBN);
      setAuthor(book.author);
      setPublisher(book.publisher);
      setShelfNumber(book.shelfNumber);
      setCabnotNumber(book.cabnotNumber);
      setOldImages(book.images);
    }

    if (error) {
      Swal.fire("Error!",error, "error");
      dispatch(clearErrors);
    }
    if (updateError) {
      Swal.fire("Error!",updateError, "error");
      dispatch(clearErrors);
    }

    if (isUpdated) {
      Swal.fire("Updated!",message, "success");
      history("/admin/books");
      dispatch({ type: UPDATE_BOOK_RESET });
    }
  }, [dispatch, error, history, isUpdated, book, bookId,message, updateError]);

  const updateBookSubmitHandler = (e) => {
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
    myForm.set("cabnotNumber", cabnotNumber);
    myForm.set("shelfNumber", shelfNumber);

    images.forEach((image) => {
      myForm.append("images", images);
    });
    Swal.fire({
      title: 'Do you want to save the changes?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Save',
      denyButtonText: `Don't save`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        dispatch(updateBook(bookId, myForm));
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info')
      }
    })

  };

  const updateBookImagesChange = (e) => {
    const file = e.target.files[0];

    setImages([]);
    setImagesPreview([]);
    setOldImages([]);

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
      <MetaData tiltle="Update Book" />
      <div className="dashboard">
        <Sidebar />

        <div className="newProductContainer">
          <form
            className="createProductForm"
            encType="multipart/form-data"
            onSubmit={updateBookSubmitHandler}
          >
            <h1 className="bookCreateHeading">Update Book</h1>

            <div className="bookCreateMain">
              <div className="col-md-3 col-12 mb-10 bookCreateLeft">
                <div className="image_holder pb-3">
                  {oldimages && oldimages.length > 0 ? (
                    oldimages.map((image) => (
                      <img
                        key={image.url}
                        src={image.url}
                        alt="Old Book Preview"
                        className="img-thumbnail"
                      />
                    ))
                  ) : imagesPreview.length > 0 ? (
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
                    Max. size (1mb)
                  </span>
                </div>

                <div className="createBookFormFile form-control text-xs">
                  <input
                    type="file"
                    name="avatar"
                    accept="image/*"
                    onChange={updateBookImagesChange}
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
                        value={catagory}
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
                      Update
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

export default UpdateBook;

import React from "react";
import { Link } from "react-router-dom";

const Book = ({ book }) => {
    return (
        <Link className="bookCard" to={`/book/${book._id}`}>
            <img src={book.images[0].url } alt={book.title} />
        </Link>
    )
};

export default Book;

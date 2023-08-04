import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import LaunchIcon from '@mui/icons-material/Launch';
import Swal from "sweetalert2";

const EBooks = ({isbn}) => {
    const [ebookLink, setEbookLink] = useState(null);

    const handleISBNClick = async () => {
        try {
            const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`);
            const data = await response.json();

            if (data && data.items && data.items.length > 0) {
                const ebookInfo = data.items[0];
                if (ebookInfo.volumeInfo.previewLink) {
                    setEbookLink(ebookInfo.volumeInfo.previewLink);
                }
            } else {
                setEbookLink(null);
                Swal.fire("Info!", 'Ebook not found on Google Books.', "error")
            }
        } catch (error) {
            Swal.fire("Error!", 'An error occurred while fetching ebook details.', "error")
            setEbookLink(null);
        }
    };

    return (
        <div>
            {!ebookLink && (<button className="link-btn btn btn-outline-dark " onClick={() => handleISBNClick('9780072228854')}>Read eBook</button>)}
            {ebookLink && (
                <Link className='link-btn' to={ebookLink} target="_blank" rel="noopener noreferrer">
                    <botton className="btn btn-outline-dark">
                        Open eBook in new tab <LaunchIcon />
                    </botton>
                </Link>
            )}
        </div>
    );
};

export default EBooks;

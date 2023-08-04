import React, { Fragment, useState } from 'react'
import {useNavigate} from 'react-router-dom'
import "./Search.css"
import MetaData from '../layout/MetaData'


const Search = () => {
    const [ keyword, setkeyword ] = useState("")
    const history = useNavigate()

    const searchSubmitHandler = (e) => {
        e.preventDefault();
        if (keyword.trim()) {
          history(`/books/${keyword}`);
        } else {
          history("/books");
        }
       
      }
    return (
        <Fragment>
          <MetaData title="SEARCH A BOOK -- SCHOLAR'S LIBRARY" />

            <form className='searchBox' onSubmit={searchSubmitHandler}>
                <input type='text' placeholder='search...' onChange={(e) => setkeyword(e.target.value)} />
                <input type='submit' value="Search" />
            </form>
        </Fragment>
    )
}

export default Search
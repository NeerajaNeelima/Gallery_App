import React, { useState } from 'react';
import { searchImages } from '../../api';
import {getImages} from '../../api'
const Search = ({next,image,set}) => {
    const [search,setSearch]=useState()
    const handleOnSubmit = async (event) =>{
        event.preventDefault();
        const responsedata=await searchImages(search,next)
        image(responsedata.resources)
        set(responsedata.next_cursor)
    }
    const handleReset = async(event) =>{
        event.preventDefault();
        const responsedataimages=await getImages();
        image(responsedataimages.resources)
        set(responsedataimages.next_cursor) 
        setSearch('') 
    }
  return (
    <>
      <nav className="navbar bg-body-tertiary">
        <div className="container-fluid">
          <form className="d-flex" role="search" onSubmit={handleOnSubmit} onReset={handleReset}>
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
              onChange={(e)=>setSearch(e.target.value)}
            />
            <button className="btn btn-outline-success me-2" type="submit">
              Search
            </button>
            <button className="btn btn-outline-success" type="reset">
              Back
            </button>
          </form>
        </div>
      </nav>
    </>
  );
};

export default Search
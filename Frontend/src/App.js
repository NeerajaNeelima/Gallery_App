import React, { useEffect, useState } from 'react';
import './App.css';
import { ImageList,ImageListItem } from '@mui/material';
import Search from './Components/Search/Search.jsx'
import {getImages} from './api'

import CloseIcon from '@mui/icons-material/Close';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';


function App() {
  const[imagelist,setImageslist]=useState([])
  const[more,setMore]=useState(null)
  const[fullImage,setFullImage]=useState(false)
  const[imageIndex,setImageIndex]=useState(null)
  useEffect(()=>{
   const fetchData = async ()=>{
    const responsedataimages=await getImages();
    setImageslist(responsedataimages.resources)
    setMore(responsedataimages.next_cursor)
   }  
   fetchData(); 
  },[])

  const handleClickButton = async()=>{
    const responsedataimages=await getImages(more);
    setImageslist((currentImageList)=>[
      ...currentImageList,
      ...responsedataimages.resources
    ])
    setMore(responsedataimages.next_cursor)
  }

  const handleOpenImage=(index)=>{
    setFullImage(true)
    setImageIndex(index)
  }

  const handleClose =()=>{
    setFullImage(false);
  }

  const handlePrev =()=>{
    imageIndex === 0
    ? setImageIndex(imagelist.length - 1)
    :setImageIndex(imageIndex - 1)
  }

  const handleNext=()=>{
    imageIndex + 1 === imagelist.length
    ?setImageIndex(0)
    :setImageIndex(imageIndex + 1)
}
  return (
    <div className="App">
      <Search next={more}image={setImageslist}set={setMore}/>
      {fullImage && imageIndex !== null
      && 
        <div className='FullScreen'>
          <CloseIcon onClick={()=>{handleClose()}} className='Close circle'/>
          <ArrowBackIosIcon onClick={()=>{handlePrev()}} className='Prev circle'/>
          <ArrowForwardIosIcon onClick={()=>{handleNext()}} className='Next circle'/>
          <div className='Fullimage'>
              <img src={imagelist[imageIndex].url} alt=""/>
          </div>
        </div>}
        <div className='images'>
          <ImageList variant="masonry" cols={3} gap={8}>
            {imagelist.map((image,index) => (
              <ImageListItem key={image} onClick={()=>handleOpenImage(index)} className='image'>
                 <img
                    src={image.url}
                    alt={image.public_id}
                    loading="lazy"
                  />
                </ImageListItem>
    
            ))}
          </ImageList>
    </div>
    <div className='button'>
     {more &&<button onClick={handleClickButton} className="btn btn-outline-success center">More</button>}
      
    </div>
  </div>
    
  );
}

export default App;

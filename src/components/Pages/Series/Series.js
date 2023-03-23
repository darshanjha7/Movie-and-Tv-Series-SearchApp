import axios from 'axios'

import React from 'react'
import { useState,useEffect } from 'react';
import CustomPagination from '../../Pagination/Pagination';
import SingleContent from '../../SingleContent/SingleContent';
import Genre from '../../Genre';
import '../Trending/Trending.css'
import useGenres from '../../../hooks/useGenres';
const Series = () => {
  const [page, setpage] = useState(1);
  const [content, setcontent] = useState([]);
  const [numOfPages, setnumOfPages] = useState();
  const [selectedGenres, setselectedGenres] = useState([]);
  const [genres, setgenres] = useState([]);

  const genreForUrl=useGenres(selectedGenres)
  const fetchSeries=async()=>{

    
    const {data}=await axios.get(`https://api.themoviedb.org/3/discover/tv?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreForUrl}`)
   
    setcontent(data.results)
    setnumOfPages(data.total_pages)
  }
  useEffect(() => {
    window.scroll(0,0);
    fetchSeries();
  }, [page,genreForUrl]);
  return (
    <div>
      <span className='pageTitle'>Tv Series</span>
      <Genre 
            
            selectedGenres={selectedGenres}
            setgenres={setgenres}
            genres={genres}
            setselectedGenres={setselectedGenres}
            setpage={setpage}
            type="tv"
       />
      <div className='trending'>
        {content && content.map((el)=>{
          return (
            <SingleContent key={el.id} 
            id={el.id} 
            poster={el.poster_path} 
            title={el.title || el.name} 
            date={el.release_date } 
            media="tv" 
            vote={el.vote_average}/>
          )
        })}
      </div>
      {numOfPages>1 && ( <CustomPagination setPage={setpage} numOfPages={numOfPages}/>)}
     
    </div>
  )
}

export default Series
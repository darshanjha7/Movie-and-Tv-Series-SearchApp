import React,{useState,useEffect} from 'react'
import axios from "axios"
import SingleContent from '../../SingleContent/SingleContent';
import './Trending.css'
import "../../../App.css"
import CustomPagination from '../../Pagination/Pagination';
const Trending = () => {
  const [content, setcontent] = useState([]);
  const [page, setpage] = useState(1);
  const fetchTrending=async ()=>{
    const {data}=await axios.get(`https://api.themoviedb.org/3/trending/movie/week?api_key=${process.env.REACT_APP_API_KEY}&page=${page}`)
    
    setcontent(data.results)
  }
  
  useEffect(() => {
    
    fetchTrending();
  }, [page]);
  
  return (
    <div>
      <span className='pageTitle'>Trending Today</span>
      <div className='trending'>
        {content && content.map((el)=>{
          return (
            <SingleContent key={el.id} 
            id={el.id} 
            poster={el.poster_path} 
            title={el.title || el.name} 
            date={el.release_date } 
            media={el.media_type} 
            vote={el.vote_average}/>
          )
        })}
      </div>
      <CustomPagination setPage={setpage}/>
    </div>
  )
}

export default Trending
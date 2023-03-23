import React from 'react'
import { useState,useEffect } from 'react';
import {  TextField, ThemeProvider ,Button, createTheme} from '@mui/material';
import {Tabs,Tab} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';
import SingleContent from '../../SingleContent/SingleContent';
import CustomPagination from '../../Pagination/Pagination';
const Search = () => {
  const [type, settype] = useState(0);
  const [page, setpage] = useState(1);
  const [searchText, setsearchText] = useState("");
  const [content, setcontent] = useState([]);
  const [numOfPages, setnumOfPages] = useState();
  const fetchContent=async()=>{
    
    
    const {data}=await axios.get(`https://api.themoviedb.org/3/search/${type?"tv":"movie"}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&query=${searchText}&include_adult=false&include_video=false&page=${page}`)
   
    setcontent(data.results)
    setnumOfPages(data.total_pages)
  }
  useEffect(() => {
    window.scroll(0,0);
    fetchContent();
    
  }, [type,page]);
 
  const handleChange = (event, newValue) => {
    
    setpage(1)
    settype(newValue);
    
  };

  const darkTheme=createTheme({
    palette:{
      type:"dark",
      primary:{
        main:"#fff"
      }
    } 
  });
  return (
    <div>
      <ThemeProvider theme={darkTheme}>
        <div style={{display:"flex",margin:"15px 0"}}>
          <TextField 
            style={{flex:1}}
            className='searchBox'
            id="outlined-basic" 
            label="Search" 
            variant="filled" 
            
            onChange={(e)=>setsearchText(e.target.value)}
          />
          <Button variant='contained' style={{marginLeft:10}} onClick={fetchContent}>{<SearchIcon/>}</Button>

        </div>
        <Tabs value={type} onChange={handleChange} style={{paddingBottom:5}} indicatorColor="primary" textColor='primary'>
            <Tab style={{width:"50%"}} label="Search Movies"></Tab>
            <Tab style={{width:"50%"}} label="Search Series"></Tab>
         

        </Tabs>
       

      </ThemeProvider>
      <div className='trending'>
        {content && content.map((el)=>{
          return (
            <SingleContent key={el.id} 
            id={el.id} 
            poster={el.poster_path} 
            title={el.title || el.name} 
            date={el.release_date } 
            media={type?"tv":"movie"} 
            vote={el.vote_average}/>
          )
        })}
        {searchText && !content && (type ? <h2>No Series Found</h2>: <h2>No Movies Found</h2>)}
      </div>
      {numOfPages>1 && ( <CustomPagination setPage={setpage} numOfPages={numOfPages}/>)}
    </div>
  )
}

export default Search
import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { Chip } from '@mui/material'
import { Container } from '@mui/system'
const Genre = ({
  selectedGenres,
            setgenres,
            genres,
            setselectedGenres,
            setpage,
            type

}) => {

  const handleAdd = (genre) => {
    setselectedGenres([...selectedGenres,genre]);
    setgenres(genres.filter((gen)=>{
        return gen.id!=genre.id
    }))
    setpage(1);
  };

  const handleDelete = (genre) => {
    setselectedGenres(selectedGenres.filter((el)=>{
        return el.id!=genre.id;
    }))
    setgenres([...genres,genre])
    
    setpage(1);
  };

  const fetchGenre=async()=>{
    const {data}= await axios.get(`https://api.themoviedb.org/3/genre/${type}/list?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`)
    
    setgenres(data.genres)
  }
  useEffect(() => {
    fetchGenre();
    return ()=>{
      setgenres([])
    }
  }, []);
  return (
    <Container  style={{padding:"6px 0",display:"flex",flexWrap:"wrap"}}>
       { selectedGenres && selectedGenres.map((el)=>{
          return (
            <div key={el.name} >

              <Chip 
                key={el.name} 
                label={el.name} 
                style={{margin:2}} 
                clickable 
                size='small'
                color="primary"
                onDelete={()=>handleDelete(el)}
              
              />
            </div>
          )
        })}
        { genres && genres.map((el)=>{
          return (
            <div key={el.id} >

              <Chip 
                
                key={el.id} 
                label={el.name} 
                style={{margin:2,color:"white"}} 
                clickable 
                size='small'
                onClick={()=>handleAdd(el)}
        
              
              />
            </div>
          )
        })}
    </Container>
  )
}

export default Genre
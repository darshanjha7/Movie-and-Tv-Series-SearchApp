import React from 'react'
import { img_300 } from '../../config/config'
import { unavailable } from '../../config/config'
import './SingleContent.css'
import { Badge } from '@mui/material'
import CustomPagination from '../Pagination/Pagination'
import ContentModal from '../ContentModal/ContentModal'
const SingleContent = ({id,
    poster,
    title,
    date,
    media,
    vote}) => {
  return (
    <ContentModal media_type={media} id={id} >
        
        <Badge badgeContent={vote} color={vote>6 ? "primary" : "secondary"} />
            
       
        <img className='poster' src={poster ? `${img_300}/${poster}` : `${unavailable}`} alt={title} />
        <b className='title'>{title}</b>
        <span className='subTitle'>
            {media==="tv" ? "TV Series" : "Movie"}
           
            <span>{date}</span>
        </span>
       
    </ContentModal>
   
  )
}

export default SingleContent
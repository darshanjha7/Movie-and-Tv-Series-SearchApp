import React from 'react'
import { createTheme, Pagination,ThemeProvider } from '@mui/material'
import { blue } from '@mui/material/colors';

const theme = createTheme({
    status: {
      danger: blue,
    },
  });
const CustomPagination = ({setPage,numOfPages=10}) => {
    
    const handlePageChange=(page)=>{
        setPage(page);
        window.scroll(0,0)
    }
    return (
        <div style={{
            width:"100%",
            display:"flex",
            justifyContent:"center",
            marginTop:10
        }}>
            <ThemeProvider theme={theme}>
                <Pagination  
                    count={numOfPages} 
                    hideNextButton
                    hidePrevButton
                    color='primary'
                    onChange={(e)=> handlePageChange(e.target.textContent)} />   
            </ThemeProvider>
           
        </div>
  )
}

export default CustomPagination
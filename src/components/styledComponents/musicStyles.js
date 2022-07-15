import { Box } from "@mui/material";
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import styled from "styled-components";

export const HeroWrapper = styled.div`
    
    background-color: #111;

    .mask {
        background: rgba(0, 0, 0,0.6);
        padding: 2.5rem;
        
        h1 {
            color: #FFF;
            font-weight: lighter;
            font-size: 35px;
            margin: 0px;
            font-family: 'Raleway', sans-serif;
        }

        label {
            text-transform: uppercase;
            color: #C40667;
            font-size: 13px;
            font-weight: 500;
            letter-spacing: 2px;
            font-family: 'Raleway', sans-serif;
        }
    }
`

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: "#4e4c4c",
      borderColor: "#393838",
      fontWeight: 700
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 16,
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
      borderColor: "#393838",
    },
  }));
  
export const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
    '&:hover': {
      cursor: "pointer",
      background: "#3a3a3a24",
      '& > *': {
        background: "#3a3a3a24 !important",
      }
    }
  }));
  
export const TrackList = styled.div`
    height: 60vh;
    background: rgba(0, 0, 0,0.6);
    position: relative;
    

    .mask {
        background: rgba(0, 0, 0,0.6);
        padding: 2rem;

        h3 {
            color: #FFF;
            font-weight: lighter;
            font-size: 25px;
            margin: 0px;
            font-family: 'Raleway', sans-serif;

        }
    }
`

export const MusicPlayerWrapper = (props) => {
  return (
    <Box
      sx={{
        height: "70px",
        backgroundColor: "#0a0a0a",
        width: "100vw",
        position: "fixed",
        bottom: 0,
        zIndex: 100,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",

        ".player": {
          flex: 1,
          display: "flex",
          flexDirection: "row",
        },

        "h4": {
          color: "#FFF",
          margin: 0,
          fontFamily: "Raleway, sans-serif",
          fontSize: "1rem"
        },

        "span": {
          color: "#4e4c4c",
          margin: 0,
          fontFamily: "Raleway, sans-serif",
          fontSize: "0.9rem"
        }
      }}
      {...props}
    >
      {props.children}
    </Box>
  )
}
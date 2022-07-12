import styled from "styled-components";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Bloodtype } from "@mui/icons-material";

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
        }
    }
`

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
       color: theme.palette.common.white,
    //   color: "#d81b60",
      borderColor: "#393838",
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
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


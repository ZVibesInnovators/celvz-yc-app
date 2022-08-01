import { Box, Paper, Skeleton, Typography } from "@mui/material";
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { Col } from "reactstrap";
import styled from "styled-components";
import Enums from "../../constants/enums";
import { LargeHeroButton } from "../home/CallToActionButtons";

export const HeroWrapper = styled.div`
    
    background-color: #111;
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;

    .mask {
        background: rgba(0, 0, 0,0.8);
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

    @keyframes fadeIn {
      from {
        opacity: 0;
      }
      to {
       opacity: 1;
      }
    }

    @keyframes stretch {
      from {
        height: 300px;
      }
      to {
       height: 340px;
      }
    }

    @Keyframes elastic {
      from {
        height: 340px;
      }
      to {
       height: 300px;
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

export const GenreTile = (props) => {
  return (
    <Col
      md={5}
      style={{
        height: "calc(50vh/2.5)",
        padding: "0px",
        margin: "5px",
        borderRadius: "10px",
        display: "flex",
        backgroundColor: props.color,
        backgroundImage: `url(${props.bgImage || ""})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat"
      }}
      {...props}
    >
      {props.children}
    </Col>
  )
}

export const GenreShimmer = (props) => {
  return (
    <Skeleton
      variant="rectangular"
      sx={{
        width: "100%",
        height: "100%",
        background: props.color,
        borderRadius: "10px"
      }}
    />
  )
}

export const GenreTitle = (props) => {
  return (
    <Typography
      component={"h6"}
      sx={{
        color: "#FFF",
        textTransform: "uppercase",
        fontSize: "12px",
        letterSpacing: "2px",
        fontWeight: "600"
      }}
      {...props}
    >{props.children}</Typography>
  )
}

export const GenreTilebody = (props) => {
  return (
    <Box
      sx={{
        padding: "10px",
        borderRadius: "10px",
        flex: 1,
        backgroundColor: "rgb(0 0 0 / 56%)",

        "&:hover": {
          backdropFilter: "blur(4px)",
          cursor: "pointer",
        }
      }}
      {...props}
    >
      {props.children}
    </Box>
  )
}

export const AddPlayListDismissBtn = (props) => {
  return (
    <LargeHeroButton
      style={{
        width: "100%",
        borderRadius: 0,
        padding: "3px",
        fontSize: "18px"
      }}
      {...props}
    >
      {props.children}
    </LargeHeroButton>
  )
}

export const CreatePlayListBtn = (props) => {
  return (
    <LargeHeroButton
      style={{
        width: "80%",
        margin: "auto",
        borderRadius: 0,
        padding: "3px",
        fontSize: "18px",
        background: "#FFF",
        color: "#111 !important"
      }}
      {...props}
    >
      {props.children}
    </LargeHeroButton>
  )
}

export const PlaylistItemWrapper = (props) => {
  const Item = styled(Box)(({ theme }) => ({
    backgroundColor: 'transparent',
    ...theme.typography.body2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    display: "flex",
    flexDirection: "row",
    alignItems: "center"
  }));

  return (
    <Item>
      {props.children}
    </Item>
  )

}

export const PlaylistThumbnailWrapper = (props) => {
  return (
    <Box sx={{
      width: props.size || 40,
      height: props.size || 40,
      background: Enums.COLORS.grey_500,

      "&:hover": {
        cursor: "pointer",
      },

      "& :before": {
        content: "''",
        position: "relative",
        height: "6px",
        width: "calc(100% - 12px)",
        top: "-6px",
        left: "6px",
        background: "#111"
      }
    }}>
      {props.children}
    </Box>
  )
}

export const BoxShimmer = (props) => {

  return (
    <Skeleton 
      variant="rectangular" 
      width={240} 
      height={300}
      sx={{ bgcolor: 'grey.900' }}
      {...props}
    >{props.children}</Skeleton>
  )
}
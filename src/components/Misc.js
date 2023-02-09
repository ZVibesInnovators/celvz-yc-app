import { InputBase, styled, alpha } from "@mui/material";
import { ImSpinner9 } from 'react-icons/im';

export const Loader = ({containerStyle}) => {
    return (<div
        className='shadow'
        style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            height: "100%",
            position: "absolute",
            zIndex: "200",
            ...containerStyle
        }}>
        <div style={{
            backgroundColor: "#C40667",
            width: 80,
            height: 80,
            borderRadius: "50%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            transform: "rotate(100deg)"
        }}>
            <ImSpinner9 className='fa-spin' style={{ fontSize: 100, color: "#FFF", }} />
        </div>
    </div>)
}

export const BootstrapInput = styled(InputBase)(({ theme }) => ({
    'label + &': {
      marginTop: theme.spacing(3),
    },
    '& .MuiInputBase-input': {
      borderRadius: 4,
      position: 'relative',
      backgroundColor: theme.palette.mode ===  '#2b2b2b',
      color: "#d7d7d7",
      border: '1px solid #ced4da',
      fontSize: 16,
      width: '100%',
      padding: '10px 12px',
      transition: theme.transitions.create([
        'border-color',
        'background-color',
        'box-shadow',
      ]),
      // Use the system font instead of the default Roboto font.
      fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
      '&:focus': {
        boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
        borderColor: theme.palette.primary.main,
      },
    },
  }));
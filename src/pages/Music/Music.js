import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';
import React from 'react';
import FileUploader from "../../components/FileUploader";
import { EventDetailPageWrapper } from "../../components/styledComponents/events/EventStyles";
import RecommendedMusic from "./RecommendedMusic";

const AntTabs = styled(Tabs)({
    '& .MuiTabs-indicator': {
        backgroundColor: '#C40667',
        height: 4
    },
});

const AntTab = styled((props) => <Tab disableRipple {...props} />)(({ theme }) => ({
    textTransform: 'none',
    minWidth: 0,
    [theme.breakpoints.up('sm')]: {
        minWidth: 0,
    },
    fontWeight: theme.typography.fontWeightRegular,
    marginRight: theme.spacing(1),
    color: '#9e9e9e',
    textTransform: "uppercase",
    letterSpacing: "2px",
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
    '&:hover': {
        color: '#C40667',
        opacity: 1,
    },
    '&.Mui-selected': {
        color: '#FFF',
        fontWeight: theme.typography.fontWeightMedium,
    },
    '&.Mui-focusVisible': {
        backgroundColor: '#d1eaff',
    },
}));

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
            style={{ position: "relative" }}
        >
            {value === index && (
                <Box>
                    {children}
                </Box>
            )}
        </div>
    );
}

export default function Music() {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <EventDetailPageWrapper style={{ paddingTop: 80 }}>
            <Box sx={{ width: '100%' }}>
                <AntTabs
                    variant="scrollable"
                    scrollButtons="auto"
                 sx={{ borderBottom: "0.001em solid #353535" }} value={value} onChange={handleChange} aria-label="ant example" >
                    <AntTab label="Recommended" />
                    <AntTab label="Playlists" />
                </AntTabs>

                <TabPanel value={value} index={0} >
                    <RecommendedMusic />
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <Typography>Item Four</Typography>
                </TabPanel>
            </Box>
        </EventDetailPageWrapper>
    );
}
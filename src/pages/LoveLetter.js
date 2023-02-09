import { Box, Input, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { Col, Row } from "reactstrap";
import { EventDetailPageWrapper } from "../components/styledComponents/events/EventStyles";
import Enums from '../constants/enums';


const LoveLetter = () => {
    const [message, setMessage] = useState("");
    const [messages, setMessages] =useState([]);

    const handleSubmit = (event) => {
        event.preventDefault();
        setMessages([...messages, message]);
        setMessage("");
    };

    return (
        <EventDetailPageWrapper 
        style={{ paddingTop: 80, 
            height: "100vh", 
            display: "flex", 
            flexDirection: "column", 
            alignItems: "center",
        }}>
        <Box>
            <Typography sx={{ fontSize: "20px", color: Enums.COLORS.orange }}>LoveLetter</Typography>
        

            <form onSubmit={handleSubmit}>
                {/* <Input 
                defaultValue={message}
                onChange={(event) => setMessage(event.target.value)}
                /> */}
                
        <TextField
          id="filled-textarea"
          label="Multiline Placeholder"
          placeholder="Placeholder"
          multiline
          variant="filled"
        />
                <button type="submit">Submit Message</button>
            </form>

            <div>
                {messages.map((message, index) => (
                    <div key={index}>{message}</div>
                ))}
            </div>
        </Box>
        </EventDetailPageWrapper>
    );
};

export default LoveLetter;
import React from 'react';
import { Box, Breadcrumbs, Link, Typography } from "@mui/material";
import Enums from "../../constants/enums";
import { useNavigate } from "react-router";

const MusicManager = () => {
    const navigate = useNavigate();
    
    return (
        <Box>
            <Breadcrumbs aria-label="breadcrumb" sx={{ color: "#FFF" }}>
                <Link underline="none" color="inherit" onClick={() => navigate("/admin")} sx={{ ":hover": { color: Enums.COLORS.orange, cursor: "pointer" }}}>
                    Dashboard
                </Link>
                <Typography sx={{ color: Enums.COLORS.yellow }}>Music Manager</Typography>
            </Breadcrumbs>
        </Box>
    )
}

export default MusicManager;
import { Box, Breadcrumbs, Link, Typography } from "@mui/material";
import React from 'react';
import { useEffect } from "react";
import { useNavigate } from "react-router";
import Enums from "../../constants/enums";

const BackOffice = () => {
    const navigate = useNavigate();
    useEffect(() => {
        navigate("/admin/music-manager")
    }, [])
    return (
        <Box>
            <Breadcrumbs aria-label="breadcrumb" sx={{ color: Enums.COLORS.yellow, "& *:hover": { color: Enums.COLORS.yellow, cursor: "normal" } }}>
                <Link underline="none" color="inherit" onClick={() => navigate("/admin")}>
                    Dashboard
                </Link>
            </Breadcrumbs>
        </Box>
    )
}

export default BackOffice;
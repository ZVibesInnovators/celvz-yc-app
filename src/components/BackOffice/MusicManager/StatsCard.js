import { Button, Card, CardActions, CardContent, IconButton, styled, Typography } from "@mui/material";
import React from 'react';
import NumberFormat from "react-number-format";
import { Col } from "reactstrap";
import Enums from "../../../constants/enums";
import { GenreShimmer } from "../../styledComponents/musicStyles";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';

export const BootstrapTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} arrow classes={{ popper: className }} />
))(({ theme }) => ({
    [`& .${tooltipClasses.arrow}`]: {
        color: theme.palette.common.white,
    },
    [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: theme.palette.common.white,
        color: theme.palette.common.black
    },
}));


const StatsCard = ({ isLoading, count, label, addNew }) => {

    return (
        <Col md={"3"} className="mx-auto m-1">
            <Card sx={{ width: "100%", minHeight: "150px", background: Enums.COLORS.grey_500 }}>
                {isLoading ?
                    <GenreShimmer color={Enums.COLORS.grey_400} />
                    :
                    <>
                        <CardContent sx={{ p: 1 }}>
                            <NumberFormat
                                value={count || 0}
                                displayType={'text'}
                                thousandSeparator={true}
                                renderText={(value, props) => <Typography {...props} sx={{
                                    color: "#FFF",
                                    fontSize: 50,
                                    textAlign: "right",
                                    marginBottom: "0px"
                                }}>{value}</Typography>}
                            />
                            <Typography sx={{
                                color: "#FFF",
                                fontSize: 14,
                                textAlign: "right"
                            }}>{label}</Typography>
                        </CardContent>
                        <CardActions>
                            <BootstrapTooltip title="Add New">
                                <IconButton onClick={addNew} sx={{ color: "#FFF" }}><AddCircleIcon /></IconButton>
                            </BootstrapTooltip>
                        </CardActions>
                    </>
                }
            </Card>
        </Col>
    )
}

export default StatsCard;
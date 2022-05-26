import React from 'react';
import { Route, Routes } from "react-router";
import { eventRoutes } from "../../routes/eventRoutes";

const EventRouter = () => {

    return (
        <Routes>
            {eventRoutes.map((route, i) => {
                return <Route key={i} path={route.path} element={<route.component />} />
            })}
        </Routes>
    )
}

export default EventRouter;
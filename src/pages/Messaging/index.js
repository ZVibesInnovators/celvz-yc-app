import React from 'react';
import { Route, Routes } from "react-router";
import { messagingRoutes } from '../../routes/messagingRoutes';

const MessagingRouter = () => {

    return (
        <Routes>
            {messagingRoutes.map((route, i) => {
                return <Route key={i} path={route.path} element={<route.component />} />
            })}
        </Routes>
    )
}

export default MessagingRouter;
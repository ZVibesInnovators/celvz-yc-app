import React from 'react'
import { Route, Routes } from "react-router"
import { musicRoutes } from "../../routes/musicRoutes"

const MusicRouter = () => {

    return (
        <Routes>
            {musicRoutes.map((route, i) => {
                return <Route key={i} path={route.path} element={<route.component />} />
            })}
        </Routes>
    )
}

export default MusicRouter;
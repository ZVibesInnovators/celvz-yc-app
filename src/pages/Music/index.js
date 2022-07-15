import React, { useEffect } from 'react'
import { Route, Routes } from "react-router"
import { musicRoutes } from "../../routes/musicRoutes"

const MusicRouter = () => {
    useEffect(() => {
        const footer = document.getElementById("site-footer");
        // hide and show footer
        footer.style.display = "none"
        return () => {
        footer.style.display = "block"
        }
    }, [])
    return (
        <Routes>
            {musicRoutes.map((route, i) => {
                return <Route key={i} path={route.path} element={<route.component />} />
            })}
        </Routes>
    )
}

export default MusicRouter;
import Landing from "../pages/Landing";
import Dashboard from "../pages/Dashboard";
import Music from "../pages/Music";
// import Testimonies from "../pages/Testimonies";
import Sign from "../pages/auth/Sign";
import Register from "../pages/auth/Register";
import EventRouter from "../pages/Events";
import Live from "../pages/Live";
import About from "../pages/About";
import _ from "lodash";
import MusicRouter from "../pages/Music";
import BackOfficeRouter from "../pages/BackOffice";

export const routes = [
    {
        name: "home",
        path: "/",
        component: Landing
    },
    // {
    //     name: "testimonies",
    //     path: "/testimonies",
    //     component: Testimonies
    // },
    {
        name: "sign in",
        path: "/auth",
        component: Sign
    },
    {
        name: "about",
        path: "/about",
        component: About

    },
    {
        name: "register",
        path: "/auth/register",
        component: Register
    },
    {
        name: "events",
        path: "/events/*",
        component: EventRouter
    },
    {
        name: "music",
        path: "/music/*",
        component: MusicRouter
    },
    {
        name: "live",
        path: "/live",
        component: Live
    },
    {
        name: "dashboard",
        path: "/dashboard",
        component: Dashboard
    },
    {
        name: "admin",
        path: "/admin/*",
        component: BackOfficeRouter
    },
]

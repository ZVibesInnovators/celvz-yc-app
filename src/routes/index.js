import Landing from "../pages/Landing";
import Dashboard from "../pages/Dashboard";
import Music from "../pages/Music";
// import Testimonies from "../pages/Testimonies";
import Sign from "../pages/auth/Sign";
import Register from "../pages/auth/Register";
import EventRouter from "../pages/Events";
import Live from "../pages/Live";
import About from "../pages/About";
import MusicRouter from "../pages/Music";
import _ from "lodash";
import BackOfficeRouter from "../pages/BackOffice";
import MessagingRouter from "../pages/Messaging";

export const routes = [
    {
        name: "home",
        path: "/",
        component: Landing
    },
    {
        name: "music",
        path: "/music",
        component: MusicRouter
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
        name: "messaging",
        path: "/msg/*",
        component: MessagingRouter
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

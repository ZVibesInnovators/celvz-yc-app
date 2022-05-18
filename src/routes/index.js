import Landing from "../pages/Landing";
// import Music from "../pages/Music";
// import Testimonies from "../pages/Testimonies";
import Sign from "../pages/auth/Sign";
import Register from "../pages/auth/Register";
import EventRouter from "../pages/Events";
import Live from "../pages/Live";
import About from "../pages/About";

export const routes = [
    {
        name: "home",
        path: "/",
        component: Landing
    },
    // {
    //     name: "music",
    //     path: "/music",
    //     component: Music
    // },
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
        name: "register",
        path: "/auth/register",
        component: Register
    },
    {
        name: "about",
        path: "/about",
        component: About
    },
    {
        name: "events",
        path: "/events/*",
        component: EventRouter
    },
    {
        name: "live",
        path: "/live",
        component: Live
    },

]

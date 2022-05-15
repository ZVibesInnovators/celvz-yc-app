import Landing from "../pages/Landing";
import Music from "../pages/Music";
import Testimonies from "../pages/Testimonies";
import Sign from "../pages/auth/Sign";
import Register from "../pages/auth/Register";
import EventRouter from "../pages/Events";

export const routes = [
    {
        name: "home",
        path: "/",
        component: Landing
    },
    {
        name: "music",
        path: "/music",
        component: Music
    },
    {
        name: "testimonies",
        path: "/testimonies",
        component: Testimonies
    },
    {
        name: "sign in",
        path: "/auth",
        component: Sign
    },
    {
        name: "register",
        path: "/auth",
        component: Register
    },
    {
        name: "events",
        path: "/events/*",
        component: EventRouter
    }
]
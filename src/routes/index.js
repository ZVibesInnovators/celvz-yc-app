import Landing from "../pages/Landing";
import Music from "../pages/Music";
import Testimonies from "../pages/Testimonies";
import Sign from "../pages/auth/Sign";

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
]
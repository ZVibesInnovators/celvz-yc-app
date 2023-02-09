import Artist from "../pages/Music/Artist";
import Music from "../pages/Music/Music";
import MusicGenre from "../pages/Music/MusicGenre";

export const musicRoutes = [
    {
        name: "music",
        path: "/",
        component: Music
    },
    {
        name: "genre",
        path: "/genre/:id",
        component: MusicGenre
    },
    {
        name: "artists",
        path: "/artists/:id",
        component: Artist
    },
]
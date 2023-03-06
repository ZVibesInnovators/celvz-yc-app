
import DashboardIcon from '@mui/icons-material/Dashboard';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import LiveTvIcon from '@mui/icons-material/LiveTv';
import MessageIcon from '@mui/icons-material/Message';
import EventIcon from '@mui/icons-material/Event';

import Dashboard from "../pages/BackOffice/BackOffice";
import FileManager from "../pages/BackOffice/FileManager";
import MusicManager from "../pages/BackOffice/MusicManager";
import LiveStreams from "../pages/BackOffice/LiveStreams";
import AdminAnonymousMessages from '../pages/BackOffice/AdminAnonymousMessages';
import EventsManager from '../pages/BackOffice/EventsManager';

export const adminRoutes = [
    {
        name: "dashboard",
        path: "",
        sideNavItem: true,
        iconElement: <DashboardIcon />,
        component: Dashboard
    },
    {
        name: "music manager",
        path: "music-manager",
        sideNavItem: true,
        iconElement: <LibraryMusicIcon />,
        component: MusicManager
    },
    {
        name: "file manager",
        path: "file-manager",
        sideNavItem: true,
        iconElement: <Inventory2Icon />,
        component: FileManager
    },
    {
        name: "Live TV",
        path: "streams",
        sideNavItem: true,
        iconElement: <LiveTvIcon />,
        component: LiveStreams
    },
    {
        name: "Events Manager",
        path: "events-manager",
        sideNavItem: true,
        iconElement: <EventIcon />,
        component: EventsManager
    },
    {
        name: "Anonymous Messages",
        path: "anon-messages",
        sideNavItem: true,
        iconElement: <MessageIcon />,
        component: AdminAnonymousMessages
    },
]
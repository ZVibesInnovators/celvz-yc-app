import Dashboard from "../pages/BackOffice/BackOffice";

import DashboardIcon from '@mui/icons-material/Dashboard';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import MusicManager from "../pages/BackOffice/MusicManager";
import Inventory2Icon from '@mui/icons-material/Inventory2';
import FileManager from "../pages/BackOffice/FileManager";

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
]
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import DashboardIcon from '@mui/icons-material/Dashboard';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import WalletIcon from '@mui/icons-material/Wallet';
import MessageIcon from '@mui/icons-material/Message';
import CallIcon from '@mui/icons-material/Call';
import HistoryIcon from '@mui/icons-material/History';
import HelpIcon from '@mui/icons-material/Help';

export const mainNavbarItems = [
    {
        id: 0,
        icon: <AccountBoxIcon/>,
        label:'Profile',
        route: 'profile',
    },
    {
        id: 1,
        icon: <HealthAndSafetyIcon/>,
        label:'Health',
        route: 'health',
    },
    {
        id: 2,
        icon: <DashboardIcon />,
        label:'Overview',
        route: 'overview',
    },
    {
        id: 3,
        icon: <CalendarMonthIcon />,
        label:'Calendar',
        route: 'calendar',
    },
    {
        id: 4,
        icon: <WalletIcon />,
        label:'Wallet',
        route: 'wallet',
    },
    {
        id: 5,
        icon: <MessageIcon />,
        label:'Messaging',
        route: 'messaging',
    },
    {
        id: 6,
        icon: <CallIcon />,
        label:'Audio/Visual Call',
        route: 'audio-visual',
    },
    {
        id: 7,
        icon: <HistoryIcon />,
        label:'History',
        route: 'history',
    },
    {
        id: 8,
        icon: <HelpIcon />,
        label:'Tech Support',
        route: 'tech-support',
    },
]
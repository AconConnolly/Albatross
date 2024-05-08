
import DashboardIcon from '@mui/icons-material/Dashboard';
import HomeIcon from '@mui/icons-material/Home';
import SportsGolfIcon from '@mui/icons-material/SportsGolf';
import GolfCourseIcon from '@mui/icons-material/GolfCourse';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';

export const mainNavbarItems = [
    {
        id: 0,
        icon: <HomeIcon/>,
        label:'Make a Booking',
        route: 'home',
    },
    {
        id: 1,
        icon: <SportsGolfIcon/>,
        label:'Your Bookings',
        route: 'bookings',
    },
    {
        id: 2,
        icon: <GolfCourseIcon/>,
        label:'Courses',
        route: 'courses',
    },
    {
        id: 3,
        icon: <ManageAccountsIcon />,
        label:'Account',
        route: 'account',
    },
]
import { red } from "@mui/material/colors";

export const NavbarStyles = {
    drawer: {
        
        width: 240,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
            width: 240,
            boxSizing: 'border-box',
            backgroundColor: '#101F33',
            color: 'rgba(255, 255, 255, 0.7)',
        },
        '& .Mui-selected': {
            color: red,
        },
    },
    icons: {
        color: '#dc9e2b',
    },
    text: {
        '& span': {
            marginLeft: '-10px',
            fontWeight: '600',
            fontSize: '16px',
            color: '#dc9e2b'
        }
    } 
};
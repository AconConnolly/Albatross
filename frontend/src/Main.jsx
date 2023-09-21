import * as React from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';

export default function Main(props) {
    return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <h1>Main content</h1>
        <a href="https://mui.com/material-ui/react-autocomplete/">
            <Button>MaterialUI components</Button>    
        </a>
      </Container>
    )
}
import React from 'react';
import './App.css';
import { styled } from '@mui/styles';
import {Button,Grid,Box} from '@mui/material';


const MyButton = styled(Button)({
  background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
  border: 0,
  borderRadius: 3,
  boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  color: 'white',
  height: 48,
  padding: '0 30px',
});

const MyBox = styled(Box)({
  background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
  '& p': {
    color: 'green',
  }
});



function App() {
  return (
    <div className="App">
     <h2>Styled Component</h2>
     <MyButton>Styled Components</MyButton>
     <Grid container spacing={2}>
  <Grid item xs={8}>
    <MyBox><p>xs=8</p></MyBox>
  </Grid>
  <Grid item xs={4}>
    <div>xs=4</div>
  </Grid>
  <Grid item xs={4}>
    <div>xs=4</div>
  </Grid>
  <Grid item xs={8}>
    <div>xs=8</div>
  </Grid>
</Grid>
    </div>
  );
}

export default App;

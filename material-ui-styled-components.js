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


















import { Container, Grid, Box } from '@mui/material';
import React from 'react';
import { AppConatiner } from './components/Container.style';
import { styled } from '@mui/styles';
import Nav from './components/Nav';

const MyBox = styled(Box)({
  // backgroundColor:`${(props)=>props.bgColor}`
  background: "red",
  padding: "20px"
})

const MyDiv = styled('div')({
  // backgroundColor:`${(props)=>props.bgColor}`
  background: "green",
  padding: "4px",
  display: "flex",
  justifyContent: "space-around"
})


const InDiv = styled('div')({
  backgroundColor: "#f1f1f1",
  width: "100px",
  margin: "10px",
  textAlign: "center",
  lineHeight: "75px",
  fontSize: "30px"
})

function App(props) {
  return (
    <AppConatiner>
      <Nav />
      <Container fixed style={{ marginTop: '20px' }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <MyBox>xs=8</MyBox>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box>
              <MyDiv>
                <InDiv>1</InDiv>
                <InDiv>2</InDiv>
              </MyDiv>
            </Box>
          </Grid>
          <Grid item xs={4}>
            <Box>xs=4</Box>
          </Grid>
          <Grid item xs={8}>
            <Box>xs=8</Box>
          </Grid>
        </Grid>
      </Container>
    </AppConatiner>
  );
}

export default App;

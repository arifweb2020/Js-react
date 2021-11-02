import React from 'react';
import './App.css';
import { Button } from './components/Button.style';
import { AppConatiner } from './components/Container.style';

function App() {
  return (
    <AppConatiner>
     <h2>Styled Component</h2>
     <Button backgroundColor="pink">click</Button>
     <Button backgroundColor="blue">click</Button>
     </AppConatiner>
  );
}

export default App;


components

import styled from "styled-components";

export const AppConatiner = styled.div`
width:100vw;
height:100vh;
background-color:red;


`


import styled  from "styled-components";

export const Button = styled.button`
width:200px;
height:50px;
background-color:${(props)=>props.backgroundColor};


&:hover{
    background-color:red;
}

`

https://yamagata-developers-society.github.io/blog/react-hooks-slide-in-modal/

https://www.npmjs.com/package/react-modal-sheet

import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

import "./styles.css";

.Modal {
  position: fixed;
  bottom: -150vh;
  background-color: #fff;
  width: 100%;
  left: 0;
  padding: 0 12px 12px;
  transition: bottom 0.3s ease-out;
  z-index: 10;
}
.Modal.Show {
  bottom: 0;
}
.Overlay {
  background-color: rgba(0, 0, 0, 0.55);
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  position: fixed;
  display: none;
  z-index: 5;
}

.Overlay.Show {
  display: block;
}

function App() {
  const [alert, setAlert] = useState("");
  const [displayModal, setDisplayModal] = useState(false);

  useEffect(() => {
    const clearMessage = setTimeout(() => {
      setAlert("");
    }, 5000);
    return () => clearTimeout(clearMessage);
  }, [alert]);

  return (
    <div className="App">
      <button
        className="Button CenterAlign"
        onClick={() => setDisplayModal(!displayModal)}
      >
        Settings
      </button>

      <div className={`Modal ${displayModal ? "Show" : ""}`}>
        <h3>Settings</h3>
        <button
          className="Close"
          onClick={() => setDisplayModal(!displayModal)}
        >
          X
        </button>
        <p className="HelpText">
          Note: these settings are saved in the browser only and can be lost
        </p>
        <button
          className="Button"
          onClick={() => setAlert("This is an alert!")}
        >
          Trigger alert
        </button>
      </div>
      <div
        className={`Overlay ${displayModal ? "Show" : ""}`}
        onClick={() => setDisplayModal(!displayModal)}
      />
      <p className="Alert">{alert}</p>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);




/**
 * Modal for view the feedback comments.
 * autor : Arif
 */
 import React from 'react';
 import Box from '@mui/material/Box';
 import Typography from '@mui/material/Typography';
 import Modal from '@mui/material/Modal';
 import styled from "styled-components";
 import TextareaAutosize from '@mui/material/TextareaAutosize';
 //import { ClosedIcon } from '../assets/icons/feedBackIcon';
 
 const style = {
    //  position: 'absolute',
    //  top: '50%',
    //  left: '50%',
    //  transform: 'translate(-50%, -50%)',
    //  width: 700,
    //  bgcolor: 'background.paper',
    //  boxShadow: 24,
    //  p: 2,
    //  borderRadius: '20px',
    position: 'fixed',
  bottom: 0,
  backgroundColor: '#fff',
  width: '100%',
  left: 0,
  right:0,
  //padding: '0 12px 12px',
  transition: 'bottom 0.3s ease-out',
  zIndex:10,
  height:'400px',
  borderTopLeftRadius: '20px',
  borderTopRightRadius: '20px',
  outline: '#fff'
 };
 
 const ViewComments = styled(Typography)`
 color: #CA0000;
 font-weight:500;
 text-decoration:underline;
 cursor:pointer;
 `;

 const CloseButton = styled(Box)`
 display:flex;
 justify-content:end;
 & span{
     cursor:pointer;
 }
  `
 /**
  * 
  * @param {string} viewComments 
  * @returns BottomModal Component
  */
 function BottomModal(props) {
     const [open, setOpen] = React.useState(false);
     const handleOpen = () => setOpen(true);
     const handleClose = () => setOpen(false);
     return (
         <div>
             <ViewComments onClick={handleOpen}>view comments</ViewComments>
             <Modal
                 open={open}
                 aria-labelledby="modal-modal-title"
                 aria-describedby="modal-modal-description"
             >
                 <Box sx={style}>
                     <CloseButton  >
                         <span onClick={handleClose}>
                             close
                         </span>
                     </CloseButton>
                     <h1>sd</h1>
                 </Box>
             </Modal>
         </div>
     );
 }
 
 export default BottomModal;

import React from 'react';
import './App.css';
import AppHeader from './components/app-header/AppHeader';
//import CircularBtn from './components/circular-button/CircularBtn';
import MyFirstRating from './components/my-first-rating/MyFirstRating';
import ProgressBar from './components/rating-progress-bar/ProgressBar';
import ToastBox from './components/toast/ToastBox';
import Modal from './components/modal/Modal';




function App() {
  const [open, setOpen] = React.useState(false);
     const handleOpen = () => setOpen(true);
     const handleClose = () => setOpen(false);
  return (
    <div className="App">

      <AppHeader backgroundColor="#fff">
        <MyFirstRating>
          <ProgressBar />
          <ToastBox />
        </MyFirstRating>
        {/* <CircularBtn />  */}
        
      </AppHeader>

      

      <Modal  ModalOpen={open} ModalClose={handleClose} />

      <button onClick={handleOpen}>Open Modal</button>
     
      
    </div>
  );
}

export default App;


// MODAL COMPONENT

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
 function BottomModal({ModalOpen,ModalClose}) {
    // const [open, setOpen] = React.useState(false);
    //  const handleOpen = () => setOpen(true);
    //  const handleClose = () => setOpen(false);
     return (
         <div>
             {/* <ViewComments onClick={ModalOpen}>{btnText}</ViewComments> */}
             <Modal
                 open={ModalOpen}
                 aria-labelledby="modal-modal-title"
                 aria-describedby="modal-modal-description"
             >
                 <Box sx={style}>
                     <div style={{margin:'0 auto' , maxWidth:'80%'}}>
                     <CloseButton  >
                         <span onClick={ModalClose}>
                             close
                         </span>
                     </CloseButton>
                     <h1>sd</h1>
                     </div>
                 </Box>
             </Modal>
         </div>
     );
 }
 
 export default BottomModal;

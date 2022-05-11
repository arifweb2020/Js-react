import React from 'react';
import Box from '@mui/material/Box';

import Modal from '@mui/material/Modal';
import styled from "styled-components";


const style = {

    position: 'fixed',
    bottom: 0,
    backgroundColor: '#fff',
    width: '100%',
    left: 0,
    right: 0,
    //padding: '0 12px 12px',
    transition: 'bottom 0.3s ease-out',
    zIndex: 10,
    height: '400px',
    borderTopLeftRadius: '20px',
    borderTopRightRadius: '20px',
    outline: '#fff'
};



const CloseButton = styled(Box)`
 display:flex;
 justify-content:end;
 & span{
     cursor:pointer;
 }
  `

function Login(props) {
    const [name, setName] = React.useState("")
    const [open, setOpen] = React.useState(false);
    //  const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [visible, setIsVisible] = React.useState(false);

    const handleSubmission = (e) => {
        e.preventDefault();
        if (name.replace(/\s+/g, "").length === 0) {
            setIsVisible(true);
            setTimeout(function () {
                setIsVisible(false);
              }, 5000);
        }
        else {
            // call API
            // setLoading(true);

            // const loginCred = dispatch(
            //   verifyUserAsync({
            //     user,
            //     password,
            //   })
            // );
            // loginCred.then((val) => {
            //   // console.log("Printing the dispatch verify user resposne");
            //   // console.log("email " + val.payload?.data?.emailId);
            //   setLoading(false);
            //   if (val.payload?.data?.message?.includes("Incorrect")) {
            //     setWrongPassword(true);
            //     setSuccessMsg(false);
            //   } else if (
            //     val.payload?.data?.message?.includes("Password Creation is not done")
            //   ) {
            //     setPassCreation(val.payload?.data?.message);
            //     setSuccessMsg(false);
            //   } else {
            //     setSuccessMsg(true);
            //      setOpen(true)
            //     // localStorage.setItem("user-soId", JSON.stringify(val.payload?.data?.emailId))
            //     localStorage.setItem("user-soId", val.payload?.data?.emailId);
            //     localStorage.setItem(
            //       "resendOtp",
            //       encryption(val.meta?.arg?.password)
            //     );
            //     setTimeout(() => {
            //       history.push("/otp");
            //     }, 1000);
            //     // localStorage.setItem("user-soId", JSON.stringify(val.payload?.data?.emailId))
            //     // dispatch(updateUser({ userId: val.payload?.data.soId, emailId: val.payload?.data.emailId }))
            //   }
            // });
            // // setUser("")
            // setPassword("");

            setOpen(true)
            setName("")
        }
    }

    const handleKeypress = (e) => {
        //it triggers by pressing the enter key
        if (e.keyCode === 13) {
            handleSubmission();
        }
    };

    return (
        <div>
            <form>
                <input type="text"
                    value={name}
                    onKeyPress={handleKeypress}
                    onChange={(e) => setName(e.target.value)} />
                {visible && <p style={{color:'red'}}>enter your name</p>}
                <br />
                <button onClick={handleSubmission}>Login</button>
            </form>

            <Modal
                open={open}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <div style={{ margin: '0 auto', maxWidth: '80%' }}>
                        <CloseButton  >
                            <span onClick={handleClose}>
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

export default Login;

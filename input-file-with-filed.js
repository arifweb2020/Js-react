/**
 * Component to write feedback report.
 * 
 * Author : Arif
 */
import React, { useState } from 'react';
import {
    Box,
    Grid,
    Typography,
    Button

} from "@mui/material";
import styled from "styled-components";
import './style.css'

const MainContainer = styled(Box)`
 & {
   margin-bottom: 30px;
   padding: 0;
 },
 `;

const HeadingTypography = styled(Typography)`
 height: 28px;
 width: 272px;
 color: #2C333A;
 font-family: Poppins;
 font-size: 20px;
 font-weight: 600;
 letter-spacing: 0;
 line-height: 30px;

 & span{
     color:#A3ADB7;
 }

 & .bottomLine{
   height: 3px;
   width: 100px;
   border-radius: 100px;
   background-color: #A9001F;
   position: relative;
   left: 46%;
 }
 `;

const InnerConatiner = styled(Box)`
 box-sizing: border-box;
 height: 687.5px;
 border: 1.5px solid #EBECF1;
 border-radius: 20px;
 `

 const FilePreview = styled(Box)`
 height: 40px;
  background-color: #F8FAFB;
  border: 1.5px solid #EBECF1;
 `

 const FileUpload = styled(Box)`
 width: 100%;
 height: 40px;
 background-color: #fff;
 border: 1.5px solid #EBECF1;

& .inputUpload{
    opacity: 0;
        z-index: 1;
        position: relative;
        width: 100% !important;
        height: 40px !important;
        cursor: pointer;
        top:-30px;
}

& .fileText{
    color: #CA0000;
    position: relative;
    left: 14%;
    top: 16%;
}

 `

function FeedbackReport(props) {
    const [image, setImage] = useState("withoutpreview");
    const handleFileChange = (e) => {
        setImage({
            withoutpreview: e.target.files[0].name,
        })
    }
    return (
        <MainContainer>
            <Grid container >
                <Grid item xs={12} >
                    <HeadingTypography>
                        <span>Report List  / </span>
                        Feedback
                        <div className="bottomLine"></div>
                    </HeadingTypography>
                </Grid>
            </Grid>
            <InnerConatiner mt={6}>
                <Box mt={3} p={4}>
                    <Grid container >
                        <Grid item xs={9} md={10}>
                            <FilePreview>{image.withoutpreview} </FilePreview>
                        </Grid>
                        <Grid item xs={3} md={2}>
                                <FileUpload>
                                    <span className="fileText">Choose File</span>
                                    <input type="file"
                                        id="upload-button"
                                        className="inputUpload"
                                        onChange={handleFileChange}
                                    />
                                </FileUpload>  
                        </Grid>
                    </Grid>
                </Box>
            </InnerConatiner>
        </MainContainer>
    );
}

export default FeedbackReport;

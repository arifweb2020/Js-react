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
    TextareaAutosize,
} from "@mui/material";
import styled from "styled-components";
import { CheckedIcon, ClosedIcon } from '../../../../assets/icons/feedBackIcon';
import { relativeLength } from 'highcharts';


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
const UploadFileHeading = styled(Typography)`
  opacity: 0.5;
  color: #2C333A;
  font-family: Poppins;
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 0;
  line-height: 18px;
  margin-bottom:9px;
  `

const FilePreview = styled(Box)`
  display:flex;
  justify-content: space-between;
  height: 46.03px;
   background-color: #F8FAFB;
   border: 1.5px solid #EBECF1;
  
   & span{
    color: #CA0000;
    font-family: Poppins;
    font-size: 14px;
    font-weight: 500;
    letter-spacing: 0;
    padding: 12px;
    
   }
  `

const FileUpload = styled(Box)`
  width: 100%;
  height: 46.03px;
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
     left: 26%;
    top: 10%;
    font-family: Poppins;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0;
  line-height: 18px;
 }

 & .success{
    color: #62AD0A;
 }

 & .checked{
    position: relative;
    top: 11px;
    left: 22px;
 }
 
 @media (max-width:667px){
    & .fileText{
     font-size:11px;
     left:16%;
     }
     & .checked{
        
        left: 12px;
     }
 }
 `

function FeedbackReport(props) {
    const [image, setImage] = useState("");
    const handleFileChange = (e) => {
        setImage(
            e.target.files[0].name,
        )
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
                <Box p={4}>
                    <Grid container >
                        <Grid item xs={12}>
                            <UploadFileHeading>Upload File</UploadFileHeading>
                        </Grid>
                        <Grid item xs={8} sm={8} md={10}>
                            <FilePreview>
                                <span>{image} </span> 
                                {image === "" ? null : <span><ClosedIcon/> </span>  }  
                            </FilePreview>
                        </Grid>
                        <Grid item xs={4} sm={4} md={2}>
                            <FileUpload>
                                {image === "" ?
                                    (
                                        <span className="fileText">Choose File</span>
                                    ) :
                                    (
                                        <>
                                            <span className="checked"><CheckedIcon /></span>
                                            <span className="fileText success">Uploaded</span>
                                        </>
                                    )
                                }

                                <input type="file"
                                    id="upload-button"
                                    className="inputUpload"
                                    onChange={handleFileChange}
                                />
                            </FileUpload>
                        </Grid>
                        {image === "" ? null :
                            <h1>welcome</h1>
                        }
                    </Grid>
                </Box>
            </InnerConatiner>
        </MainContainer>
    );
}

export default FeedbackReport;

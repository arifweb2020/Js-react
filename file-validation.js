/**
 * Component to write feedback report of report details page.
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
import { TotalRecordIcon, ApprovedRecordIcon, IssueRecordIcon } from '../../../../assets/icons/feedBackIcon';
import { CheckedIcon, ClosedIcon, FileIcon } from '../../../../assets/icons/feedBackIcon';
import BreadCrumbs from '../../../../components/BreadCrumbs';
import { useSelector } from 'react-redux';

const MainContainer = styled(Box)`
    & {
      margin-bottom: 30px;
      padding: 0;
    },
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
      color: #2C333A;
      font-family: Poppins;
      font-size: 14px;
      font-weight: 500;
      letter-spacing: 0;
      padding: 12px;
     }
     
     @media (max-width:667px){
         & span{
             font-size:10px;
         }
     }
    `

const StyledFileUploadBox = styled(Box)`
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
       left: 22%;
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
  
   & .inputIcon{
      position: relative;
      top: 11px;
      left: 22px;
   }
   
   @media (max-width:667px){
      & .fileText{
       font-size:11px;
       left:10%;
       }
       & .inputIcon{
          font-size:13px;
          left: 6px;
       }
   }
   `

const InputHedaing = styled(Typography)`
 height: 20px;
 color: #2C333A;
 font-family: Poppins;
 font-size: 14px;
 font-weight: 500;
 letter-spacing: 0;
 line-height: 21px;
 `

const DottedBox = styled(Box)`
 min-height: 146.03px;
 border: 1.5px dashed #D0D2DB;
 border-radius: 5px;
 padding-left:20px;

 @media (max-width:667px){
     padding-bottom:20px;
 }

 `

const RecordHeading = styled(Typography)`
 color: #3F4449;
  font-family: Poppins;
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 0;
  line-height: 18px;
 `

const RecordCoundHeading = styled(Typography)`
 color: #3F4449;
 font-family: Poppins;
 font-size: 22px;
 font-weight: 600;
 letter-spacing: 0;
 line-height: 33px;
 `
const TextArea = styled(TextareaAutosize)`
 border: 1.5px solid #EBECF1;
   border-radius: 5px;
   background-color: #FFFFFF;
   box-sizing: border-box;
   height: 146.03px !important;
   width:100%;
   margin-top:10px;
   opacity: 0.63;
   color: #2C333A;
   font-family: Poppins;
   font-size: 14px;
   font-weight: 500;
   letter-spacing: 0;
   line-height: 21px;
   padding:20px 0 0 25px;
 `
const ButtonBox = styled(Box)`
 display: flex;
 justify-content: flex-end;
 
 & .btn{
     box-sizing: border-box;
     height: 51.5px;
     width: 207.5px;
     border-radius: 25px;
   font-family: Poppins;
   font-size: 14px;
   font-weight: 600;
   letter-spacing: 0;
   line-height: 21px;
   text-align: center;
   
 }
 
 & .btn-cancel{
     border: 1.5px solid #B90015;
     background-color: #FFFFFF;
     color: #CA0000;
     margin-right: 21px;
     cursor:pointer;
 }
 
 & .btn-submit{
     background: linear-gradient(135deg, #B2BEC3 0%, #A4B0BA 100%);
     border:none;
     color: #FFFFFF;
 }

 & .btn-active{
    background: linear-gradient(135deg, #9D1D27 0%, #6E0A0F 100%);
    color: #FFFFFF;
    cursor:pointer;
 }

 @media (max-width:667px){
    & .btn{
        width:100px;
    }
 }
 `

function FeedbackReport(props) {
    const data = useSelector((state) => state.feedbackPanelDetails);
    const [file, setFile] = useState("");
    const [comments, setComments] = useState("");
    const fileType = new RegExp(
        '([a-zA-Z0-9\s_\\.\-:])+(.xls|.xlsx|.csv)$'
     );
    const handleFileChange = (e) => {
        // if (!fileType.test(file)){
        //     alert("choose csv file")
        // }
        // else{
        //     setFile(e.target.files[0].name)
        // }  
        if (e.target.files[0].name === '' || fileType.test(e.target.files[0].name)) {
            setFile(e.target.files[0].name)
          }
          else{
            window.alert("choose csv file")
          }
    }

    const handleUserInput = (e) => {
        setComments(e.target.value);
    };

    /**
     * 
     * @returns post the uploaded file data
     */
    // API CALL
    // const handleSubmission = async () => {
    //     if (!comments) {
    //         setAlert(true);
    //         return
    //     }
    //     const formData = new FormData();
    //     formData.append('File', file);
    //     await fetch(
    //         'API_URL',
    //         {
    //             method: 'PUT',
    //             headers: {
    //                 "Content-Type": "multipart/form-data",
    //             },
    //             body: {
    //                 formData,
    //                 comments
    //             }
    //         }
    //     )
    //         .then((response) => response.json())
    //         .then((result) => {
    //             console.log('Success:', result);
    //             window.alert("data save succesfully")
    //         })
    //         .catch((error) => {
    //             console.error('Error:', error);
    //             window.alert("something went wrong")
    //         });
    // };


    return (
        <MainContainer>
            <Grid container >
                <Grid item xs={12} >
                    <BreadCrumbs firstHeading="Report List  / " secondHeading="Feedback" width="100px" left="125px" />
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
                                <span>{file} </span>
                                {file === "" ? null : <span onClick={() => { setFile("") }} style={{ cursor: 'pointer' }}><ClosedIcon /> </span>}
                            </FilePreview>
                        </Grid>
                        <Grid item xs={4} sm={4} md={2}>
                            {file === "" ?
                                (
                                    <StyledFileUploadBox>
                                        <span className="inputIcon"><FileIcon /></span>
                                        <span className="fileText">Choose File</span>
                                        <input type="file"
                                            className="inputUpload"
                                            onChange={handleFileChange}
                                            aria-label="upload csv and xl file only"
                                            accept=".xlsx, .xls, .csv"
                                        />
                                    </StyledFileUploadBox>
                                ) :
                                <StyledFileUploadBox>
                                    <span className="inputIcon"><CheckedIcon /></span>
                                    <span className="fileText success">Uploaded</span>
                                </StyledFileUploadBox>
                            }
                        </Grid>
                    </Grid>
                    {file === "" ? null :
                        <DottedBox mt={3}>
                            <Grid container mt={3}>
                                <Grid item xs={12} >
                                    <InputHedaing>File Details</InputHedaing>
                                </Grid>
                            </Grid>
                            <Grid container mt={3}>
                                <Grid item xs={12} sm={4} md={3}>
                                    <Grid container >
                                        <Grid item xs={3} sm={5} md={3}>
                                            <TotalRecordIcon />
                                        </Grid>
                                        <Grid item xs={9} sm={7} md={9} pl={1}>
                                            <RecordHeading>{data?.totalRecords?.title}</RecordHeading>
                                            <RecordCoundHeading>{data?.totalRecords?.count}</RecordCoundHeading>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item xs={12} sm={4} md={3}>
                                    <Grid container>
                                        <Grid item xs={3} sm={5} md={3} >
                                            <ApprovedRecordIcon />
                                        </Grid>
                                        <Grid item xs={9} sm={7} md={9} pl={1}>
                                            <RecordHeading>{data?.approvedRecords?.title}</RecordHeading>
                                            <RecordCoundHeading>{data?.approvedRecords?.count}</RecordCoundHeading>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item xs={12} sm={4} md={3}>
                                    <Grid container>
                                        <Grid item xs={3} sm={5} md={3}>
                                            <IssueRecordIcon />
                                        </Grid>
                                        <Grid item xs={9} sm={7} md={9} pl={1}>
                                            <RecordHeading>{data?.issueRecords?.title}</RecordHeading>
                                            <RecordCoundHeading>{data?.issueRecords?.count}</RecordCoundHeading>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>

                        </DottedBox>
                    }
                    <Grid container mt={3}>
                        <Grid item xs={12}>
                            <InputHedaing>Comments</InputHedaing>
                            <TextArea
                                aria-label="Type Your Comments"
                                placeholder="Type here"
                                type="text"
                                onChange={handleUserInput}
                                value={comments}
                            />
                        </Grid>
                    </Grid>
                    <Grid container mt={3}>
                        <Grid item xs={12}>
                            <ButtonBox>
                                <button className="btn btn-cancel" onClick={() => { setFile("") || setComments("") }}>Cancel</button>
                                {
                                    file === "" ?
                                        <button className="btn btn-submit" disabled>Submit</button>
                                        : <button className="btn btn-submit btn-active"
                                        // API CALL onClick={handleSubmission}
                                        >Submit</button>
                                }
                            </ButtonBox>
                        </Grid>
                    </Grid>
                </Box>
            </InnerConatiner>
        </MainContainer>
    );
}

export default FeedbackReport;


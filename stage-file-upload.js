
import React, { useState } from 'react';
import {
    Box,
    Grid,
    Typography,
} from "@mui/material";
import styled from "styled-components";
import { TotalRecordIcon, ApprovedRecordIcon, IssueRecordIcon } from '../../../../assets/icons/feedBackIcon';
import { CheckedIcon, ClosedIcon, FileIcon, UploadingIcon } from '../../../../assets/icons/feedBackIcon';
import BreadCrumbs from '../../../../components/BreadCrumbs';
import { useSelector, useDispatch } from 'react-redux';
import { reportProperties } from '../../../../global/properties/Report';
import useReportLabel from '../../../../global/labels/ReportLabels';
import IterationDetails from '../feedback-iteration-table/IterationDetails';
import SpinLoader from '../../../../components/SpinLoader';
import CommentBox from '../../../../components/CommentBox';
import CancelButton from '../../../../components/CancelButton'
import DisableSubmitButton from '../../../../components/DisableSubmitButton';
import SubmitButton from '../../../../components/SubmitButton';
import ErrorMsgAlert from '../../../../components/ErrorMsgAlert';
import SuccessMsgAlert from '../../../../components/SuccessMsgAlert';
import { newComments } from './FeedbackReportSlice';
import ToolTips from '../../../../components/ToolTips';


const MainContainer = styled(Box)`
     & {
       margin-bottom: 30px;
       padding: 0;
     },
     `;

const InnerConatiner = styled(Box)`
     box-sizing: border-box;
     min-height: 687.5px;
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

    & .loading{
        color: #CA0000;
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
const ButtonBox = styled(Box)`
  display: flex;
  justify-content: flex-end;
  `
const ColumnHeading = styled(Typography)`
  opacity: 0.6;
  color: #2C333A;
  font-family: Poppins;
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 0;
  line-height: 21px;
  margin-left: 20px;
 
  @media (max-width:667px){
      margin-left:0px;
      font-size:12px;
      text-align:center;
  }
 `
const DataBox = styled(Box)`
 height: 62px;
  background-color: #F8FAFB;
  display: flex;
    justify-content: center;
 
  & p {
    opacity: 0.3;
    color: #2C333A;
    font-family: Poppins;
    font-size: 18px;
    font-weight: 600;
    letter-spacing: 0;
    line-height: 27px;
  }
 `



function File(props) {
    const data = useSelector((state) => state.feedbackPanelDetails);
    const [file, setFile] = useState("");
    const [comments, setComments] = useState("");
    const [isError, setError] = useState(false);
    const [isCommentEmpty, setComment] = useState(false);
    const [isSuccess, setSuccess] = useState(false);
    const reportLabel = useReportLabel();
    const [loading, setLoading] = useState(false)
    const [stage, setStage] = useState("uploading");
    const [panel, setPanel] = useState("");

    let dispatch = useDispatch();

    const fileType = new RegExp(
        '([a-zA-Z0-9\s_\\.\-:])+(.xls|.xlsx)$'
    );

    const handleFileChange = (e) => {
        if (e.target.files[0].name === '' || fileType.test(e.target.files[0].name)) {
            setFile(e.target.files[0].name)
            setTimeout(() => {
                setStage("uploaded");
                setPanel("panelbox");
            }, 4000);
        }
        else {
            setError(true);
        }
    }

    const handleOnChange = (e) => {
        setComments(e.target.value);
    };

    const handleClose = (reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setError(false);
    };

    const handleClose1 = (reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSuccess(false);
    };

    const handleClose2 = (reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setComment(false);
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
    //     else {
    //         setLoading(true)
    //         const formData = new FormData();
    //         formData.append('File', file);
    //         await fetch(
    //             'API_URL',
    //             {
    //                 method: 'PUT',
    //                 headers: {
    //                     "Content-Type": "multipart/form-data",
    //                 },
    //                 body: {
    //                     formData,
    //                     comments
    //                 }
    //             }
    //         )
    //             .then((response) => response.json())
    //             .then((result) => {
    //                 console.log('Success:', result);
    //                 setLoading(false)
    //                 setSuccess(true)
    //             })
    //             .catch((error) => {
    //                 console.error('Error:', error);
    //                 window.alert("something went wrong")
    //             });
    //     }
    // };

    // const handleSubmission = () => {
    //     if (!comments) {
    //         setComment(true);
    //         return
    //     }
    //     else {
    //         setLoading(true)
    //         setTimeout(() => {
    //             setLoading(false)
    //             setComments("")
    //             setFile("")
    //             setSuccess(true)
    //         }, 30000)
    //     }
    // }

    const handleSubmission = () => {
        if (!comments) {
            setComment(true);
            return
        }
        else {
            setLoading(true)
            setTimeout(() => {
                setLoading(false)
                dispatch(newComments({
                    id: 1,
                    date: new Date().toJSON(),
                    assignedTo: "Shartah Gowda",
                    statusID: "open",
                    status: "Open",
                    comments: comments
                }));
                setComments("")
                setSuccess(true)
            }, 5000)
        }
    }

    const resetForm = () => {
        setFile("") || setComments("") || setStage("uploading") || setPanel("")
    }


    const Uploading = () => {
        return (
            <>
                <StyledFileUploadBox>
                    <span className="inputIcon"><UploadingIcon /></span>
                    <span className="fileText loading">{reportLabel.fieldsLabel.upload}</span>
                </StyledFileUploadBox>
            </>
        )
    }


    const Uploaded = () => {
        return (
            <>
                <StyledFileUploadBox>
                    <span className="inputIcon"><CheckedIcon /></span>
                    <span className="fileText success">{reportLabel.fieldsLabel.uploaded}</span>
                </StyledFileUploadBox>
            </>
        )
    }

    const PanelBox = () => {
        return (
            <>
                <DottedBox mt={3}>
                    <Grid container mt={3}>
                        <Grid item xs={12} >
                            <InputHedaing>{reportLabel.fileDetails.title}</InputHedaing>
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
            </>
        )
    }

    return (
        <MainContainer>

            {loading ? <SpinLoader /> : null}
            {isError ? <ErrorMsgAlert msgText={reportProperties.fileUploadErrorMsg} click={handleClose} /> : null}
            {isCommentEmpty ? <ErrorMsgAlert msgText={reportProperties.commentBoxMsg} click={handleClose2} /> : null}
            {isSuccess ? <SuccessMsgAlert msgText={reportProperties.successMsg} click={handleClose1} /> : null}

            <Grid container >
                <Grid item xs={12} >
                    <BreadCrumbs firstHeading="Report List  / " secondHeading="Feedback" />
                </Grid>
            </Grid>
            <InnerConatiner mt={6}>
                <Box p={4}>
                    <Grid container >
                        <Grid item xs={12}>
                            <UploadFileHeading> {reportLabel.fieldsLabel.uploadFile}</UploadFileHeading>
                        </Grid>
                        <Grid item xs={8} sm={8} md={10}>
                            <FilePreview>
                                {stage === "uploading" ? <span style={{ color: '#CA0000' }}>{file} </span> : <span>{file} </span>}
                                {
                                    file === "" ?
                                        null :
                                        <span onClick={() => { setFile("") || setStage("uploading") || setPanel("") }} style={{ cursor: 'pointer' }}>
                                            <ToolTips text="Remove File" position="bottom-start"><ClosedIcon /></ToolTips>
                                        </span>
                                }
                            </FilePreview>
                        </Grid>
                        <Grid item xs={4} sm={4} md={2}>
                            {file === "" ?
                                (
                                    <ToolTips text="Choose .xlsx, .xls File Only" position="bottom-start">
                                        <StyledFileUploadBox>
                                            <span className="inputIcon"><FileIcon /></span>
                                            <span className="fileText">{reportLabel.fieldsLabel.chooseFile}</span>
                                            <input type="file"
                                                className="inputUpload"
                                                onChange={handleFileChange}
                                                aria-label="upload csv and xl file only"
                                                accept=".xlsx, .xls"
                                                title=""
                                            />
                                        </StyledFileUploadBox>
                                    </ToolTips>
                                ) :
                                <>
                                    {stage === "uploading" && <Uploading />}
                                    {stage === "uploaded" && <Uploaded />}
                                </>
                            }
                        </Grid>
                    </Grid>
                    {file === "" ? null :
                        <>
                            {panel === "panelbox" && <PanelBox />}
                        </>
                    }
                    <Grid container mt={3}>
                        <Grid item xs={12}>
                            <InputHedaing>{reportLabel.fieldsLabel.comments}</InputHedaing>
                            <CommentBox
                                placeholder={reportLabel.fieldsLabel.commentsPlaceHolder}
                                value={comments}
                                onchange={handleOnChange}
                            />
                        </Grid>
                    </Grid>
                    <Grid container mt={3}>
                        <Grid item xs={12}>
                            <InputHedaing>{reportLabel.screenLabel.iterationdetails}</InputHedaing>
                        </Grid>
                    </Grid>
                    {
                        file === "" ?
                            <>
                                <Grid container mt={3}>
                                    <Grid item xs={3}>
                                        <ColumnHeading>{reportLabel.iterationdetailsColumn.date}</ColumnHeading>
                                    </Grid>
                                    <Grid item xs={3}>
                                        <ColumnHeading>{reportLabel.iterationdetailsColumn.assignedTo}</ColumnHeading>
                                    </Grid>
                                    <Grid item xs={3}>
                                        <ColumnHeading>{reportLabel.iterationdetailsColumn.Status}</ColumnHeading>
                                    </Grid>
                                    <Grid item xs={3}>
                                        <ColumnHeading>{reportLabel.iterationdetailsColumn.comments}</ColumnHeading>
                                    </Grid>
                                </Grid>
                                <Grid container mt={1}>
                                    <Grid item xs={12}>
                                        <DataBox>
                                            <p>{reportLabel.messages.noData}</p>
                                        </DataBox>
                                    </Grid>
                                </Grid>
                            </> :
                            <IterationDetails />
                    }
                    <Grid container mt={6}>
                        <Grid item xs={12}>
                            <ButtonBox>
                                <ToolTips text="Cancel Feedback" position="bottom-start"><CancelButton click={resetForm} text={reportLabel.fieldsLabel.cancel} /></ToolTips>
                                {
                                    file === "" ?
                                        <DisableSubmitButton text={reportLabel.fieldsLabel.submit} />
                                        :
                                        <ToolTips text="Submit Feedback" position="bottom-start"> <SubmitButton click={handleSubmission} text={reportLabel.fieldsLabel.submit} /></ToolTips>
                                }
                            </ButtonBox>
                        </Grid>
                    </Grid>
                </Box>
            </InnerConatiner>
        </MainContainer>
    );
}


export default File;


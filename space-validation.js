import React, { useState } from "react";
import { Box, Grid } from "@mui/material";
import {
  TotalRecordIcon,
  ApprovedRecordIcon,
  IssueRecordIcon,
} from "../../../../assets/icons/feedBackIcon";
import {
  CheckedIcon,
  ClosedIcon,
  FileIcon,
  UploadingIcon,
} from "../../../../assets/icons/feedBackIcon";
import BreadCrumbs from "../../../../components/BreadCrumbs";
import { useSelector, useDispatch } from "react-redux";
import { reportProperties } from "../../../../global/properties/Report";
import useReportLabel from "../../../../global/labels/ReportLabels";
import IterationDetails from "../feedback-iteration-table/IterationDetails";
import SpinLoader from "../../../../components/SpinLoader";
import CommentBox from "../../../../components/CommentBox";
import CancelButton from "../../../../components/CancelButton";
import DisableSubmitButton from "../../../../components/DisableSubmitButton";
import SubmitButton from "../../../../components/SubmitButton";
import ErrorMsgAlert from "../../../../components/ErrorMsgAlert";
import SuccessMsgAlert from "../../../../components/SuccessMsgAlert";
import { resetData } from "./FeedbackReportSlice";
import ToolTips from "../../../../components/ToolTips";
import {
  submitFeedbackReportAsync,
  uploadFeedbackFileAsync,
} from "./FeedbackReportSlice";
import { useHistory } from "react-router-dom";
import { getMonthName } from "../../../../utilities/AppsUtility";
import { MainContainer, InnerConatiner, UploadFileHeading, FilePreview, StyledFileUploadBox, InputHedaing, DottedBox, RecordHeading, RecordCoundHeading, ButtonBox, ColumnHeading, DataBox } from "./FeedbackReport.css";


function Arif(props) {
  const profileLOV = useSelector((state) => state.user);
  const params = useSelector((state) => state.navParams.reportToReportDetails);
  const data = useSelector((state) => state.feedbackPanelDetails.data);
  const [file, setFile] = useState("");
  const [fileObject, setFileObject] = useState(null);
  const [comments, setComments] = useState("");
  const [isError, setError] = useState(false);
  const [fileSize, setFileSize] = useState(false);
  const [uploadFileSize, setUploadFileSize] = useState(false);
  const [isFilePanel, setFilePanel] = useState(false);
  const [isCommentEmpty, setComment] = useState(false);
  //  const [isSuccess, setSuccess] = useState(false);
  const [successMessage, setsuccessMessage] = useState("");
  const reportLabel = useReportLabel();
  const [loading, setLoading] = useState(false);
  const [stage, setStage] = useState("upload");
  const [panel, setPanel] = useState("");
  const [iterationTable, setIterationTable] = useState("");
  const [fileError, setFileError] = useState("")
  const [emptyColumn, setEmptyColumn] = useState("")
  const [docId, setDocId] = useState("")


  let dispatch = useDispatch();
  let history = useHistory();

  // React.useEffect(() => {
  //     dispatch(getFeedbackReportAsync({ cycleStartDate: "2021-04-01", cycleEndDate: "2021-04-30", comments: "Approved", productType: "LAP", totalRecords: 50, recordWithIssue: 0, approvedRecords: 50, assignTo: "pankaj tripathi" }));
  // }, [dispatch]);

  const fileType = new RegExp("([a-zA-Z0-9s_\\.-:])+(.xls|.xlsx)$");

  const handleFileChange = async (e) => {
    let f = e.target.files[0]
    if (
      e.target.files[0].name === "" ||
      fileType.test(e.target.files[0].name)
    ) {
      setFile(e.target.files[0].name);
      setFileObject(e.target.files[0]);
      //  console.log("file size " + f.size)
    }
    else {
      setError(true);
    }
    if (f.size >= 25000000) {
      setUploadFileSize(true)
      setFile("")
    }


  };


  const uploadData = async (e) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("file", fileObject);
    formData.append("cycleStartDate", params.cycleStartDate);
    formData.append("cycleEndDate", params.cycleEndDate);
    formData.append("productType", params.productType);
    //setLoading(false);
    const uploadFeedback = dispatch(uploadFeedbackFileAsync(formData));
    uploadFeedback.then((val) => {
      //  console.log("Printing the feedback file");
      // console.log(JSON.stringify(val));
      setDocId(val.payload?.data?.documentId)
      setLoading(false)
      if (val.payload?.data?.message?.includes("Status column")) {
        setEmptyColumn(val.payload?.data?.message)
        setPanel("") ||
          setFile("") ||
          setStage("upload") ||
          setIterationTable("") || dispatch(resetData())
      }
      else if (val.payload?.data?.message?.includes("Please upload a report having less than 25 MB size")) {
        setFileSize(true)
        setPanel("") ||
          setFile("") ||
          setStage("upload") ||
          setIterationTable("") || dispatch(resetData())
      }
      else if (val.payload?.data?.message) {
        setFileError("Please upload the feedback for Product - " + params.productType + ", Cycle - " + getMonthName(new Date(params.cycleStartDate).getMonth() + 1) + " " + new Date(params.cycleStartDate).getFullYear())
        setPanel("") ||
          setFile("") ||
          setStage("upload") ||
          setIterationTable("") || dispatch(resetData())
      }

      else {
        setStage("uploaded");
        setPanel("panelbox");
        setIterationTable("iterationData");
      }


    });


  };

  const handleOnChange = (e) => {
    setComments(e.target.value);
  };

  const handleClose = (reason) => {
    if (reason === "clickaway") {
      return;
    }
    setError(false);
  };

  //  const handleClose1 = (reason) => {
  //    if (reason === "clickaway") {
  //      return;
  //    }
  //    setSuccess(false);
  //  };

  const handleClose2 = (reason) => {
    if (reason === "clickaway") {
      return;
    }
    setComment(false);
  };

  const handleClose3 = (reason) => {
    if (reason === "clickaway") {
      return;
    }
    setFilePanel(false);
  };

  const handleClose4 = (reason) => {
    if (reason === "clickaway") {
      return;
    }
    setsuccessMessage(false);
  };

  const handleClose5 = (reason) => {
    if (reason === "clickaway") {
      return;
    }
    setFileError(false);
  };

  const handleClose6 = (reason) => {
    if (reason === "clickaway") {
      return;
    }
    setEmptyColumn(false);
  };

  const handleClose7 = (reason) => {
    if (reason === "clickaway") {
      return;
    }
    setFileSize(false);
  };

  const handleClose8 = (reason) => {
    if (reason === "clickaway") {
      return;
    }
    setUploadFileSize(false);
  };

  const handleSubmission = () => {
    if (comments.replace(/\s+/g, '').length === 0) {
      setComment(true);
      return;
    }
    if (!panel) {
      setFilePanel(true);
      return;
    } else {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        const uploadedFeedback = dispatch(
          submitFeedbackReportAsync({
            cycleStartDate: params.cycleStartDate,
            cycleEndDate: params.cycleEndDate,
            comments: comments,
            productType: params.productType,
            totalRecords: data?.totalRecords?.count,
            recordWithIssue: data?.issueRecords?.count,
            approvedRecords: data?.approvedRecords?.count,
            assignTo: profileLOV.firstName,
            docId: docId
          })
        );
        uploadedFeedback.then((val) => {
          //  console.log("Printing the dispatch resposne");
          //  console.log(JSON.stringify(val));
          //  setsuccessMessage(val?.payload?.data);
          // setsuccessMessage(true)
        });
        setComments("");
        // setSuccess(true)
        setsuccessMessage(true)
        setPanel("");
        setFile("");
        setStage("upload");
      }, 3000);
      setTimeout(() => {
        // commented below line as we need to go back to report once feedback is uploaded
        //history.push("/reports/report-details")
        // added below line to route to report landing screen once the feedback is uploaded successfully
        history.push("/reports");
      }, 6000);
    }
  };

  const resetForm = () => {
    setFile("") || setComments("") || setStage("upload") || setPanel("");
    // commented below line as we need to go back to report once feedback is uploaded
    //history.push("/reports/report-details")
    // added below line to route to report landing screen once the feedback is uploaded successfully
    history.push("/reports");
  };

  const Upload = () => {
    return (
      <>
        <StyledFileUploadBox>
          <Box onClick={uploadData} sx={{ cursor: "pointer" }}>
            <span className="inputIcon">
              <UploadingIcon />
            </span>
            <span
              className="fileText loading"
              style={{ top: "6px", right: "8px" }}
            >
              {reportLabel.fieldsLabel.upload}
            </span>
          </Box>
        </StyledFileUploadBox>
      </>
    );
  };

  const Uploaded = () => {
    return (
      <>
        <StyledFileUploadBox>
          <span className="inputIcon">
            <CheckedIcon />
          </span>
          <span className="fileText success">
            {reportLabel.fieldsLabel.uploaded}
          </span>
        </StyledFileUploadBox>
      </>
    );
  };

  const PanelBox = ({ data }) => {
    return (
      <>
        <DottedBox mt={3}>
          <Grid container mt={3}>
            <Grid item xs={12}>
              <InputHedaing>{reportLabel.fileDetails.title}</InputHedaing>
            </Grid>
          </Grid>
          <Grid container mt={3}>
            <Grid item xs={12} sm={4} md={3}>
              <Grid container>
                <Grid item xs={3} sm={5} md={3}>
                  <TotalRecordIcon />
                </Grid>
                <Grid item xs={9} sm={7} md={9} pl={1}>
                  <RecordHeading>{data?.totalRecords?.title}</RecordHeading>
                  <RecordCoundHeading>
                    {data?.totalRecords?.count}
                  </RecordCoundHeading>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} sm={4} md={3}>
              <Grid container>
                <Grid item xs={3} sm={5} md={3}>
                  <ApprovedRecordIcon />
                </Grid>
                <Grid item xs={9} sm={7} md={9} pl={1}>
                  <RecordHeading>{data?.approvedRecords?.title}</RecordHeading>
                  <RecordCoundHeading>
                    {data?.approvedRecords?.count}
                  </RecordCoundHeading>
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
                  <RecordCoundHeading>
                    {data?.issueRecords?.count}
                  </RecordCoundHeading>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </DottedBox>
      </>

    );
  };

  return (
    <MainContainer>
      {loading ? <SpinLoader /> : null}
      {isError ? (
        <ErrorMsgAlert
          msgText={reportProperties.fileUploadErrorMsg}
          click={handleClose}
        />
      ) : null}
      {fileError ? (
        <ErrorMsgAlert
          msgText={fileError}
          click={handleClose5}
        />
      ) : null}
      {isFilePanel ? (
        <ErrorMsgAlert
          msgText={reportProperties.fileUploadPanel}
          click={handleClose3}
        />
      ) : null}
      {isCommentEmpty ? (
        <ErrorMsgAlert
          msgText={reportProperties.commentBoxMsg}
          click={handleClose2}
        />
      ) : null}
      {/* {isSuccess ? <SuccessMsgAlert msgText={reportProperties.successMsg} click={handleClose1} /> : null} */}
      {successMessage ? (
        <SuccessMsgAlert msgText="Feedback submitted sucessfully" click={handleClose4} />
      ) : null}
      {emptyColumn ? (
        <ErrorMsgAlert
          msgText={emptyColumn}
          click={handleClose6}
        />
      ) : null}

      {fileSize ? (
        <ErrorMsgAlert
          msgText={reportProperties.fileSize}
          click={handleClose7}
        />
      ) : null}

      {uploadFileSize ? (
        <ErrorMsgAlert
          msgText={reportProperties.uploadFileSize}
          click={handleClose8}
        />
      ) : null}

      <Grid container>
        <Grid item xs={12}>
          <BreadCrumbs
            firstHeading="Report List  / "
            secondHeading="Feedback"
            thirdHeading="Report Details / "
          />
        </Grid>
      </Grid>
      <InnerConatiner mt={6}>
        <Box p={4}>
          <Grid container>
            <Grid item xs={12}>
              <UploadFileHeading>
                {" "}
                {reportLabel.fieldsLabel.uploadFile}
              </UploadFileHeading>
            </Grid>
            <Grid item xs={8} sm={8} md={10}>
              <FilePreview>
                {stage === "upload" ? (
                  <span
                    style={{ color: "#CA0000", textDecoration: "underline" }}
                  >
                    {file}{" "}
                  </span>
                ) : (
                  <span>{file} </span>
                )}
                {file === "" ? null : (
                  <span
                    onClick={() => {
                      setFile("") ||
                        setStage("upload") ||
                        setPanel("") ||
                        setIterationTable("") ||
                        dispatch(resetData())
                    }}
                    style={{ cursor: "pointer" }}
                  >
                    <ToolTips text="Remove File" position="bottom-start">
                      <ClosedIcon />
                    </ToolTips>
                  </span>
                )}
              </FilePreview>
            </Grid>
            <Grid item xs={4} sm={4} md={2}>
              {file === "" ? (
                <ToolTips
                  text="Choose .xlsx, .xls File Only"
                  position="bottom-start"
                >
                  <StyledFileUploadBox>
                    <span className="inputIcon">
                      <FileIcon />
                    </span>
                    <span className="fileText">
                      {reportLabel.fieldsLabel.chooseFile}
                    </span>
                    <input
                      type="file"
                      className="inputUpload"
                      onChange={handleFileChange}
                      aria-label="upload csv and xl file only"
                      accept=".xlsx, .xls"
                      title=""
                    />
                  </StyledFileUploadBox>
                </ToolTips>
              ) : (
                <>
                  {stage === "upload" && <Upload />}
                  {stage === "uploaded" && <Uploaded />}
                </>
              )}
            </Grid>
          </Grid>
          {file === "" ? null : <>{panel === "panelbox" && <PanelBox data={data} />}</>}
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
              <InputHedaing>
                {reportLabel.screenLabel.iterationdetails}
              </InputHedaing>
            </Grid>
          </Grid>
          {stage === "uploaded" ? (
            <>{iterationTable === "iterationData" && <IterationDetails />}</>
          ) : (
            <>
              <Grid container mt={3}>
                <Grid item xs={3}>
                  <ColumnHeading>
                    {reportLabel.iterationdetailsColumn.date}
                  </ColumnHeading>
                </Grid>
                <Grid item xs={3}>
                  <ColumnHeading>
                    {reportLabel.iterationdetailsColumn.assignedTo}
                  </ColumnHeading>
                </Grid>
                <Grid item xs={3}>
                  <ColumnHeading>
                    {reportLabel.iterationdetailsColumn.Status}
                  </ColumnHeading>
                </Grid>
                <Grid item xs={3}>
                  <ColumnHeading>
                    {reportLabel.iterationdetailsColumn.comments}
                  </ColumnHeading>
                </Grid>
              </Grid>
              <Grid container mt={1}>
                <Grid item xs={12}>
                  <DataBox>
                    <p>{reportLabel.messages.noData}</p>
                  </DataBox>
                </Grid>
              </Grid>
            </>
          )}
          <Grid container mt={6}>
            <Grid item xs={12}>
              <ButtonBox>
                <ToolTips text="Close Feedback form" position="bottom-start">
                  <CancelButton
                    click={resetForm}
                    text={reportLabel.fieldsLabel.cancel}
                  />
                </ToolTips>
                {file === "" ? (
                  <DisableSubmitButton text={reportLabel.fieldsLabel.submit} />
                ) : (
                  <>
                    {data?.issueRecords?.count === 0 ? (
                      <SubmitButton
                        click={handleSubmission}
                        text={reportLabel.fieldsLabel.submit}
                      />
                    ) : (
                      <SubmitButton
                        click={handleSubmission}
                        text={reportLabel.fieldsLabel.sendRectification}
                      />
                    )}
                  </>
                )}
              </ButtonBox>
            </Grid>
          </Grid>
        </Box>
      </InnerConatiner>
    </MainContainer>
  );
}

export default Arif;

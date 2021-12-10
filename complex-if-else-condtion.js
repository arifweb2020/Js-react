{profileLOV.roleName === "arif" ? null :
        Object.keys(rejectQueryData).length == 0 ? null :
        Object.keys(approveData).length == 0 ? null :
        <h1>Success</h1>
      }


import React from 'react';
import { Box, Typography, Divider, Grid, FormControl, IconButton, OutlinedInput, InputAdornment } from "@mui/material";
import ReportStatusBox from '../../../../components/ReportStatusBox';
import CommentHistory from '../../../../components/CommentHistory';
import styled from "styled-components";
import { RemarksIcon } from "../../../../assets/icons/ApprovalDetailsIcons";
import useApprovalLabel from "../../../../global/labels/ApprovalLabels";
import BreadCrumbs from '../../../../components/BreadCrumbs';
import OutlinedButton from '../../../../components/OutlinedButton';
import ContainedButton from '../../../../components/ContainedButton';
import { useSelector, useDispatch } from "react-redux";
import { createComment } from './ApprovalDetailsSlice';
import { DateFormat, TimeFormat } from '../../../../utilities/DateTimeFormat';
import CancelApproval from '../cancel-approval-modal/CancelApproval';
import AddQuery from '../add-query-modal/AddQuery';
import RejectModal from '../reject-modal/RejectModal';
import ApproveModal from '../approve-modal/ApproveModal';
import SpinLoader from '../../../../components/SpinLoader';
import ErrorMsgAlert from '../../../../components/ErrorMsgAlert';
import SuccessMsgAlert from '../../../../components/SuccessMsgAlert';
import { approvalProperties } from '../../../../global/properties/Approval';
import ApprovalSummaryTable from '../summary-table/ApprovalSummaryTable';
import StickyFooter from '../../../../components/StickyFooter';


const StyledBreadCrumbBox = styled(Box)`
   & {
     margin-bottom:33.25px;
   }
 `;

const StyledBox = styled(Box)`
   & {
     border:1.5px solid #EBECF1;
     border-radius:20px 20px 0px 0px;
     box-sizing:border-box;
     padding:58.75px 50.75px 50.75px 50px;
   }
 `;

//Styling Approval Header
const HeaderContainer = styled(Box)`
   & {
     display:flex;
     flex-direction:row;
     justify-content:space-between;
     margin-bottom:42px;
   }
 `;

const TextContainer = styled(Box)`
   & {
     margin-right:5px;
     display:flex;
     flex-direction:column;
   }
 `;

const Header = styled(Typography)`
   & {
     font-size:17px;
     text-align:left;
     font-weight:600;
     color:#3F4449;
   }
 `;

const SubHeader = styled(Typography)`
   & {
     font-size:11px;
     text-align:left;
     font-weight:500;
     color:#3F4449;
   }
 `;


const StyledDivider = styled(Divider)`
   & {
     border-width:0 0 1.5px 0;
   }
 `;

//Styling Summary 
const SummaryContainer = styled(Box)`
   & {
     margin-top:44.67px;
   }
 `;

const SummaryTitle = styled(Typography)`
   & {
     text-align:left;
     font-size:14px;
     font-weight:600;
     color:#2C333A;
     margin-bottom:35.56px;
   }
 `;

//Styling Comments
const CommentsContainer = styled(Box)`
   & {
     margin-top:44.67px;
   }
 `;

const CommentsTitle = styled(Typography)`
   & {
     text-align:left;
     font-size:14px;
     font-weight:600;
     color:#2C333A;
     margin-bottom:15.58px;
   }
 `;

const CommentsBox = styled(Box)`
   & {
     border-radius:20px;
     background-color:#F8FAFB;
     border:1.5px solid #EBECF1;
     padding:84.42px 62.75px 0px 62.75px;
   }
 `;

const StyledTypography = styled(Typography)`
   & {
     text-align:center;
     font-size:14px;
     width:100%;
     height:100%;
     font-weight: 500;
     border-radius:20px;
     background-color:#F8FAFB;
     border:1.5px solid #EBECF1;
     padding:20px;
     color:#2C333A;
    
   }
 `;


//Styling add remarks
const StyledRemarksBox = styled(Box)`
   & {
     margin-bottom:50.82px;
     margin-top:-41px;
   }
 `;

const StyledOutlinedInput = styled(OutlinedInput)`
   & {
     padding:10px 48px 10px 40px;
     border-radius:0px 0px 20px 20px;
     font-size:14px;
     font-weight:500;
   }
  
 `;


//Styling buttons at footer
const ButtonBox = styled(Box)`
   & {
     display:flex;
     flex-direction:row;
     justify-content:flex-end;
     margin-bottom:31.25px;
   }
   & .css-rojgnp-MuiButtonBase-root-MuiButton-root {
     margin-right:30px;
   }
   & .css-1kwq4fa-MuiButtonBase-root-MuiButton-root {
     margin-right:30px;
   }

   & .disableBtn{
    box-sizing: border-box;
    height: 51.5px;
    width: 185.5px;
    border: 1.5px solid #C1C8D8;
    border-radius: 25px;
    background-color: #FFFFFF;
    color: #C1C8D8;
  font-family: Poppins;
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0;
  line-height: 21px;
  text-align: center;
  margin-right:30px;
   }
   & .approve{
    background: linear-gradient(135deg, #B2BEC3 0%, #A4B0BA 100%);
    color:#fff;
   }
 `;


function ArifDetails() {
  const approvalDetailsData = useSelector((state) => state.approvalDetails);
  const profileLOV = useSelector((state) => state.user);
  const addQueryData = useSelector((state) => state.AddQuery.addQuery);
  const rejectQueryData = useSelector((state) => state.rejectModal.rejectQuery);
  const approveData = useSelector((state) => state.approveModal.approveQuery);
  const [comments, setComments] = React.useState([])
  const [commentText, setCommentText] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [isError, setError] = React.useState(false);
  const [isSuccess, setSuccess] = React.useState(false);

  const approvalLabel = useApprovalLabel();
  let dispatch = useDispatch();

  // React.useEffect(()=>{
  //   dispatch(updateApprovalDetails);
  // })

  React.useEffect(() => {
    setComments(approvalDetailsData.data.comments);
  }, [approvalDetailsData.data.comments])

  const onSendClick = () => {

    if (!commentText) {
      setError(true);
      return
    }
    else {
      setLoading(true)
      setTimeout(() => {
        setLoading(false)
        dispatch(createComment({
          date: DateFormat(),
          status: approvalDetailsData.data.approvalHeader.status,
          statusColor: approvalDetailsData.data.approvalHeader.statusColor,
          roleId: profileLOV.roleId,
          roleName: (profileLOV.roleName === "product_manager" && approvalLabel.fieldsLabel.productManager) ||
            (profileLOV.roleName === "product_head" && approvalLabel.fieldsLabel.productHead) ||
            (profileLOV.roleName === "business_head" && approvalLabel.fieldsLabel.businessHead),
          commentText: commentText,
          time: TimeFormat()
        }));
        setCommentText("")
        setSuccess(true)
      }, 3000)
    }
    console.log("clicked");
  }

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

  // const handleSubmission = () => {
  //   if (!commentText) {
  //       setError(true);
  //       return
  //   }
  //   else {
  //       setLoading(true)
  //       setTimeout(() => {
  //           setLoading(false)
  //           setCommentText("")
  //           setSuccess(true)
  //       }, 6000)
  //   }
  // }


  return (
    <Box>
      {loading ? <SpinLoader /> : null}
      {isError ? <ErrorMsgAlert msgText={approvalProperties.errorRemarksMsg} click={handleClose} /> : null}
      {isSuccess ? <SuccessMsgAlert msgText={approvalProperties.successRemarksMsg} click={handleClose1} /> : null}

      <StyledBreadCrumbBox>
        <BreadCrumbs firstHeading="Approval  / " secondHeading="Approval Details" width="170px" left="110px" />
      </StyledBreadCrumbBox>
      <StyledBox mb={5}>
        {/* header section */}
        <HeaderContainer>
          <Grid container >
            <Grid item={12} xs={12} md={1.5}>
              {/* product type */}
              <TextContainer>
                <Header>
                  {approvalDetailsData.data.approvalHeader.productType}
                </Header>
                <SubHeader>
                  {approvalLabel.fieldsLabel.productType}
                </SubHeader>
              </TextContainer>
            </Grid>

            {/* cycle */}
            <Grid item={12} xs={12} md={4}>
              <TextContainer>
                <Header>
                  {approvalDetailsData.data.approvalHeader.cycle}
                </Header>
                <SubHeader>
                  {approvalLabel.fieldsLabel.cycle}
                </SubHeader>
              </TextContainer>
            </Grid>

            {/* status */}
            <Grid item={12} xs={12} md={2} align="left">
              <TextContainer >
                <Box>
                  <ReportStatusBox color={approvalDetailsData.data.approvalHeader.statusColor} text={approvalDetailsData.data.approvalHeader.status} />
                </Box>
                <SubHeader style={{ marginLeft: "10px" }}>
                  {approvalLabel.fieldsLabel.status}
                </SubHeader>
              </TextContainer>
            </Grid>
            {/* date */}
            <Grid item={12} xs={12} md={2.5}>
              <TextContainer>
                <Header>
                  {approvalDetailsData.data.approvalHeader.date}
                </Header>
                <SubHeader>
                  {approvalLabel.fieldsLabel.date}
                </SubHeader>
              </TextContainer>
            </Grid>

            <Grid item={12} xs={12} md={2}>
              {/* cancel approval */}
              {
                profileLOV.roleName === "product_manager" ?
                  ((approvalDetailsData.data.approvalHeader.status === "Approved" &&
                    <ContainedButton path="/reports" text={approvalLabel.fieldsLabel.cancelApproval} disable="true" backgroundImage="linear-gradient(135deg, #B2BEC3, #A4B0BA)" color="#fff" visibility="visible" />) ||
                    (approvalDetailsData.data.approvalHeader.status === "Cancelled" &&
                      <ContainedButton path="/reports" text={approvalLabel.fieldsLabel.cancelApproval} disable="true" backgroundImage="linear-gradient(135deg, #B2BEC3, #A4B0BA)" color="#fff" visibility="hidden" />) ||
                    (approvalDetailsData.data.approvalHeader.status === "Pending" && <CancelApproval width="168px" />)) :
                  (<ContainedButton path="/reports" text={approvalLabel.fieldsLabel.cancelApproval} disable="true" backgroundImage="linear-gradient(135deg, #B2BEC3, #A4B0BA)" color="#fff" visibility="hidden" />)
              }
            </Grid>
          </Grid>
        </HeaderContainer>

        <StyledDivider />

        {/* summary section */}
        <SummaryContainer>

          <SummaryTitle>{approvalLabel.summary.title}</SummaryTitle>
          {/* table */}
          <ApprovalSummaryTable />

        </SummaryContainer>

        {/* comments section */}
        <CommentsContainer>
          <CommentsTitle>{approvalLabel.fieldsLabel.comments}</CommentsTitle>
          {comments.length === 0 ? (<StyledTypography>{approvalLabel.messages.noCommentsYet}</StyledTypography>) :
            <CommentsBox>
              {comments.map((comment, i) => (
                <CommentHistory key={i} date={comment.date} status={comment.status} statusColor={comment.statusColor} roleName={comment.roleName} commentText={comment.commentText} time={comment.time} />
              ))}
            </CommentsBox>}
        </CommentsContainer>
      </StyledBox>

      {/* add remarks section */}
      {profileLOV.roleName === "product_manager" ? null :
        Object.keys(rejectQueryData).length == 0 && Object.keys(approveData).length == 0 ?
          <StyledRemarksBox >
            <FormControl variant="outlined" style={{ width: '100%' }}>
              <StyledOutlinedInput
                type='text'
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="add remarks"
                      edge="end"
                      onClick={onSendClick}
                    >
                      <RemarksIcon />
                    </IconButton>
                  </InputAdornment>
                }
                placeholder={approvalLabel.screenLables.addRemarks}
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
              />
            </FormControl>
          </StyledRemarksBox>
          :
          null
      }

      {
        profileLOV.roleName === "product_manager" ? null
          :
          (
            <ButtonBox>
              {
                Object.keys(addQueryData).length === 0 && Object.keys(rejectQueryData).length == 0 && Object.keys(approveData).length == 0 ?
                  <AddQuery />
                  :
                  <button className="disableBtn" disabled>{approvalLabel.fieldsLabel.addQuery}</button>
              }
              {
                Object.keys(rejectQueryData).length == 0 && Object.keys(approveData).length == 0 ?
                  <RejectModal />
                  :
                  <button className="disableBtn" disabled>{approvalLabel.fieldsLabel.reject}</button>
              }
              {
                Object.keys(rejectQueryData).length == 0 && Object.keys(approveData).length == 0 ?
                  <ApproveModal />
                  :
                  <button className="disableBtn approve" disabled>{approvalLabel.fieldsLabel.approve}</button>
              }
            </ButtonBox>
          )
      }

    </Box>
  )
}

export default arifDeatils;

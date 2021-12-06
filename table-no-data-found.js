
import React from 'react';
import {
    EnhancedTableHead,
} from "../report-details-table-dummy/ReportDetailsTable";
import {
    Box,
    Typography,
    Grid,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    Paper
} from "@mui/material";
import styled from "styled-components";
import { useSelector } from 'react-redux';
import ReportStatusBox from "../../../../components/ReportStatusBox";
import CommentModal from '../../../../components/CommentModal';
import useReportLabel from '../../../../global/labels/ReportLabels';

const MainContainer = styled(Box)`
     & {
       margin-bottom: 30px;
       padding: 0;
     },
     `;

const StyledTableContainer = styled(TableContainer)`
   & {
     box-shadow: 0px 0px;
     overflow-x: hidden;
   }
 `;

const StyledTableBody = styled(TableBody)`
   & {
     border: 1.5px solid #ebecf1;
     color: #2c333a;
     font-size: 14px;
 
     @media (max-width: 1000px) {
       font-size: 12px;
     }
   }
 `;

const StyledTableCell = styled(TableCell)`
   & {
     font-weight: 600;
     box-sizing: border-box;
     padding: 15px 20px;
   }
   & .viewComments{
     color: #CA0000;
      font-weight:500;
      text-decoration:underline;
   }
 `;

const StyledTableRow = styled(TableRow)`
   &:nth-of-type(odd) {
     background-color: #f8fafb;
   }
 `;
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


const headCells = [
    {
        id: "date",
        label: "Date",
        sorting: false,
    },
    {
        id: "assignedTo",
        label: "Assigned To",
        sorting: false,
    },
    {
        id: "status",
        label: "Status",
        sorting: false,
    },
    {
        id: "comments",
        label: "Comments",
        sorting: false,
    },

];

function IterationDetails(props) {
    // const iterationData = useSelector((state) => state.feedbackIterationDetails.IterationDetails);
    const iterationData = useSelector((state) => state.feedbackPanelDetails.comments);
    const reportLabel = useReportLabel();
    return (
        <MainContainer>
            <Grid container mt={3}>
                <Grid item xs={12}>
                    {
                        Array.isArray(iterationData) && iterationData.length === 0 ?
                            <>
                                <Grid container >
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
                            <StyledTableContainer component={Paper}>
                                <Table aria-label="customized table">
                                    <EnhancedTableHead
                                        headerColumns={headCells}
                                    />
                                    <StyledTableBody>
                                        {
                                            iterationData?.map((item, i) => {
                                                return <StyledTableRow key={i}>
                                                    <StyledTableCell align="left">{item?.date}</StyledTableCell>
                                                    <StyledTableCell align="left">{item?.assignedTo}</StyledTableCell>
                                                    <StyledTableCell align="left">
                                                        <ReportStatusBox color={item?.statusID} text={item?.status} />
                                                    </StyledTableCell>
                                                    <StyledTableCell align="left">
                                                        <CommentModal viewComments={item?.comments} />
                                                    </StyledTableCell>
                                                </StyledTableRow>
                                            })
                                        }

                                    </StyledTableBody>
                                </Table>
                            </StyledTableContainer>

                    }



                </Grid>
            </Grid>

        </MainContainer>
    );
}

export default IterationDetails;


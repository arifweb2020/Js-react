/**
 * Component to design and create approval page.
 * Author : Arif
 */
import React, { useState } from 'react';
import {
    Box,
    Grid,
    Typography,
    FormControl,
    Select,
    MenuItem,
    TextareaAutosize,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    Paper,
    Alert,
    Snackbar,
    CircularProgress,
} from "@mui/material";
import styled from "styled-components";
import BreadCrumbs from '../../../../components/BreadCrumbs';
import { UserProfileCaret } from "../../../../assets/icons/NavIcons";
import { EnhancedTableHead } from '../../report/report-details-table-dummy/ReportDetailsTable';
import useApprovalLabel from '../../../../global/lables/ApprovalLabels';

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

    & .inputFiledText{
        box-sizing: border-box;
height: 46.03px;
border: 1.5px solid #EBECF1;
border-radius: 5px;
background-color: #F8FAFB;
color: #2C333A;
  font-family: Poppins;
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 0;
  line-height: 21px;
  padding:2px 0 0 20px;
    }
    & .inputFiledText:hover{
        border:2px solid #d53434;
        outline:none;
    }
    & .inputFiledText:focus{
        border:2px solid #d53434;
        outline:none;
    }
    `

const InputLabel = styled(Typography)`
    opacity: 0.5;
    color: #2C333A;
    font-family: Poppins;
    font-size: 12px;
    font-weight: 500;
    letter-spacing: 0;
    line-height: 18px;
    margin-bottom:9px;
    `
const StyledSelect = styled(Select)`
  & {
    box-sizing: border-box;
    border: 0px solid #ebecf1;
    border-radius: 5px;
    padding-right: 10px;
    height: 46.03px;
  }
  & .MuiSelect-select {
    box-sizing: border-box;
    border: 0px solid blue;
    border-radius: 5px;
    height: 46.03px;
    font-size: 14px;
    font-weight: 500;
    padding: 10px 15px;
    text-align: left;
    color: #2c333a;
  }
  & .iconStyle{
    position: absolute;
    left: 92%;
  }
`;

const StyledMenuItem = styled(MenuItem)`
  & {
    font-size: 14px;
    font-weight: 500;
    color: #2c333a;
  }
`;

const InputHedaing = styled(Typography)`
 height: 20px;
 color: #2C333A;
 font-family: Poppins;
 font-size: 14px;
 font-weight: 500;
 letter-spacing: 0;
 line-height: 21px;
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

   &:hover{
    border:2px solid #d53434;
    outline:none;
}
&:focus{
    border:2px solid #d53434;
    outline:none;
}
 `

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

`;

const StyledTableRow = styled(TableRow)`
  &:nth-of-type(odd) {
    background-color: #f8fafb;
  }
`;

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
    &:hover,
    &:focus {
        background:#B90015;
        color:#fff;
        border:1.75px solid #B90015;
    }
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
   &:hover,
   &:focus {
       background:#FFF;
       color:#B90015;
       border:1.75px solid #B90015;
   }
}


@media (max-width:667px){
   & .btn{
       width:100px;
   }
}
 
`


const dropDownData = {
    productType: [
        {
            id: 100,
            title: "BIL",
            code: "BIL",
            selected: true,
        },
        {
            id: 101,
            title: "PL",
            code: "PL",
            selected: false,
        },
        {
            id: 102,
            title: "LAP",
            code: "LAP",
            selected: false,
        },
    ],
}

const headCells = [
    {
        id: "title1",
        label: "Title1",
        sorting: false,
    },
    {
        id: "title2",
        label: "Title2",
        sorting: false,
    },
    {
        id: "title3",
        label: "Title3",
        sorting: false,
    },
    {
        id: "title4",
        label: "Title4",
        sorting: false,
    },
    {
        id: "title5",
        label: "Title5",
        sorting: false,
    },

];

const dataList = [
    {
        id: "01",
        title1: "loerum ipsum",
        title2: "loerum ipsum",
        title3: "loerum ipsum",
        title4: "loerum ipsum",
        title5: "loerum ipsum",

    },
    {
        id: "02",
        title1: "loerum ipsum",
        title2: "loerum ipsum",
        title3: "loerum ipsum",
        title4: "loerum ipsum",
        title5: "loerum ipsum",

    },
    {
        id: "03",
        title1: "loerum ipsum",
        title2: "loerum ipsum",
        title3: "loerum ipsum",
        title4: "loerum ipsum",
        title5: "loerum ipsum",

    },


];



function CreateApproval(props) {
    const [product, setProduct] = React.useState(
        dropDownData.productType.filter((ele) => ele.selected === true)[0].code
    );
    const [date, setDate] = useState("")
    const [productHead, setProductHead] = useState("")
    const [immanual, setImmanual] = useState("")
    const [comments, setComments] = useState("")
    const approvalLabel = useApprovalLabel();
    const [alert, setAlert] = useState(false);
    const [isLoading, setLoading] = useState(false);

    const handleChange = (event) => {
        setProduct(event.target.value);
    }

    const handleClose = (reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setAlert(false);
    };

    /**
        * 
        * @returns to create approval page form submission
        */
    // API CALL
    const handleSubmission = async () => {
        if (!comments || !productHead || !date || !immanual) {
            setAlert(true);
            return
        }
        else{
            setLoading(true); 
        }
        await fetch(
            'API_URL',
            {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    product,
                    date,
                    productHead,
                    immanual,
                    comments
                })
            }
        )
            .then((response) => response.json())
            .then((result) => {
                console.log('Success:', result);
                window.alert("data save succesfully")
            })
            .catch((error) => {
                console.error('Error:', error);
                window.alert("something went wrong")
                setLoading(false)
            });
    };

    const resetForm = () => {
        setProduct(dropDownData.productType.filter((ele) => ele.selected === true)[0].code) || setDate("") || setProductHead("") || setImmanual("") || setComments("")
    }

    return (
        <MainContainer>
            {alert ?
                <Snackbar open={alert} onClose={handleClose} autoHideDuration={4000} anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right'
                }}>
                    <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                        please enter all fields.
                    </Alert>
                </Snackbar>
                : null}
            <Grid container >
                <Grid item xs={12} >
                    <BreadCrumbs firstHeading="Approval  / " secondHeading="Create Approval" width="168px" left="113px" />
                </Grid>
            </Grid>
            <InnerConatiner mt={6}>
                <Box p={4}>
                    <Grid container >
                        <Grid item xs={12} sm={6} md={5}>
                            <InputLabel>{approvalLabel.fieldsLabel.selectPrd}</InputLabel>
                            <FormControl sx={{ width: '100%' }}>
                                <StyledSelect
                                    value={product}
                                    onChange={handleChange}
                                    displayEmpty
                                    inputProps={{ "aria-label": "Without label" }}
                                    IconComponent={(props) => (
                                        <UserProfileCaret {...props} className="iconStyle" />
                                    )}
                                >
                                    {dropDownData.productType.map((prod, i) => (
                                        <StyledMenuItem key={prod.code} value={prod.code}>
                                            {prod.title}
                                        </StyledMenuItem>
                                    ))}
                                </StyledSelect>
                            </FormControl>
                        </Grid>

                        <Grid item xs={12} sm={6} md={3} ml={3}>
                            <InputLabel>{approvalLabel.fieldsLabel.period}</InputLabel>
                            <FormControl sx={{ width: '100%' }}>
                                <input type="date" className="inputFiledText"
                                    onChange={(e) => {
                                        setDate(e.target.value);
                                    }}
                                    value={date}
                                />
                            </FormControl>
                        </Grid>
                    </Grid>
                    <Grid container mt={6}>
                        <Grid item xs={12} sm={6} md={5}>
                            <InputLabel>{approvalLabel.fieldsLabel.prdHead}</InputLabel>
                            <FormControl sx={{ width: '100%' }}>
                                <input type="text" className="inputFiledText"
                                    onChange={(e) => {
                                        setProductHead(e.target.value);
                                    }}
                                    value={productHead}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6} md={5} ml={3}>
                            <InputLabel>{approvalLabel.fieldsLabel.deninImmanual}</InputLabel>
                            <FormControl sx={{ width: '100%' }}>
                                <input type="text" className="inputFiledText"
                                    onChange={(e) => {
                                        setImmanual(e.target.value);
                                    }}
                                    value={immanual}
                                    required={true}
                                />
                            </FormControl>
                        </Grid>
                    </Grid>

                    <Grid container mt={5}>
                        <Grid item xs={12}>
                            <InputHedaing mb={3}>{approvalLabel.fieldsLabel.summary}</InputHedaing>
                            <StyledTableContainer component={Paper} >
                                <Table aria-label="customized table">
                                    <EnhancedTableHead
                                        headerColumns={headCells}
                                    />
                                    <StyledTableBody>
                                        {
                                            dataList?.map((item, i) => {
                                                return <StyledTableRow key={i}>
                                                    <StyledTableCell align="left">{item?.title1}</StyledTableCell>
                                                    <StyledTableCell align="left">{item?.title2}</StyledTableCell>
                                                    <StyledTableCell align="left">
                                                        {item?.title3}
                                                    </StyledTableCell>
                                                    <StyledTableCell align="left">
                                                        {item?.title4}
                                                    </StyledTableCell>
                                                    <StyledTableCell align="left">
                                                        {item?.title5}
                                                    </StyledTableCell>
                                                </StyledTableRow>
                                            })
                                        }
                                    </StyledTableBody>
                                </Table>
                            </StyledTableContainer>
                        </Grid>
                    </Grid>

                    <Grid container mt={4}>
                        <Grid item xs={12}>
                            <InputHedaing>{approvalLabel.fieldsLabel.comments}</InputHedaing>
                            <TextArea
                                aria-label="Type Your Comments"
                                placeholder={approvalLabel.fieldsLabel.commentsPlaceHolder}
                                type="text"
                                onChange={(e) => {
                                    setComments(e.target.value);
                                }}
                                value={comments}
                            />
                        </Grid>
                    </Grid>
                    <Grid container mt={6}>
                        <Grid item xs={12}>
                            <ButtonBox>
                                <button className="btn btn-cancel" onClick={resetForm}>{approvalLabel.fieldsLabel.cancel}</button>
                                {/* <button className="btn btn-submit btn-active"
                                    // API CALL onClick={handleSubmission}
                                    onClick={handleSubmission}
                                >{approvalLabel.fieldsLabel.create}</button> */}
                                {!isLoading && (
                                    <button className="btn btn-submit btn-active" onClick={handleSubmission}>
                                        {approvalLabel.fieldsLabel.create}
                                    </button>
                                )}
                                {isLoading && (
                                    <button className="btn btn-submit" >
                                        <CircularProgress color="success" /> <span style={{position:'relative',top:'-13px'}}>{approvalLabel.fieldsLabel.create}....</span>
                                    </button>
                                )}
                            </ButtonBox>
                        </Grid>
                    </Grid>

                </Box>
            </InnerConatiner>
        </MainContainer>
    );
}

export default CreateApproval;

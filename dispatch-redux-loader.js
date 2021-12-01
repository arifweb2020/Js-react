
import React, { useState, useEffect } from 'react';
import {
    Box,
    Grid,
    Typography,
    FormControl,
    Select,
    MenuItem,
} from "@mui/material";
import styled from "styled-components";
import BreadCrumbs from '../../../../components/BreadCrumbs';
import { UserProfileCaret } from "../../../../assets/icons/NavIcons";
import useApprovalLabel from '../../../../global/lables/ApprovalLabels';
import SpinLoader from '../../../../components/SpinLoader';
import { CalendarIcon } from '../../../../assets/icons/ApprovalIcons'
import { approvalProperties } from '../../../../global/properties/Approval';
import CommentBox from '../../../../components/CommentBox';
import CancelButton from '../../../../components/CancelButton';
import SubmitButton from '../../../../components/SubmitButton';
import ApprovalSummaryTable from '../summary-table/ApprovalSummaryTable';
import ErrorMsgAlert from '../../../../components/ErrorMsgAlert';
import SuccessMsgAlert from '../../../../components/SuccessMsgAlert';
import { useSelector, useDispatch } from 'react-redux';
//import { updateCreateApproval } from './CreateApprovalSlice';


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
    & .dateField{
        background:#fff;
        width:249px;
    }
    & .inputFiledText:hover{
        border:2px solid #d53434;
        outline:none;
    }
    & .inputFiledText:focus{
        border:2px solid #d53434;
        outline:none;
    }
    & .CalendarIcon{
        position: relative;
    top: -34px;
    left: 212px;
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

const ButtonBox = styled(Box)`
 display: flex;
 justify-content: flex-end;
`

const dropDownData = {
    productType: [
        {
            id: 101,
            title: "BIL",
            code: "BIL",
            selected: true,
        },
        {
            id: 102,
            title: "PL",
            code: "PL",
            selected: false,
        },
        {
            id: 103,
            title: "LAP",
            code: "LAP",
            selected: false,
        },
    ],
}

function aaaa(props) {

    const data = useSelector((state) => state.createApproval.createApproval);
    const dispatch = useDispatch();
    const [product, setProduct] = React.useState(
        dropDownData.productType.filter((ele) => ele.selected === true)[0].code
    );
    const [year, setYear] = useState("")
    const [mnths, setmnths] = useState([])
    const [date, setDate] = useState("")
    const [comments, setComments] = useState("")
    const approvalLabel = useApprovalLabel();
    const [loading, setLoading] = useState(false)
    const [isError, setError] = useState(false);
    const [isSuccess, setSuccess] = useState(false);

    const handleChange = (event) => {
        setProduct(event.target.value);
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


    /**
        * 
        * @returns to create approval page form submission
        */
    // API CALL
    // const handleSubmission = async () => {
    //     if (!comments) {
    //         setAlert(true);
    //         return
    //     }
    //     else {
    //         setLoading(true);
    //         await fetch(
    //             'API_URL',
    //             {
    //                 method: 'PUT',
    //                 headers: {
    //                     "Content-Type": "application/json",
    //                 },
    //                 body: JSON.stringify({
    //                     product,
    //                     date,
    //                     comments
    //                 })
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

    const handleSubmission = () => {
        if (!comments) {
            setError(true);
            return
        }
        else {
            setLoading(true)
            setTimeout(() => {
                setLoading(false)
                setComments("")
                setSuccess(true)
            }, 6000)
        }
    }


    /**
     * Dispatch functionality for create approval
     */
    // const handleSubmission = (e) => {
    //     e.preventDefault();
    //     if (!comments) {
    //         setError(true);
    //         return
    //     }
    //     else {
    //         setLoading(true)
    //         setTimeout(() => {
    //             const new_approval = {
    //                 id: "01",
    //                 product: product,
    //                 date: mnths,
    //                 productHead: "Samual Kurien",
    //                 businessHead: "Denin Immanual",
    //                 comments: comments,
    //             };
    //             setLoading(false)
    //             dispatch(updateCreateApproval(new_approval));
    //             setComments("")
    //             setSuccess(true)
    //         }, 6000)
    //     }
    // };

    const resetForm = () => {
        setProduct(dropDownData.productType.filter((ele) => ele.selected === true)[0].code) || setDate("") || setComments("")
    }

    useEffect(() => {
        displayMonths();
        displayYears();
    }, [])

    const displayMonths = () => {
        const months = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December"
        ]
        const d = new Date();
        let month = d.getMonth();
        const newMonths = months.slice(10, month + 1)
        setmnths(newMonths);
    }

    const displayYears = () => {
        const d = new Date();
        let year = d.getFullYear();
        setYear(year)
    }

    const handleOnChange = (e) => {
        setComments(e.target.value);
    }

    return (
        <MainContainer>

            {loading ? <SpinLoader /> : null}
            {isError ? <ErrorMsgAlert msgText={approvalProperties.errorMsg} click={handleClose} /> : null}
            {isSuccess ? <SuccessMsgAlert msgText={approvalProperties.successMsg} click={handleClose1} /> : null}

            <Grid container >
                <Grid item xs={12} >
                    <BreadCrumbs firstHeading="Approval  / " secondHeading="Create Approval" width="168px" left="113px" />
                </Grid>
            </Grid>
            <InnerConatiner mt={6}>
                <Box p={4}>
                    <Grid container >
                        <Grid item xs={12} sm={6} md={5}>
                            <InputLabel>{approvalLabel.fieldsLabel.productType}</InputLabel>
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
                                <StyledSelect
                                    value={date}
                                    onChange={(e) => { setDate(e.target.value) }}
                                    displayEmpty
                                    inputProps={{ "aria-label": "Without label" }}
                                    IconComponent={(props) => (
                                        <CalendarIcon {...props} className="iconStyle" />
                                    )}
                                >
                                    {mnths.map((month, i) => (
                                        <StyledMenuItem key={i} value={i === 1 ? "" : i}>
                                            {month} {year}
                                        </StyledMenuItem>
                                    ))}
                                </StyledSelect>
                            </FormControl>
                        </Grid>
                    </Grid>
                    <Grid container mt={5}>
                        <Grid item xs={12} sm={6} md={5}>
                            <InputLabel>{approvalLabel.fieldsLabel.productHead}</InputLabel>
                            <FormControl sx={{ width: '100%' }}>
                                <input type="text" className="inputFiledText"
                                    value={data.productHead}
                                    disabled
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6} md={5} ml={3}>
                            <InputLabel>{approvalLabel.fieldsLabel.businessHead}</InputLabel>
                            <FormControl sx={{ width: '100%' }}>
                                <input type="text" className="inputFiledText"
                                    value={data.businessHead}
                                    disabled
                                />
                            </FormControl>
                        </Grid>
                    </Grid>

                    <Grid container mt={5}>
                        <Grid item xs={12}>
                            <InputHedaing mb={3}>{approvalLabel.fieldsLabel.summary}</InputHedaing>
                            <ApprovalSummaryTable />
                        </Grid>
                    </Grid>

                    <Grid container mt={4}>
                        <Grid item xs={12}>
                            <InputHedaing>{approvalLabel.fieldsLabel.comments}</InputHedaing>
                            <CommentBox
                                placeholder={approvalLabel.fieldsLabel.commentsPlaceHolder}
                                value={comments}
                                onchange={handleOnChange}
                            />
                        </Grid>
                    </Grid>
                    <Grid container mt={6}>
                        <Grid item xs={12}>
                            <ButtonBox>
                                <CancelButton click={resetForm} text={approvalLabel.fieldsLabel.cancel} />
                                <SubmitButton click={handleSubmission} text={approvalLabel.fieldsLabel.create} />
                            </ButtonBox>
                        </Grid>
                    </Grid>
                </Box>
            </InnerConatiner>
        </MainContainer>
    );
}

export default aaaa;

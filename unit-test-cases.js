
import {resetForm,formSubmission,sum} from './Dashboards'

describe('form update', () => {

it("when a & b is number", ()=>{
const result = sum(1,2);

//result
expect(result).toBe(3)
})


it("when click on cancel button it reset form", ()=>{

const result = resetForm({
file:"dashboard.csv",
comments:"two things are pending"
});

//result
expect(result).toBe({
file:"",
comments:""
})
})

it("when we submit form", ()=>{
const result = formSubmission({
file:"",
comments:""
});

//result
expect(result).toBe({
file:"dashboard.csv",
comments:"two things are pending"
})
})

it("when we submit form and any of the filed is missing", ()=>{
const result = formSubmission({
file:"dashboard.csv",
comments:""
});

//result
expect(result).toBe({
file:"",
comments:""
})
})
})


// test case for redux

/**
 * unit test case
 */
import updatefeedbackReportDataReducer, { updatefeedbackReportData } from './FeedbackReportSlice';

describe('feedbackReport reducer', () => {
    const initialState = {
        totalRecords: {
            title: "Total Records",
            count: 500,
        },
        approvedRecords: {
            title: "Approved Records",
            count: 500,
        },
        issueRecords: {
            title: "Records with Issue",
            count: 500,
        }
    }

    it('should update the uploaded data in file', () => {
        expect(updatefeedbackReportDataReducer(undefined, { type: 'unknown' })).toEqual(
            {
                totalRecords: {
                    title: "Total Records",
                    count: 500,
                },
                approvedRecords: {
                    title: "Approved Records",
                    count: 500,
                },
                issueRecords: {
                    title: "Records with Issue",
                    count: 500,
                }
            }
        );
    });

    it('should handle uploaded data in file', () => {
        const actual = updatefeedbackReportDataReducer(initialState, updatefeedbackReportData({
            totalRecords: {
                title: "Total Records",
                count: 500,
            },
            approvedRecords: {
                title: "Approved Records",
                count: 500,
            },
            issueRecords: {
                title: "Records with Issue",
                count: 500,
            }

        }));
        expect(actual).toEqual(
            {
                totalRecords: {
                    title: "Total Records",
                    count: 500,
                },
                approvedRecords: {
                    title: "Approved Records",
                    count: 500,
                },
                issueRecords: {
                    title: "Records with Issue",
                    count: 500,
                }
            }
        );
    });

})

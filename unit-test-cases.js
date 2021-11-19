import {resetForm,formSubmission,sum} from './Dashboards'

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


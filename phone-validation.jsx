import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
  
const App = () => {
  const [mobile, setmobile] = useState("");
  const [isError, setIsError] = useState(false);
  
  return (
    <div
      style={{
        marginLeft: "40%",
      }}
    >
      <h2>Validate Mobile number length in ReactJS?</h2>
      <TextField
        type="tel"
        error={isError}
        value={mobile}
        label="Enter Phone Number"
        onChange={(e) => {
          setmobile(e.target.value);
          if (e.target.value.length > 10) {
            setIsError(true);
          }
        }}
        InputProps={{
          startAdornment: <InputAdornment position="start">
             +91
             </InputAdornment>,
        }}
      />
      <h3>Your Mobile Number is: +91 {mobile} </h3>
    </div>
  );
};
  
export default App;

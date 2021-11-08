import React, {useEffect, useState} from "react";

export default function MyTable() {
  
  //usestate hook
  let [data, setData] = useState([]);
  const [select, setselect] = useState('');

  //custom data
  var dataa = [{ id: 1, name: 'Mike', city: 'philps', state: 'New York' }, 
  { id: 2, name: 'Steve', city: 'Square', state: 'Chicago' }, 
  { id: 3, name: 'Jhon', city: 'market', state: 'New York' }, 
  { id: 4, name: 'philps', city: 'booket', state: 'Texas' }, 
  { id: 5, name: 'smith', city: 'brookfield', state: 'Florida' }, 
  { id: 6, name: 'Broom', city: 'old street', state: 'Florida' }];

  //Select onchage function, getting option selected value and save inside state variable
  function handleChange (e){

    //set state variable with option value
    setselect(e.target.value);
   
  };
  
 
  //hooks calls after rendering select state
  useEffect(() => {
    //Doing filteration on according to select state option
    data = dataa.filter(dataa => dataa.state !== select);

    //set state variable data after filteration
    setData(data);
    }, [select])

  //output  
  return (
    <div className="app container p-5">
      <h1 className="text-center mb-5">Reactjs Data Table with Custom Filters Using Hooks useEffect useState</h1>
      <div class="mb-3">
         <label class="form-label">Exclude States Filter</label>
           <select id="state"
             onChange={handleChange} class="form-select mb-5">
                <option value="select Grade">  Exclude State  </option>
                <option value="New York">New York</option>
                <option value="Florida">Florida</option>
               
            </select>
      </div>
      <table class="table table-hover table-bordered p-5">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Name</th>
            <th scope="col">City</th>
            <th scope="col">State</th>
          </tr>
        </thead>
        <tbody>
        { // calling state variable data to filter data inside table
        data.map(function({id, name, city, state}){
         
              return (
                <tr>
               
                <td>{id}</td>
                <td>{name}</td>
                <td>{city}</td>
                <td>{state}</td>
              </tr>
                );
            })}

            
            </tbody>
            </table>
            
       </div>
  );
}

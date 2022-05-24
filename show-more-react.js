// 1st way

import React, { useState } from 'react'

function Stacks() {
    const [itemsToShow, setItemsToShow] = useState(3);

    const cars = [
      { "name" : "Audi", "country" : "Germany"},
      { "name" : "BMW", "country" : "Germany" },
      { "name" : "Chevrolet", "country" : "USA" },
      { "name" : "Citroen", "country" : "France" },
      { "name" : "Hyundai", "country" : "South Korea" },
      { "name" : "Mercedes-Benz", "country" : "Germany" },
      { "name" : "Renault", "country" : "France" },
      { "name" : "Seat", "country" : "Spain" },
    ];

    const showmore = () => {
        setItemsToShow(cars.length)
    }

    const showless = () => {
        setItemsToShow(3)
    }

    return (
        <div>
            {cars.slice(0, itemsToShow).map((car, index) => <li key={index}>{car.name} - {car.country} </li>)}
            {(itemsToShow === 3) ? <button onClick={showmore}>Show More</button>: <button onClick={showless}>Show Less</button>}
        </div>
    )
}


// 2nd way

import { useState } from "react";

  function App() {
    // const [state, setstate] = useState(initialState) // this is how it initially is
    const [data, setData] = useState({
      cars: [
        { name: "Audi", country: "Germany" },
        { name: "BMW", country: "Germany" },
        { name: "Chevrolet", country: "USA" },
        { name: "Citroen", country: "France" },
        { name: "Hyundai", country: "South Korea" },
        { name: "Mercedes-Benz", country: "Germany" },
        { name: "Renault", country: "France" },
        { name: "Seat", country: "Spain" },
      ],
      itemsToShow: 3,
    }); // i named it data youcan name it whatever suits you

    const showMore = () => {
      data.itemsToShow === 3
        ? // ...data is a spread of the state, that means have all the data and change that
          // particular one, in that case  "itemsToShow"
          setData({ ...data, itemsToShow: data.cars.length })
        : setData({ itemsToShow: 3 });
    };

    return (
      <div className="container">
        <h3>Click show more to see more data</h3>
        <div className="row">
          <h3>List of Cars</h3>
          <ul>
            {data.cars.slice(0, data.itemsToShow).map((car, i) => (
              <li key={i}>
                {car.name} - {car.country}
              </li>
            ))}
          </ul>
        </div>
        // if the items you want to show are equal to the legth of your car list
        then hide the button
        {data.itemsToShow < data.cars.length && (
          <button onClick={showMore}>Show more</button>
        )}
      </div>
    );
  }
  
  // 3rd way
  
  https://chayanit-chaisri.medium.com/react-create-a-show-more-less-button-aa0e9cd0f927

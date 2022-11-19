import React from "react";

export const Form = () => {
  const handleAdd = async (e) => {
    e.preventDefault();
    const product = { title, price, img };
    const response = await fetch("http://localhost:4000/api/items", {
      method: "POST",
      body: JSON.stringify(product),
      headers: {
        "Content-Type": "aplication/json",
      },
    });

    const json = await response.json()
    if(!response.ok){
        console.log(json.error)
    }
    if(response.ok){
        console.log(json.error)
        //refresh state
    }

  };
  return <div>Form</div>;
};

import React from "react";

function Precaution(props) {

  var divStyle={
    color: "#012021",
    textAlign: "left",
    // width: "content-wrap",
    display: "table",
    margin: "100px auto",
    height: "auto",
    backgroundColor: "#fff",
    padding: "50",
    borderRadius: "8px",
    boxShadow: "0 10px 15px #063f57"
  }

  var headerStyle={
    backgroundColor: ""
  }

   props.title==="Precautions"?headerStyle.backgroundColor="#cca106":headerStyle.backgroundColor="#07661d"

  const listItems = props.list.map((item) =>
    <li style={{padding: "2px"}} key={item}>{item}</li>
  );
  return (
    <div style={{position: "relative"}}>
    <div style={divStyle} className="">
      <h1 style={headerStyle} className="header">{props.title}</h1>
      <ul style={{listStyle: "none"}}>{listItems}</ul>
    </div>
    </div>
  );
}

export default Precaution;

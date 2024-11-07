import React from "react";
import { Outlet } from "react-router-dom";

function StartPage() {
  return (
    <div>
      <h1 className="text-xl"> siddharth</h1> // why this id not rendering 
      {Outlet}
    </div>
  );
}
export default StartPage;

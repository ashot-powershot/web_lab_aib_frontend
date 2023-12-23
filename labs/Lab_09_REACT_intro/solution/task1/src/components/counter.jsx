import React, { useState } from "react";

const Count = () => {
  const [count, setCount] = useState(0);

  const formatCount = () => {
    return count === 0 ? "Empty" : count;
  };
  const getBageClasses = () => {
    let classes = "badge text-light m-2 rounded-pill ";
    classes += count === 0 ? "bg-warning" : "bg-primary";
    return classes;
  };

  const handleIncrement = () => {
    setCount((prevState) => prevState + 1);
    console.log(count);
  };

  const handleDecrement = () => {
    setCount((prevState) => prevState - 1);
    console.log(count);
  };

  return (
    <>
      <div className="d-flex flex-column align-items-center text-bg-dark rounded-pill py-2 shadow">
        <h2>
          <span className={getBageClasses()}>{formatCount()}</span>
        </h2>
        <div class="p-2">
          <button
            className="btn btn-outline-primary btn-lg m-2 text-light"
            onClick={handleDecrement}
          >
            -
          </button>
          <button
            className="btn btn-outline-primary btn-lg m-2 text-light"
            onClick={handleIncrement}
          >
            +
          </button>
        </div>
      </div>
    </>
  );
};

export default Count;

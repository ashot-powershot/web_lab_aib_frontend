import React from "react";

function Display({ today, prevHandler, curHandler, nextHandler }) {
  const monthsInRussian = [
    "Январь",
    "Февраль",
    "Март",
    "Апрель",
    "Май",
    "Июнь",
    "Июль",
    "Август",
    "Сентябрь",
    "Октябрь",
    "Ноябрь",
    "Декабрь",
  ];

  return (
    <div className="d-flex justify-content-between bg-dark text-light p-3">
      <div>
        <h3>{monthsInRussian[today.month()]}</h3>
        <span className="bg-warning rounded p-1">{today.format("YYYY")}</span>
      </div>
      <div className="d-flex align-items-center">
        <button className="btn btn-secondary mr-2" onClick={prevHandler}>
          &lt;
        </button>
        <button className="btn btn-secondary mr-2" onClick={curHandler}>
          Сегодня
        </button>
        <button className="btn btn-secondary" onClick={nextHandler}>
          &gt;
        </button>
      </div>
    </div>
  );
}

export { Display };

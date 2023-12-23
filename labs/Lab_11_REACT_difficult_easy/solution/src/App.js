import React, { useState } from "react";
import moment from "moment";
import { Display } from "./components/Display";
import { Calendar } from "./components/Calendar";
import { Developments } from "./components/Developments";

function App() {
  const [events, setEvents] = useState([]);
  const [event, setEvent] = useState();
  const [isShowForm, setShowForm] = useState(false);
  const [method, setMethod] = useState(null);
  moment.updateLocale("ru", { week: { dow: 1 } });
  const [today, setToday] = useState(moment());
  const startDay = today.clone().startOf("month").startOf("week");

  const prevHandler = () =>
    setToday((prev) => prev.clone().subtract(1, "month"));
  const curHandler = () => setToday(moment());
  const nextHandler = () => setToday((prev) => prev.clone().add(1, "month"));

  const openFormHandler = (method, event) => {
    setShowForm(true);
    method === "Создать" ? setToday(event) : setEvent(event);
    setMethod(method);
  };

  const cancelButtonHandler = () => {
    setShowForm(false);
    setEvent(null);
  };

  const changeEventHandler = (text, field) => {
    if (method === "") {
      setEvent((prevState) => ({ ...prevState, [field]: text }));
    } else {
      setEvent((prev) => ({
        ...prev,
        [field]: text,
        date: today.format("X"),
        id: moment().format("X"),
      }));
    }
  };

  const eventAddHandler = () => {
    if (method === "Update") {
      setEvents((prevEvents) =>
        prevEvents.map((e) =>
          e.id === event.id
            ? { ...e, title: event.title, description: event.description }
            : e
        )
      );
    } else {
      setEvents([
        ...events,
        { ...event, date: today.format("X"), id: moment().format("X") },
      ]);
    }
    setShowForm(false);
  };

  const removeEventHandler = () => {
    setEvents((prevEvents) => prevEvents.filter((e) => e.id !== event.id));
    setShowForm(false);
  };

  return (
    <>
      {isShowForm && (
        <div className="position-absolute w-100 h-100 d-flex align-items-center justify-content-center">
          <div className="p-4 bg-dark text-light">
            <input
              className="form-control mb-2"
              value={event ? event.title : ""}
              onChange={(e) => changeEventHandler(e.target.value, "title")}
              placeholder="Название"
            />
            <textarea
              className="form-control mb-2"
              value={event ? event.description : ""}
              onChange={(e) =>
                changeEventHandler(e.target.value, "description")
              }
              placeholder="Описание"
            />
            <div className="d-flex justify-content-end">
              <button
                className="btn btn-secondary mr-2"
                onClick={cancelButtonHandler}
              >
                Отмена
              </button>
              <button className="btn btn-primary" onClick={eventAddHandler}>
                {method}
              </button>
              {method === "Update" && (
                <button
                  className="btn btn-danger ml-2"
                  onClick={removeEventHandler}
                >
                  Удалить
                </button>
              )}
            </div>
          </div>
        </div>
      )}
      <div className="border border-dark rounded p-3">
        <Developments />
        <Display
          today={today}
          prevHandler={prevHandler}
          curHandler={curHandler}
          nextHandler={nextHandler}
        />
        <Calendar
          startDay={startDay}
          today={today}
          events={events}
          openFormHandler={openFormHandler}
        />
      </div>
    </>
  );
}

export default App;

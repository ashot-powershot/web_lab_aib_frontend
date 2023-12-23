import React from "react";
import moment from "moment";
import "moment/locale/ru";
import styled from "styled-components";

const GridWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-gap: 1px;
  background-color: ${(props) => (props.isHeader ? "#1e1f21" : "#404040")};
  ${(props) => props.isHeader && "border-bottom:1px solid #404040 "};
`;

const CellWrapper = styled.div`
  min-width: 140px;
  min-height: ${(props) => (props.isHeader ? "24px" : "80px")};
  background-color: ${(props) => (props.isWeekend ? "#272829" : "#1e1f21")};
  color: ${(props) => (props.isSelected ? "#dddcdd" : "#555759")};
  cursor: pointer;
  padding: 8px;
  border: 1px solid #dee2e6;
  border-radius: 4px;
`;

const RowInCell = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: ${(props) =>
    props.justifyContent ? props.justifyContent : "flex-start"};
  ${(props) => props.paddingRight && `padding-left:${props.paddingRight}px`};
`;

const DayWrapper = styled.div`
  height: 33px;
  width: 33px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 2px;
  cursor: pointer;
`;

const ShowDayWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const EventListWrapper = styled.ul`
  margin: unset;
  list-style-position: inside;
  padding-left: 4px;
`;

const EventButtonWrapper = styled.button`
  position: relative;
  left: -14px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  width: 114px;
  border: unset;
  background: unset;
  color: #dddddd;
  cursor: pointer;
  margin: 0;
  padding: 0;
`;

const CurDay = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  background-color: #ff9900;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  color: #1e1f21;
  font-weight: bold;
`;

const CalendarWrapper = styled.div`
  overflow-x: auto;
  max-width: 100%;
`;

const Calendar = ({ startDay, today, events, openFormHandler }) => {
  moment.locale("ru");
  const totalDays = 42;
  const day = startDay.clone().subtract(1, "day");
  const daysArray = [...Array(totalDays)].map(() => day.add(1, "day").clone());
  const isCurrentDay = (day) => moment().isSame(day, "day");
  const isSelected = (day) => today.isSame(day, "month");

  return (
    <CalendarWrapper>
      <GridWrapper isHeader>
        {[...Array(7)].map((_, i) => (
          <CellWrapper
            key={i}
            className="text-light text-center font-weight-bold"
            isHeader
            isSelected
          >
            <RowInCell justifyContent={"flex-end"} paddingRight={8}>
              {moment()
                .day(i + 1)
                .format("ddd")}
            </RowInCell>
          </CellWrapper>
        ))}
      </GridWrapper>
      <GridWrapper>
        {daysArray.map((dayItem) => (
          <CellWrapper
            key={dayItem.unix()}
            isWeekend={dayItem.day() === 6 || dayItem.day() === 0}
            isSelected={isSelected(dayItem)}
            onClick={() => openFormHandler("Создать", dayItem)}
          >
            <RowInCell justifyContent={"flex-end"}>
              <ShowDayWrapper>
                <DayWrapper>
                  {isCurrentDay(dayItem) ? (
                    <CurDay>{dayItem.format("D")}</CurDay>
                  ) : (
                    dayItem.format("D")
                  )}
                </DayWrapper>
              </ShowDayWrapper>
              <EventListWrapper>
                {events
                  .filter(
                    (event) =>
                      event.date >= dayItem.format("X") &&
                      event.date <= dayItem.clone().endOf("day").format("X")
                  )
                  .map((event) => (
                    <li key={event.id}>
                      <EventButtonWrapper
                        onClick={() => openFormHandler("Update", event)}
                      >
                        {event.title}
                      </EventButtonWrapper>
                    </li>
                  ))}
              </EventListWrapper>
            </RowInCell>
          </CellWrapper>
        ))}
      </GridWrapper>
    </CalendarWrapper>
  );
};

export { Calendar };

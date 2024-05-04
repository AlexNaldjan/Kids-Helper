import React from 'react';
import './CalendarTimeLine.css';
import moment from 'moment';

interface CalendarTimeLineProps {
  today: moment.Moment;
  previousDateHandler: () => void;
  todayDateHandler: () => void;
  nextDateHandler: () => void;
}
function CalendarTimeLine({
  today,
  previousDateHandler,
  todayDateHandler,
  nextDateHandler,
}: CalendarTimeLineProps): JSX.Element {
  return (
    <div className="calendar-control">
      <div className="year-month-container">
        <div className="month">{today.format('MMMM')}</div>
        <div className="year">{today.format('YYYY')}</div>
      </div>
      <div className="previous-next-btn-container">
        <button
          onClick={previousDateHandler}
          className="previous-btn"
          type="button"
        >
          <svg
            width="60"
            height="41"
            viewBox="0 0 60 41"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1 20.5L20.3333 1M1 20.5L20.3333 40M1 20.5L39.6667 20.5C46.1111 20.5 59 24.4 59 40"
              stroke="#364351"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>

        <button onClick={todayDateHandler} className="today-btn" type="button">
          Сегодня
        </button>
        <button onClick={nextDateHandler} className="next-btn" type="button">
          <svg
            width="61"
            height="41"
            viewBox="0 0 63 41"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M60 20.5L40.3333 40M60 20.5L40.3333 1M60 20.5L20.6667 20.5C14.1111 20.5 1 16.6 1 1"
              stroke="#364351"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default CalendarTimeLine;

import { useEffect, useState } from 'react';
import './Calendar.css';
import CalendarGrid from './CalendarGrid/CalendarGrid';
import CalendarTimeLine from './CalendarTimeLine/CalendarTimeLine';
import moment from 'moment';

function Calendar(): JSX.Element {
  const [today, setToday] = useState(moment());

  const [startDay, setStartDay] = useState(
    today.clone().startOf('month').startOf('week'),
  );

  useEffect(() => {
    setStartDay(today.clone().startOf('month').startOf('week'));
  }, [today]);

  const previousDateHandler = (): void => {
    console.log('prev');
    setToday(prev => prev.clone().subtract(1, 'month'));
  };
  const todayDateHandler = (): void => {
    setToday(moment());
  };
  const nextDateHandler = (): void => {
    setToday(prev => prev.clone().add(1, 'month'));
    console.log('next');
  };

  return (
    <>
      <div className="calendar-wrapper">
        <CalendarTimeLine
          today={today}
          previousDateHandler={previousDateHandler}
          todayDateHandler={todayDateHandler}
          nextDateHandler={nextDateHandler}
        />
        <CalendarGrid day={today} startDay={startDay} />
      </div>
    </>
  );
}

export default Calendar;

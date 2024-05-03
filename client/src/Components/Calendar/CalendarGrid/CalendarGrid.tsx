import React from 'react';
import './CalendarGrid.css';
import moment from 'moment';

interface CalendarGridProps {
  startDay: moment.Moment;
  day: moment.Moment; // Типизация для startDay
}

function CalendarGrid({ startDay }: CalendarGridProps): JSX.Element {
  const totalDays = 42;
  // const day = startDay.clone().startOf('month').startOf('week');
  const daysArray = Array.from({ length: totalDays }, (_, index) =>
    startDay.clone().add(index, 'days'),
  );

  const iscurrentDay = (day: moment.Moment): boolean =>
    moment().isSame(day, 'day');

  const isCurrentMonth = (day: moment.Moment): boolean =>
    moment().isSame(day, 'month');

  return (
    <div className="calendar-grid-wrapper">
      {[...Array(7)].map((_, index) => (
        <div className="weekday-calendar-day">
          {moment()
            .day(index % 7)
            .format('ddd')}
        </div>
      ))}
      {daysArray.map(dayItem => {
        // Определение, является ли день выходным
        const isWeekend = dayItem.day() === 6 || dayItem.day() === 0;
        const dayStyle = {
          backgroundColor: isWeekend
            ? '#CBE5F8'
            : isCurrentMonth(dayItem)
            ? '#364351'
            : '#EFF2F7',
          color: isWeekend
            ? '#721c24'
            : isCurrentMonth(dayItem)
            ? '#A9A9A9'
            : '#000000',
          opacity: isCurrentMonth(dayItem) ? 1 : 0.7,
          //добавить ховер тут
        };

        return (
          <div className="calendar-day" key={dayItem.unix()} style={dayStyle}>
            {!iscurrentDay(dayItem) && (
              <div className="date-number">{dayItem.format('D')}</div>
            )}
            {iscurrentDay(dayItem) && (
              <div className="date-number-highlight">{dayItem.format('D')}</div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default CalendarGrid;

import { useState } from 'react';
import './CalendarGrid.css';
import moment from 'moment';
import { Button } from 'antd';
import ModalWindow from '../ModalWindow/ModalWindow';

interface CalendarGridProps {
  startDay: moment.Moment;
  day: moment.Moment; // Типизация для startDay
}

function CalendarGrid({ startDay }: CalendarGridProps): JSX.Element {
  const totalDays = 42;

  const daysArray = Array.from({ length: totalDays }, (_, index) =>
    startDay.clone().add(index, 'days'),
  );

  const iscurrentDay = (day: moment.Moment): boolean =>
    moment().isSame(day, 'day');

  const isCurrentMonth = (day: moment.Moment): boolean =>
    moment().isSame(day, 'month');

  // Состояние для видимости модального окна
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // Создание обработчика с помощью useCallback
  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <div className="calendar-grid-wrapper">
        {/* мапим дни */}
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
          // Стилизация ячейки дня
          const dayStyle = {
            backgroundColor: isWeekend
              ? '#CBE5F8'
              : isCurrentMonth(dayItem)
              ? '#364351'
              : '#FAFAFA',
            color: isWeekend
              ? '#721c24'
              : isCurrentMonth(dayItem)
              ? '#FAFAFA'
              : '#000000',
            opacity: isCurrentMonth(dayItem) ? 1 : 0.7,
          };

          return (
            <>
              <div
                className="calendar-day"
                key={dayItem.unix()}
                style={dayStyle}
              >
                {!iscurrentDay(dayItem) && (
                  <>
                    <Button
                      type="primary"
                      onClick={handleModalOpen}
                      className="calendar-day-add-btn"
                    >
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 80 80"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <circle
                          cx="40"
                          cy="40"
                          r="39"
                          fill="#FAFAFA"
                          stroke="#364351"
                          stroke-width="2"
                        />
                        <path
                          d="M40 24L40 56"
                          stroke="#364351"
                          stroke-width="2"
                          stroke-linecap="round"
                        />
                        <path
                          d="M56 40L24 40"
                          stroke="#364351"
                          stroke-width="2"
                          stroke-linecap="round"
                        />
                      </svg>
                    </Button>

                    <div className="date-number">{dayItem.format('D')}</div>
                  </>
                )}
                {iscurrentDay(dayItem) && (
                  <>
                    <Button
                      type="primary"
                      onClick={handleModalOpen}
                      className="calendar-day-add-btn"
                    >
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 80 80"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <circle
                          cx="40"
                          cy="40"
                          r="39"
                          fill="#FAFAFA"
                          stroke="#364351"
                          stroke-width="2"
                        />
                        <path
                          d="M40 24L40 56"
                          stroke="#364351"
                          stroke-width="2"
                          stroke-linecap="round"
                        />
                        <path
                          d="M56 40L24 40"
                          stroke="#364351"
                          stroke-width="2"
                          stroke-linecap="round"
                        />
                      </svg>
                    </Button>

                    <div className="date-number-highlight">
                      {dayItem.format('D')}
                    </div>
                    <ModalWindow
                      dayItem={dayItem}
                      isModalOpen={isModalOpen}
                      setIsModalOpen={setIsModalOpen}
                    />
                  </>
                )}
              </div>
            </>
          );
        })}
      </div>
    </>
  );
}

export default CalendarGrid;

import { useState } from 'react';
import './CalendarGrid.css';
import moment from 'moment';
import { Button } from 'antd';
import ModalWindow from '../ModalWindow/ModalWindow';

interface CalendarGridProps {
  startDay: moment.Moment;
  today: moment.Moment;
  dayItem: moment.Moment;
  day: moment.Moment | null | undefined; // Типизация для startDay
}

interface FormData {
  title: string;
  category: string;
  description: string;
  cost: number;
  date: number;
}

interface Event {
  title: string;
  category: string;
  description: string;
  cost: number;
  date: number;
}

function CalendarGrid({ startDay }: CalendarGridProps): JSX.Element {
  const totalDays = 42;

  const daysArray = Array.from({ length: totalDays }, (_, index) =>
    startDay.clone().add(index, 'days'),
  );

  // Состояние для массива событий
  const [events, setEvents] = useState<Record<string, Event[]>>({});
  // Состояние для видимости модального окна
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  // Состояние для выбора дня
  const [selectedDay, setSelectedDay] = useState<moment.Moment | null>();

  const iscurrentDay = (day: moment.Moment): boolean =>
    moment().isSame(day, 'day');

  const isCurrentMonth = (day: moment.Moment): boolean =>
    moment().isSame(day, 'month');

  // Создание обработчика с помощью useCallback
  const handleModalOpen = (dayItem: moment.Moment) => {
    setSelectedDay(dayItem);
    setIsModalOpen(true);
  };

  //

  const handleAddEvent = (formData: FormData, dayItem: moment.Moment) => {
    const event: Event = {
      title: formData.title,
      category: formData.category,
      description: formData.description,
      cost: formData.cost,
      date: formData.date,
    };

    const dayKey = dayItem.format('YYYY-MM-DD');
    setEvents(prevEvents => ({
      ...prevEvents,
      [dayKey]: [...(prevEvents[dayKey] || []), event],
    }));
  };

  return (
    <>
      <div className="calendar-grid-wrapper">
        {/* мапим дни недели */}
        {[...Array(7)].map((_, index) => (
          <div className="weekday-calendar-day">
            {moment()
              .day(index % 7)
              .format('ddd')}
          </div>
        ))}
        {/* мапим все дни календаря */}
        {daysArray.map(dayItem => {
          // Определение, является ли день выходным
          const isWeekend = dayItem.day() === 6 || dayItem.day() === 0;

          const dayKey = dayItem.format('YYYY-MM-DD');
          const dayEvents = events[dayKey] || [];
          // console.log(dayEvents);

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
            <div className="calendar-num-button">
              <div
                className="calendar-day"
                key={dayItem ? dayItem.unix() : undefined}
                style={dayStyle}
              >
                <Button
                  type="primary"
                  onClick={() => handleModalOpen(dayItem)}
                  className="calendar-day-add-btn"
                >
                  <img
                    src="/src/assets/add-event-button.svg"
                    alt="add-event-button"
                  ></img>
                </Button>
                <div className="short-events-wrapper">
                  {dayEvents.map((event, index) => (
                    <div key={index} className="short-event">
                      <div
                        className="short-event-container"
                        style={{
                          backgroundColor:
                            event.category === 'Медицина'
                              ? '#CBE5F8'
                              : '#EFF2F7' && event.category === 'Досуг'
                              ? '#EFFF9E'
                              : '#EFF2F7' && event.category === 'Образование'
                              ? '#F9B1B1'
                              : '#EFF2F7',
                        }}
                      >
                        <p className="short-event-time">{event.date}</p>
                        <p className="short-event-title">{event.title}</p>
                        <p className="short-event-category">{event.category}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {!iscurrentDay(dayItem) && (
                  <div className="date-number">{dayItem.format('D')}</div>
                )}

                {iscurrentDay(dayItem) && (
                  <div className="date-number-highlight">
                    {dayItem.format('D')}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
      <ModalWindow
        dayItem={selectedDay}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        handleAddEvent={handleAddEvent}
      />
    </>
  );
}

export default CalendarGrid;

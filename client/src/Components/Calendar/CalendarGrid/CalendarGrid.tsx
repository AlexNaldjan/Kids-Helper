import { useState } from 'react';
import './CalendarGrid.css';
import { Button } from 'antd';
import ModalWindow from '../ModalWindow/ModalWindow';
import moment, { Moment } from 'moment';

interface CalendarGridProps {
  startDay: Moment;
  today: Moment;
  dayItem: Moment | null | undefined;
  day: Moment | null | undefined; // Типизация для startDay
}

export interface FormData {
  title: string;
  category: string;
  description: string;
  cost: number;
  date: string | number;
  kidId: number;
}

interface Event {
  title: string;
  category: string;
  description: string;
  cost: number;
  date: string | number | null;
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
  const [selectedDay, setSelectedDay] = useState<Moment | null>(null);
  // Состояние для хранения списка детей
  // Состояние для хранения выбранного ребенка

  const iscurrentDay = (day: Moment): boolean => moment().isSame(day, 'day');

  const isCurrentMonth = (day: Moment): boolean =>
    moment().isSame(day, 'month');

  // Создание обработчика с помощью useCallback
  const handleModalOpen = (dayItem: Moment | null | undefined) => {
    if (dayItem) {
      setSelectedDay(dayItem);
      setIsModalOpen(true);
    }
  };

  const handleAddEvent = (
    formData: FormData,
    dayItem: Moment | null | undefined,
  ) => {
    if (dayItem !== null) {
      const event: Event = {
        title: formData.title,
        category: formData.category,
        description: formData.description,
        cost: formData.cost,
        date: formData.date,
        kidId: formData.kidId,
      };

      const dayKey = dayItem.format('YYYY-MM-DD');
      setEvents(prevEvents => ({
        ...prevEvents,
        [dayKey]: [...(prevEvents[dayKey] || []), event],
      }));
    }
  };

  return (
    <>
      <div className="calendar-grid-wrapper">
        {/* мапим дни недели */}
        {[...Array(7)].map((_, index) => (
          <div className="weekday-calendar-day" key={index}>
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
            <div
              className="calendar-num-button"
              key={dayItem ? dayItem.unix() : undefined}
            >
              <div className="calendar-day" style={dayStyle}>
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
                              : event.category === 'Досуг'
                              ? '#EFFF9E'
                              : event.category === 'Образование'
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

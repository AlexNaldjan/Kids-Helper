import { useState, useEffect } from 'react';
import './CalendarGrid.css';
import { Button, Popover } from 'antd';
import ModalWindow from '../ModalWindow/ModalWindow';
import moment, { Moment } from 'moment';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';

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
  kidId: number | undefined | null;
}

interface Event {
  id: number | null;
  title: string;
  category: string;
  description: string;
  cost: number;
  date: string | number | null;
  kidId: number | null | undefined;
}

function CalendarGrid({ startDay }: CalendarGridProps): JSX.Element {
  const totalDays = 42;

  const daysArray = Array.from({ length: totalDays }, (_, index) =>
    startDay.clone().add(index, 'days'),
  );
  const profile = useSelector(
    (state: RootState) => state.auth.profileData.profile,
  );

  // Состояние для массива событий
  const [events, setEvents] = useState<Record<string, Event[]>>({});
  // Состояние для видимости модального окна
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  // Состояние для выбора дня
  const [selectedDay, setSelectedDay] = useState<Moment | null>(null);
  // состояния для ховера дня
  const [popoverVisibility, setPopoverVisibility] = useState({});

  const hidePopover = () => {
    setPopoverVisibility(false);
  };

  const handleOpenPopoverChange = (newOpen: boolean, eventId: number) => {
    setPopoverVisibility(prev => ({
      ...prev,
      [eventId]: newOpen,
    }));
  };

  const iscurrentDay = (day: Moment): boolean => moment().isSame(day, 'day');

  const isCurrentMonth = (day: Moment): boolean =>
    moment().isSame(day, 'month');

  console.log('121212', events);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          `http://localhost:3000/api/profile/events?userId=${profile.id}`,
        );
        const result = await response.json();

        const formattedEvents = result.reduce((acc, event) => {
          const eventDay = moment(event.date).format('YYYY-MM-DD');
          if (!acc[eventDay]) {
            acc[eventDay] = [];
          }
          acc[eventDay].push(event);
          return acc;
        }, {});
        setEvents(formattedEvents);
        console.log('formattedevents:', formattedEvents);
        console.log('events:', result);
        // setEvents(result);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    }
    if (profile && profile.id) {
      fetchData();
    }
  }, [profile]);

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
    if (dayItem !== null && dayItem !== undefined) {
      const event: Event = {
        title: formData.title,
        category: formData.category,
        description: formData.description,
        cost: formData.cost,
        date: formData.date,
        kidId: formData.kidId,
        id: null,
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
                  {dayEvents.map(event => (
                    <Popover
                      content={
                        <>
                          <div>
                            <div>{event.title}</div>
                            <Button>Изменить</Button>
                            <Button>Удалить</Button>
                            <Button onClick={hidePopover}>Закрыть</Button>
                          </div>
                        </>
                      }
                      title="Title"
                      trigger="click"
                      open={popoverVisibility[event.id]} // Управляйте видимостью с помощью id
                      onOpenChange={open =>
                        handleOpenPopoverChange(open, event.id)
                      }
                    >
                      <div key={event.id} className="short-event">
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
                                : event.category === 'Развлечения'
                                ? '#EAC7FF'
                                : event.category === 'Спорт'
                                ? '#FAFAFA'
                                : '#EFF2F7',
                          }}
                        >
                          <p className="short-event-time">
                            {moment(event.date).format('HH:mm')}
                          </p>
                          <p className="short-event-title">{event.title}</p>
                          <p className="short-event-category">
                            {event.category}
                          </p>
                        </div>
                      </div>
                    </Popover>
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

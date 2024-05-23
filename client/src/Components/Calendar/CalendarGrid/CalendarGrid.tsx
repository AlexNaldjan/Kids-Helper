/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from 'react';
import './CalendarGrid.css';
import './Popover.css';
import { Button, Popover } from 'antd';
import ModalWindow from '../ModalWindow/ModalWindow';
import moment, { Moment } from 'moment';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import addEventButton from '/src/assets/add-event-button.svg';

interface CalendarGridProps {
  startDay: Moment;
  today: Moment;
  dayItem: Moment | null | undefined;
  day: Moment | null | undefined;
}

export interface FormData {
  title: string;
  category: string;
  description: string;
  cost: number;
  time: string;
  date: string | number;
  kidId: number | undefined | null;
}

export interface Event {
  id: number;
  title: string;
  category: string;
  description: string;
  cost: number;
  date: string | number | null;
  kidId: number | null | undefined;
}

function CalendarGrid({ startDay }: CalendarGridProps): JSX.Element {
  const totalDays = 42;
  const isCalendar = true;

  const daysArray = Array.from({ length: totalDays }, (_, index) =>
    startDay.clone().add(index, 'days'),
  );
  const profile = useSelector(
    (state: RootState) => state.auth.profileData.profile,
  );

  const [events, setEvents] = useState<Record<string, Event[]>>({});
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedDay, setSelectedDay] = useState<Moment | null>(null);
  const [popoverVisibility, setPopoverVisibility] = useState<
    Record<number, boolean>
  >({});

  const findKidColor = (kidId: number | null | undefined) => {
    const kid = profile?.kids?.find(kid => kid.id === kidId);
    return kid ? kid.color : 'transparent';
  };

  const hidePopover = (eventId: number) => {
    setPopoverVisibility(prev => ({ ...prev, [eventId]: false }));
  };

  const handleOpenPopoverChange = (newOpen: boolean, eventId: number) => {
    setPopoverVisibility(prev => ({ ...prev, [eventId]: newOpen }));
  };

  const isCurrentDay = (day: Moment): boolean => moment().isSame(day, 'day');
  const isCurrentMonth = (day: Moment): boolean =>
    moment().isSame(day, 'month');

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          `http://localhost:3000/api/profile/events?userId=${profile.id}`,
        );
        const result = await response.json();

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const formattedEvents = result.reduce((acc: any, event: any) => {
          const eventDay = moment(event.date).format('YYYY-MM-DD');
          if (!acc[eventDay]) {
            acc[eventDay] = [];
          }
          acc[eventDay].push(event);
          return acc;
        }, {});

        setEvents(formattedEvents);
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

  const deleteEvent = async (id: number | null) => {
    if (!window.confirm('Вы уверены, что хотите удалить это событие?')) return;

    try {
      const response = await fetch(
        `http://localhost:3000/api/profile/events/${id}`,
        {
          method: 'DELETE',
        },
      );

      if (!response.ok) {
        throw new Error('Не удалось удалить событие');
      }
      console.log('Событие успешно удалено', response);

      const newEvents = await fetch(
        `http://localhost:3000/api/profile/events?userId=${profile.id}`,
      );
      const result = await newEvents.json();

      const formattedEvents = result.reduce((acc: any, event: any) => {
        const eventDay = moment(event.date).format('YYYY-MM-DD');
        if (!acc[eventDay]) {
          acc[eventDay] = [];
        }
        acc[eventDay].push(event);
        return acc;
      }, {});
      setEvents(formattedEvents);
    } catch (error) {
      console.error('Ошибка при удалении события:', error);
    }
  };

  const handleAddEvent = async (
    formData: FormData,
    dayItem: Moment | null | undefined,
  ) => {
    if (dayItem !== null && dayItem !== undefined) {
      const event: Event = {
        id: Math.floor(Math.random() * 100),
        title: formData.title,
        category: formData.category,
        description: formData.description,
        cost: formData.cost,
        date: isCalendar
          ? moment(formData.date).toISOString()
          : moment(
              `${formData.date} ${formData.time}`,
              'YYYY-MM-DD HH:mm',
            ).toISOString(),
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
        {[...Array(7)].map((_, index) => (
          <div className="weekday-calendar-day" key={index}>
            {moment()
              .day(index % 7)
              .format('ddd')}
          </div>
        ))}
        {daysArray.map(dayItem => {
          const isWeekend = dayItem.day() === 6 || dayItem.day() === 0;
          const dayKey = dayItem.format('YYYY-MM-DD');
          const dayEvents = events[dayKey] || [];

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
                  <img src={addEventButton} alt="add-event-button" />
                </Button>
                <div className="short-events-wrapper">
                  {dayEvents.map(event => {
                    const eventId =
                      event.id !== null ? event.id : dayItem.unix();
                    return (
                      <Popover
                        className="calendar-popover"
                        key={eventId}
                        content={
                          <>
                            <div className="popover-text-container">
                              <div className="popover-text-block event-date">
                                <span className="date-name-popover">
                                  Дата:{' '}
                                  {moment(event.date).format(
                                    'YYYY-MM-DD HH:mm',
                                  )}
                                </span>
                              </div>
                              <div className="popover-text-block kid-wrap-popover">
                                <span className="kid-name-popover">
                                  Для кого:
                                </span>{' '}
                                {profile?.kids?.find(
                                  kid => kid.id === event.kidId,
                                )?.name || 'Не указан'}
                              </div>
                              <div className="popover-text-block popover-event-category">
                                <span className="category-name-popover">
                                  Категория:
                                </span>{' '}
                                {event.category}
                              </div>
                              <div className="popover-text-block event-description-container">
                                <span className="description-name-popover">
                                  Описание:
                                </span>{' '}
                                <div className="event-description">
                                  {event.description}
                                </div>
                              </div>
                            </div>
                            <div className="popover-button-container">
                              <button
                                className="popover-delete-btn"
                                onClick={() => deleteEvent(event.id)}
                              >
                                Удалить
                              </button>
                              <button
                                className="popover-close-btn"
                                onClick={() => hidePopover(eventId)}
                              >
                                Закрыть
                              </button>
                            </div>
                          </>
                        }
                        title={
                          <div id="popover-title-event-container">
                            {event.title}
                          </div>
                        }
                        trigger="click"
                        open={popoverVisibility[eventId]}
                        onOpenChange={open =>
                          handleOpenPopoverChange(open, eventId)
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
                              border: `3px solid ${findKidColor(event.kidId)}`,
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
                    );
                  })}
                </div>

                {!isCurrentDay(dayItem) && (
                  <div className="date-number">{dayItem.format('D')}</div>
                )}

                {isCurrentDay(dayItem) && (
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
        isCalendar={isCalendar}
        formDataProps={null}
      />
    </>
  );
}

export default CalendarGrid;

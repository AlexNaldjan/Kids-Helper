import Meta from 'antd/es/card/Meta';
import { ServicesResponse } from '../../../api/services/type';
import { Card, Rate } from 'antd';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import ModalWindow from '../../Calendar/ModalWindow/ModalWindow';
import { useState } from 'react';
import { Moment } from 'moment';
import { FormData, Event } from '../../Calendar/CalendarGrid/CalendarGrid';

interface OrganizationProps {
  card: ServicesResponse;
  setServices: (props: []) => void;
  userId: number;
  //handleModalOpen: () => void;
}

function Organization({
  card,
  setServices,
  userId,
}: //handleModalOpen,
OrganizationProps): React.ReactElement {
  const isLoggedIn = useSelector(
    (state: RootState) => !!state.auth.authData.accessToken,
  );
  async function handlerRating(serviceId: number, ratingUser: number) {
    try {
      await fetch('http://localhost:3000/api/rating', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ serviceId, ratingUser, userId }),
      });
      const res = await fetch(
        `http://localhost:3000/api/socialService/${userId}`,
      );
      const data = await res.json();
      setServices(data);
    } catch (error) {
      console.error('Registration Error:', error);
    }
  }

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const [events, setEvents] = useState<Record<string, Event[]>>({});
  console.log(events);
  const formData = {
    title: card.title,
    description: card.description,
    category: card.category,
    cost: 0,
    time: '',
    date: '',
    kidId: null,
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
        id: Math.floor(Math.random() * 100),
      };

      const dayKey = dayItem.format('YYYY-MM-DD');
      setEvents(prevEvents => ({
        ...prevEvents,
        [dayKey]: [...(prevEvents[dayKey] || []), event],
      }));
    }
  };

  return (
    <div className="main-page-card-container">
      <Card
        style={{ width: '300px', height: '600px' }}
        cover={<div> {card.title} </div>}
      >
        <Meta title={card.title} description={card.description} />
        <div className="main-card-content-container"></div>
        <Rate
          allowHalf
          defaultValue={card.rating}
          disabled={!isLoggedIn || Boolean(card.Users.length)}
          onChange={value => handlerRating(card.id, value)}
        />
        <div>{card.rating}</div>
        <button type="button" onClick={handleModalOpen}>
          Добавить в событие
        </button>
      </Card>
      <ModalWindow
        dayItem={null}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        handleAddEvent={handleAddEvent}
        isCalendar={false}
        formDataProps={formData}
      />
    </div>
  );
}
export default Organization;

import Meta from 'antd/es/card/Meta';
import { ServicesResponse } from '../../../api/services/type';
import { Card, Rate } from 'antd';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import Comments from '../Comment/Comment/Comment';
import ModalWindow from '../../Calendar/ModalWindow/ModalWindow';
import { useState } from 'react';
import { Moment } from 'moment';
import { FormData, Event } from '../../Calendar/CalendarGrid/CalendarGrid';
import './Card.css';

interface OrganizationProps {
  card: ServicesResponse;
  setServices: (props: []) => void;
  userId: number;
  isMapPage: boolean;
}

function Organization({
  card,
  setServices,
  userId,
  isMapPage,
}: OrganizationProps): React.ReactElement {
  const isLoggedIn = useSelector(
    (state: RootState) => !!state.auth.authData.accessToken,
  );
  async function handlerRating(serviceId: number, ratingUser: number) {
    try {
      await fetch('http://31.129.42.58:3000/api/rating', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ serviceId, ratingUser, userId }),
      });
      const res = await fetch(
        `http://31.129.42.58:3000/api/socialService/${userId}`,
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
    <>
      {isMapPage ? (
        <div className="marker-info">
          <div className="org-title-small">
            <div className="org-title-small-text-wrapper">{card.title}</div>
          </div>
          <div className="org-img-small">
            <img src={card.img} />
          </div>
          <div className="org-address-small">Адрес: {card.address}</div>
          <div className="org-description-small">{card.description}</div>
          <div className="org-contacts-small">Контакты: {card.contacts}</div>
          <div className="org-rating-small">
            Оценки пользователей: {card.rating}
          </div>
          <button
            className="add-event-map-small-btn"
            type="button"
            onClick={handleModalOpen}
          >
            Добавить в событие
          </button>
        </div>
      ) : (
        <div className="main-page-card-container">
          <Card
            // style={{ width: '300px', height: '600px' }}
            // cover={<div> {card.title} </div>}
            // style={{ width: '500px', height: '500px' }}
            cover={<img alt="img" src={card.img} />}
          >
            <div className="main-card-content-container">
              <Meta title={card.title} description={card.description} />
              <div className="rate-comment-main-page-card-wrapper">
                <div className="rating-wrapper">
                  <Rate
                    allowHalf
                    defaultValue={card.rating}
                    disabled={!isLoggedIn || Boolean(card.Users.length)}
                    onChange={value => handlerRating(card.id, value)}
                  />
                  <div>{card.rating}</div>
                </div>
                <Comments props={card.id} />
              </div>
              <button
                className="add-event-main"
                type="button"
                onClick={handleModalOpen}
              >
                Добавить в событие
              </button>
            </div>
          </Card>
        </div>
      )}
      <ModalWindow
        dayItem={null}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        handleAddEvent={handleAddEvent}
        isCalendar={false}
        formDataProps={formData}
      />
    </>
  );
}
export default Organization;

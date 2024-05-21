import { useEffect, useState } from 'react';
import { ServicesResponse } from '../../api/services/type';
import { Button, List, Rate } from 'antd';

import './main.css';
// import Organization from '../Common/Card/Card';
import { RootState } from '../../store';
import { useSelector } from 'react-redux';
import Comments from '../Common/Comment/Comment/Comment';
import Favorites from '../Common/Favorites/Favorites';
// import Carousel from '../Carousel/Carousel';
import BulletsComponent from './BulletsComponent/BulletsComponent';
import WelcomeComponent from './WelcomeComponent/WelcomeComponent';
import FeaturesComponent from './FeaturesComponent/FeaturesComponent';

function Main(): JSX.Element {
  const isLoggedIn = useSelector(
    (state: RootState) => !!state.auth.authData.accessToken,
  );
  const [services, setServices] = useState<ServicesResponse[]>([]);
  const profile = useSelector(
    (state: RootState) => state.auth.profileData.profile,
  );

  const userId = profile.id;

  useEffect(() => {
    if (profile) {
      // eslint-disable-next-line no-inner-declarations
      async function getSocialServices() {
        try {
          const res = await fetch(
            `http://localhost:3000/api/socialService/${profile.id}`,
          );
          const data = await res.json();
          setServices(data);
        } catch (error) {
          console.error('Error fetching social services:', error);
        }
      }
      getSocialServices();
    }
  }, [profile]);

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

  return (
    <>
      <WelcomeComponent />
      <FeaturesComponent />
      <BulletsComponent />
      <div className="card-list-container">
        <List
          itemLayout="vertical"
          size="large"
          pagination={{
            onChange: page => {
              console.log(page);
            },
            pageSize: 3,
          }}
          dataSource={services}
          renderItem={item => (
            <>
              <List.Item
                key={item.id}
                actions={[
                  <Rate
                    allowHalf
                    defaultValue={item.rating}
                    disabled={!isLoggedIn || Boolean(item.Users.length)}
                    onChange={value => handlerRating(item.id, value)}
                  />,
                  <div>{item.rating}</div>,
                  <Comments props={item.id} />,
                  <Favorites props={item.id} />,
                ]}
                extra={
                  <img width={250} height={200} alt="logo" src={item.img} />
                }
              >
                <div className="description-text">{item.description}</div>
              </List.Item>
            </>
          )}
        />
      </div>
    </>
  );
}

export default Main;

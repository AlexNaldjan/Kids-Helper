import React, { useEffect, useState } from 'react';
import { ServicesResponse } from '../../api/services/type';
import { List } from 'antd';
import './main.css';
import Organization from '../Common/Card/Card';
import { RootState } from '../../store';
import { useSelector } from 'react-redux';

function Main(): JSX.Element {
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

  return (
    <>
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
            <Organization
              key={item.id}
              card={item}
              setServices={setServices}
              userId={userId}
            />
          </>
        )}
      />
    </>
  );
}

export default Main;

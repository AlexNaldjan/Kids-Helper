import { Button } from 'antd';
import { Props } from '../Card/type';
import { HeartOutlined, HeartTwoTone } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';

function Favorites({ props }: Props): React.ReactElement {
  const [favorites, setFavorites] = useState<boolean>(false);
  const profile = useSelector(
    (state: RootState) => state.auth.profileData.profile,
  );

  const userId = profile.id;
  useEffect(() => {
    async function getFavorites(userId: number) {
      try {
        const res = await fetch(`http://localhost:3000/api/liked/${props}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId }),
        });
        const data = await res.json();
        if (data.text === 'OK') {
          console.log(data.text);
          setFavorites(true);
        }
      } catch (error) {
        console.log(error);
      }
    }
    getFavorites(userId);
  }, [userId]);

  async function handlerFavorites() {
    try {
      if (!favorites) {
        const res = await fetch(
          `http://localhost:3000/api/add/liked/${props}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId }),
          },
        );
        const data = await res.json();
        if (data.text === 'OK') {
          return setFavorites(true);
        }
      }

      const res = await fetch(`http://localhost:3000/api/liked/${props}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId }),
      });
      const data = await res.json();
      if (data.text === 'OK') {
        return setFavorites(false);
      }
    } catch (error) {
      console.error('Favorites Error:', error);
    }
  }
  return (
    <>
      <Button onClick={handlerFavorites}>
        {favorites ? (
          <svg
            width="30"
            height="26"
            fill="currentColor"
            color="red"
            viewBox="0 0 1024 1024"
          >
            <path d="M923 283.6c-13.4-31.1-32.6-58.9-56.9-82.8-24.3-23.8-52.5-42.4-84-55.5-32.5-13.5-66.9-20.3-102.4-20.3-49.3 0-97.4 13.5-139.2 39-10 6.1-19.5 12.8-28.5 20.1-9-7.3-18.5-14-28.5-20.1-41.8-25.5-89.9-39-139.2-39-35.5 0-69.9 6.8-102.4 20.3-31.4 13-59.7 31.7-84 55.5-24.4 23.9-43.5 51.7-56.9 82.8-13.9 32.3-21 66.6-21 101.9 0 33.3 6.8 68 20.3 103.3 11.3 29.5 27.5 60.1 48.2 91 32.8 48.9 77.9 99.9 133.9 151.6 92.8 85.7 184.7 144.9 188.6 147.3l23.7 15.2c10.5 6.7 24 6.7 34.5 0l23.7-15.2c3.9-2.5 95.7-61.6 188.6-147.3 56-51.7 101.1-102.7 133.9-151.6 20.7-30.9 37-61.5 48.2-91 13.5-35.3 20.3-70 20.3-103.3 0.1-35.3-7-69.6-20.9-101.9z" />
          </svg>
        ) : (
          <svg
            width="26"
            height="19"
            viewBox="0 0 56 49"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19.7967 43.6614L20.42 42.8795L19.7967 43.6614ZM28 7.04928L27.2757 7.73874C27.4644 7.93704 27.7262 8.04928 28 8.04928C28.2738 8.04928 28.5356 7.93704 28.7243 7.73874L28 7.04928ZM36.2033 43.6614L36.8266 44.4434L36.2033 43.6614ZM20.42 42.8795C16.3888 39.6661 11.8 36.3961 8.17062 32.2636C4.57539 28.17 2 23.3073 2 16.9774H0C0 23.9242 2.85084 29.2372 6.66789 33.5833C10.4507 37.8906 15.2603 41.3242 19.1734 44.4434L20.42 42.8795ZM2 16.9774C2 10.7071 5.50548 5.40127 10.3635 3.15586C15.1553 0.941021 21.4557 1.62439 27.2757 7.73874L28.7243 6.35982C22.3948 -0.289811 15.1951 -1.28067 9.52435 1.34041C3.91974 3.93091 0 9.97114 0 16.9774H2ZM19.1734 44.4434C20.5658 45.5533 21.9954 46.6829 23.4284 47.5296C24.8608 48.376 26.3933 49 28 49V47C26.9067 47 25.7392 46.572 24.4458 45.8078C23.153 45.0439 21.8309 44.0042 20.42 42.8795L19.1734 44.4434ZM36.8266 44.4434C40.7397 41.3242 45.5493 37.8906 49.3321 33.5833C53.1492 29.2372 56 23.9242 56 16.9774H54C54 23.3073 51.4246 28.17 47.8294 32.2636C44.2 36.3961 39.6112 39.6661 35.58 42.8795L36.8266 44.4434ZM56 16.9774C56 9.97114 52.0803 3.93091 46.4756 1.34041C40.8049 -1.28067 33.6052 -0.289811 27.2757 6.35982L28.7243 7.73874C34.5443 1.62439 40.8447 0.941021 45.6365 3.15586C50.4945 5.40127 54 10.7071 54 16.9774H56ZM35.58 42.8795C34.1691 44.0042 32.847 45.0439 31.5542 45.8078C30.2608 46.572 29.0933 47 28 47V49C29.6067 49 31.1392 48.376 32.5716 47.5296C34.0046 46.6829 35.4342 45.5533 36.8266 44.4434L35.58 42.8795Z"
              fill="#364351"
            />
          </svg>
        )}
      </Button>
    </>
  );
}
export default Favorites;

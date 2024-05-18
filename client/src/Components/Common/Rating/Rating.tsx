import { ServicesResponse } from '../../../api/services/type';
import { Rate } from 'antd';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';

interface OrganizationProps {
  card: ServicesResponse;
  setServices: (props: []) => void;
  userId: number;
}

function Rating({
  card,
  setServices,
  userId,
}: OrganizationProps): React.ReactElement {
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
  return (
    <>
      <Rate
        allowHalf
        defaultValue={card.rating}
        disabled={!isLoggedIn || Boolean(card.Users.length)}
        onChange={value => handlerRating(card.id, value)}
      />
      <div>{card.rating}</div>
    </>
  );
}
export default Rating;

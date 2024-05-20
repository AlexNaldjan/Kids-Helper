import Meta from 'antd/es/card/Meta';
import { ServicesResponse } from '../../../api/services/type';
import { Card, Rate } from 'antd';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';

interface OrganizationProps {
  card: ServicesResponse;
  setServices: (props: []) => void;
  userId: number;
}

function Organization({
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
    <div className="main-page-card-container">
      <Card
        className="organisation-card"
        style={{ width: '500px', height: '500px' }}
        cover={<img alt="img" src={card.img} />}
      >
        <Meta title={card.title} description={card.description} />
        <div className="main-card-content-container">
          <Rate
            allowHalf
            defaultValue={card.rating}
            disabled={!isLoggedIn || Boolean(card.Users.length)}
            onChange={value => handlerRating(card.id, value)}
          />
          {card.rating}
        </div>
      </Card>
    </div>
  );
}
export default Organization;

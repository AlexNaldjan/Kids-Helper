import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { useEffect, useState } from 'react';
import { List, Rate } from 'antd';
import Comments from '../Common/Comment/Comment/Comment';
import Favorites from '../Common/Favorites/Favorites';
import './FavoritePage.css';

interface FavoritesType {
  id: number;
  title: string;
  img: string;
  description: string;
  address: string;
  category: string;
  ownerId: number;
  contacts: string;
  rating: number;
  Users: [];
}

function FavoritesPage() {
  const [favorites, setFavorites] = useState<FavoritesType[]>([]);
  const profile = useSelector(
    (state: RootState) => state.auth.profileData.profile,
  );

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await fetch(
          `http://31.129.42.58:3000/api/liked/${profile.id}`,
        );
        const data = await response.json();
        setFavorites(data);
      } catch (error) {
        console.error('Error fetching favorites:', error);
      }
    };

    if (profile && profile.id) {
      fetchFavorites();
    }
  }, [profile, profile.id]);

  return (
    <div className="favorites-card-list-container">
      <div className="favorites-header">
        <p>Избранное</p>
      </div>
      <List
        className="favorites-card-row-container"
        itemLayout="vertical"
        size="large"
        pagination={{
          onChange: page => {
            console.log(page);
          },
          pageSize: 3,
        }}
        dataSource={favorites}
        renderItem={item => (
          <>
            <List.Item
              key={item.id}
              actions={[
                <div className="rating-component-main">
                  <Rate allowHalf defaultValue={item.rating} />,
                  <div>{item.rating}</div>,
                  <Comments props={item.id} />,
                  <Favorites props={item.id} />,
                </div>,
              ]}
              extra={<img width={250} height={200} alt="logo" src={item.img} />}
            >
              <List.Item.Meta description={item.title} />
              <div className="long-card-description">{item.description}</div>
            </List.Item>
          </>
        )}
      />
    </div>
  );
}

export default FavoritesPage;

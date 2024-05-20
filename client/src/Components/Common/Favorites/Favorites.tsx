import { Button } from 'antd';
import { Props } from '../Card/type';
import { HeartOutlined, HeartTwoTone } from '@ant-design/icons';
import { useState } from 'react';

function Favorites({ props }: Props): React.ReactElement {
  const [favorites, setFavorites] = useState<boolean>(false);
  async function handlerFavorites() {
    try {
      setFavorites(!favorites);
    } catch (error) {
      console.error('Favorites Error:', error);
    }
  }
  return (
    <>
      <Button onClick={handlerFavorites}>
        {favorites ? <HeartTwoTone twoToneColor="red" /> : <HeartOutlined />}
      </Button>
    </>
  );
}
export default Favorites;

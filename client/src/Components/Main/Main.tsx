import React, { useEffect, useState } from 'react';
import api from '../../api';
import { ServicesResponse } from '../../api/services/type';
import { List, Rate, Space } from 'antd';
import './main.css';
import { LikeOutlined, MessageOutlined } from '@ant-design/icons';
import { AntdIconProps } from '@ant-design/icons/lib/components/AntdIcon';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/';

interface IconTextProps {
  icon: React.ForwardRefExoticComponent<
    Omit<AntdIconProps, 'ref'> & React.RefAttributes<HTMLSpanElement>
  >;
  text: string;
}

const IconText = ({ icon, text }: IconTextProps) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

function Main(): JSX.Element {
  const isLoggedIn = useSelector(
    (state: RootState) => !!state.auth.authData.accessToken,
  );
  const [services, setServices] = useState<ServicesResponse[]>([]);

  // const profile = useSelector(
  //   (state: RootState) => state.auth.profileData.profile,
  // );
  // console.log(profile.id);
  useEffect(() => {
    async function getSocialServices() {
      const res = await api.services.getServices();
      setServices(res.data);
    }
    getSocialServices();
  }, []);
  function handlerRating(serviceId: number, rating: number) {
    console.log('====', serviceId, rating);
  }
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
          <List.Item
            key={item.id}
            actions={[
              <Rate
                allowHalf
                defaultValue={item.rating}
                disabled={!isLoggedIn}
                // value={rating}
                onChange={value => handlerRating(item.id, value)}
              />,
              <div>{item.rating}</div>,
              <IconText
                icon={LikeOutlined}
                text="156"
                key="list-vertical-like-o"
              />,
              <IconText
                icon={MessageOutlined}
                text="2"
                key="list-vertical-message"
              />,
            ]}
            extra={<img width={250} alt="logo" src={item.img} />}
          >
            <List.Item.Meta title={item.title} />
            {item.description}
          </List.Item>
        )}
      />
    </>
  );
}

export default Main;

import React, { useEffect, useState } from 'react';
import api from '../../api';
import { ServicesResponse } from '../../api/services/type';
import { List, Space } from 'antd';
import './main.css';
import { LikeOutlined, MessageOutlined, StarOutlined } from '@ant-design/icons';
import { AntdIconProps } from '@ant-design/icons/lib/components/AntdIcon';

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
  const [services, setServices] = useState<ServicesResponse[]>([]);
  useEffect(() => {
    async function getSocialServices() {
      const res = await api.services.getServices();
      setServices(res.data);
    }
    getSocialServices();
  }, []);

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
              <IconText
                icon={StarOutlined}
                text="156"
                key="list-vertical-star-o"
              />,
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

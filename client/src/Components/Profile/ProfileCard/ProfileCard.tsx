import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import './ProfileCard.css';
import { Card } from 'antd';

export const ProfileCard = () => (
  <Card
    style={{
      width: 600,
    }}
    cover={
      <img
        alt="example"
        src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
      />
    }
    actions={[
      <SettingOutlined key="setting" />,
      <EditOutlined key="edit" />,
      <EllipsisOutlined key="ellipsis" />,
    ]}
  >
    <div className="card-description">
      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolor doloremque
      recusandae beatae veritatis. Provident veritatis corporis animi adipisci
      natus in rem labore, modi iure ex odio? Numquam similique mollitia
      molestiae.
    </div>
  </Card>
);

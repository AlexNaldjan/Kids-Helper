import {
  Card,
  Form,
  Input,
  Button,
  Avatar,
  Upload,
  Descriptions,
  Modal,
} from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getProfile } from '../../../store/auth/actionCreators';

import './ProfileCard.css';

export function ProfileCard(): JSX.Element {
  const dispatch = useDispatch();
  const profile = useSelector(state => state.auth.profileData.profile);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm(); // хук для библиотеки ant design

  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);

  const showModalWindow = () => {
    setIsModalVisible(true);
    form.setFieldsValue({
      username: profile.username,
      email: profile.email,
    });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <Card title="Личный кабинет" style={{ color: '#EFF2F7', width: 600 }}>
      <div className="avatar-container">
        <Avatar size={100} />
        <Upload>
          <Button icon={<UploadOutlined />}>Изменить аватар</Button>
        </Upload>
      </div>
      <Descriptions title="Данные профиля">
        <div>{profile ? profile.username : 'Загрузка...'}</div>
        <div>{profile ? profile.email : 'Загрузка...'}</div>
      </Descriptions>
      <Button onClick={showModalWindow}>Редактировать данные</Button>
      <Modal
        title="Редактировать профиль"
        open={isModalVisible}
        // onOk={alert('info. edited')}
        onCancel={handleCancel}
      >
        <Form form={form}>
          <Form.Item
            name="username"
            label="Псевдоним"
            rules={[
              { required: true, message: 'Пожалуйста, введите псевдоним!' },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label="Эл. Адрес"
            rules={[{ required: true, message: 'Пожалуйста, введите email!' }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </Card>
  );
}

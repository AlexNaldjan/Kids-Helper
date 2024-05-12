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

import {
  MinusCircleOutlined,
  PlusOutlined,
  UploadOutlined,
} from '@ant-design/icons';

import { useState, useEffect, FormEvent } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { getProfile } from '../../../store/auth/actionCreators';

import './ProfileCard.css';
import { RootState } from '../../../store';

import { Kid } from '../../../api/profile/type';

export function ProfileCard(): JSX.Element {
  const dispatch = useDispatch();
  const profile = useSelector(
    (state: RootState) => state.auth.profileData.profile,
  );

  const [isProfileModalVisible, setIsProfileModalVisible] = useState(false);
  const [isKidsModalVisible, setIsKidsModalVisible] = useState(false);
  // const [profileState, setProfileState] = useState({});
  const [kids, setKids] = useState<Kid[]>([]);
  const [form] = Form.useForm(); // хук для библиотеки ant design


  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);

  // функции для модалок Профиля

  const showProfileModalWindow = (e: FormEvent) => {
    e.preventDefault();
    setIsProfileModalVisible(true);
    form.setFieldsValue({
      username: profile.username,
      email: profile.email,
    });
  };

  const handleProfileCancel = () => {
    setIsProfileModalVisible(false);
  };

  const handleProfileOk = () => {
    setIsProfileModalVisible(true);
  };

  // функции для модалок Kids

  const showKidseModalWindow = () => {
    setIsKidsModalVisible(true);
    setKids(profile.kids || []);
    form.setFieldsValue({});
  };

  const handleKidsCancel = () => {
    setIsKidsModalVisible(false);
  };

  const handleKidseOk = () => {
    setIsKidsModalVisible(true);
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
      <Button onClick={showProfileModalWindow}>
        Редактировать личные данные
      </Button>
      <Descriptions title="Мои Дети">
        {profile?.kids?.length > 0 && (
          <div className="kids-list-container">
            <ul className="kids-list">
              {profile.kids.map((kid, index: number) => (
                <li key={index}>
                  {kid.name}, {kid.age} лет
                  <button>Изменить</button>
                  <button>
                    <img src="/src/Components/Profile/ProfileCard/add-event-button.svg"></img>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </Descriptions>
      <Button onClick={showKidseModalWindow}>Добавить ребёнка</Button>

      <Modal
        title="Редактировать профиль"
        open={isProfileModalVisible}
        onCancel={handleProfileCancel}
        onOk={handleProfileOk}
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
      <Modal
        title="Добавить ребенка"
        open={isKidsModalVisible}
        onCancel={handleKidsCancel}
        onOk={handleKidseOk}
      >
        <Form form={form}>
          <Form.List name="kids">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <div
                    key={key}
                    style={{
                      marginBottom: 8,
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    <Form.Item
                      {...restField}
                      name={[name, 'name']}
                      rules={[
                        { required: true, message: 'Введите имя ребенка' },
                      ]}
                      style={{ flex: 1, marginRight: 8 }}
                    >
                      <Input placeholder="Имя" />
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      name={[name, 'age']}
                      rules={[
                        { required: true, message: 'Введите возраст ребенка' },
                      ]}
                    >
                      <Input placeholder="Возраст" />
                    </Form.Item>
                    <MinusCircleOutlined onClick={() => remove(name)} />
                  </div>
                ))}
                <Button
                  type="dashed"
                  onClick={() => add()}
                  block
                  icon={<PlusOutlined />}
                >
                  Добавить ребенка
                </Button>
              </>
            )}
          </Form.List>
        </Form>
      </Modal>
    </Card>
  );
}

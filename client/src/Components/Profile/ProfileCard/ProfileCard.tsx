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

interface Kid {
  id: number;
  name: string;
  age: number;
}

export function ProfileCard(): JSX.Element {
  const dispatch = useDispatch();
  const profile = useSelector(
    (state: RootState) => state.auth.profileData.profile,
  );
  console.log('=====', profile);
  const [isProfileModalVisible, setIsProfileModalVisible] =
    useState<boolean>(false); // состояни для профиля
  const [isKidsModalVisible, setIsKidsModalVisible] = useState<boolean>(false); // состояние для модалки "добавить ребенка"
  const [isOneKidModalVisible, setIsOneKidModalVisible] =
    useState<boolean>(false); // состояние для модалки "редактировать одного ребенка"
  const [selectedKid, setSelectedKid] = useState<Kid | undefined>(undefined); // состояние для выбранного ребенка
  console.log(selectedKid);
  const [kidNameState, setKidNameState] = useState<string>('');
  const [kidAgeState, setKidAgeState] = useState<number>(0);
  const [form] = Form.useForm(); // хук для библиотеки ant design

  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);

  useEffect(() => {
    if (selectedKid && isOneKidModalVisible) {
      form.setFieldsValue({
        name: selectedKid.name,
        age: selectedKid.age,
      });
      // Также обновляем локальное состояние, если используете его для полей
      setKidNameState(selectedKid.name);
      setKidAgeState(selectedKid.age);
    }
  }, [selectedKid, isOneKidModalVisible, form]);
  // функции для модалок Профиля

  const showProfileModalWindow = (e: FormEvent) => {
    e.preventDefault();
    setIsProfileModalVisible(true);
    form.setFieldsValue({
      username: profile.username,
      email: profile.email,
    });
  };

  const showOneKidModalWindow = (id: number) => {
    const kid = profile.kids.find(kid => kid.id == id);
    console.log('Selected kid:', kid);
    setSelectedKid(kid); // Сохраняем выбранного ребёнка в состояние

    setIsOneKidModalVisible(true);
  };

  const handleProfileCancel = () => {
    setIsProfileModalVisible(false);
  };

  const updateProfile = async (): Promise<void> => {
    try {
      const updatedUsername = form.getFieldValue('username');
      const response = await fetch(
        `http://localhost:3000/api/profile/update/${profile.id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: updatedUsername,
          }),
        },
      );
      if (response.ok) {
        setIsProfileModalVisible(false);
        dispatch(getProfile());
      } else {
        throw new Error('Failed to update profile');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  // функции для модалки Kids
  const showKidseModalWindow = () => {
    setIsKidsModalVisible(true);
  };
  const handleKidsCancel = () => {
    setIsKidsModalVisible(false);
  };
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKidNameState(e.target.value);
  };

  const handleAgeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKidAgeState(parseInt(e.target.value));
  };

  // функции для модалки "OneKid"

  const handleOneKidCancel = () => {
    setIsOneKidModalVisible(false);
  };

  const addKids = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/profile/kids/${profile.id}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: kidNameState,
            age: kidAgeState,
          }),
        },
      );

      if (response.ok) {
        setIsKidsModalVisible(false);
        dispatch(getProfile());
      } else {
        throw new Error('Failed to add children');
      }
    } catch (error) {
      console.error('Error adding children:', error);
    }
  };

  const updateKid = async (): Promise<void> => {
    if (!selectedKid) return;

    console.log('id rebenka', selectedKid.id, kidNameState, kidAgeState);
    try {
      const response = await fetch(
        `http://localhost:3000/api/profile/kids/${selectedKid.id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: kidNameState,
            age: kidAgeState,
          }),
        },
      );

      if (response.ok) {
        setIsOneKidModalVisible(false);
        dispatch(getProfile());
      } else {
        throw new Error('Failed to update kid');
      }
    } catch (error) {
      console.error('Error updating kid:', error);
      throw error;
    }
  };

  const deleteKid = async (id: number) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/profile/kids/${id}`,
        {
          method: 'DELETE',
        },
      );

      if (response.ok) {
        console.log('Kid deleted successfully');
        dispatch(getProfile()); // Обновляем данные профиля, чтобы изменения отразились в UI
      } else {
        throw new Error('Failed to delete kid');
      }
    } catch (error) {
      console.error('Error deleting kid:', error);
    }
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
              {profile.kids.map(kid => (
                <li key={kid.id}>
                  {kid.name}, {kid.age} лет
                  <Button onClick={() => showOneKidModalWindow(kid.id)}>
                    Изменить
                  </Button>
                  <Button onClick={() => deleteKid(kid.id)}>Удалить</Button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </Descriptions>
      <Button onClick={showKidseModalWindow}>Редактировать список детей</Button>

      <Modal
        title="Изменить информацию о ребёнке"
        open={isOneKidModalVisible}
        onCancel={handleOneKidCancel}
        onOk={updateKid}
      >
        {selectedKid && (
          <Form
            form={form}
            initialValues={{ name: selectedKid.name, age: selectedKid.age }}
          >
            <Form.Item
              name="name"
              label="Имя Ребенка"
              rules={[
                { required: true, message: 'Пожалуйста, введите имя ребёнка!' },
              ]}
            >
              <Input value={kidNameState} onChange={handleNameChange} />
            </Form.Item>
            <Form.Item
              name="age"
              label="Возраст Ребенка"
              rules={[
                {
                  required: true,
                  message: 'Пожалуйста, введите возраст ребёнка!',
                },
              ]}
            >
              <Input value={kidAgeState} onChange={handleAgeChange} />
            </Form.Item>
          </Form>
        )}
      </Modal>

      <Modal
        title="Редактировать профиль"
        open={isProfileModalVisible}
        onCancel={handleProfileCancel}
        onOk={updateProfile}
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
        </Form>
      </Modal>

      <Modal
        title="Добавить ребенка"
        open={isKidsModalVisible}
        onCancel={handleKidsCancel}
        onOk={addKids}
      >
        <Form form={form}>
          <Form.Item
            label="Имя"
            name="name"
            rules={[{ required: true, message: 'Введите имя ребенка' }]}
          >
            <Input value={kidNameState} onChange={handleNameChange} />
          </Form.Item>
          <Form.Item
            label="Возраст"
            name="age"
            rules={[{ required: true, message: 'Введите возраст ребенка' }]}
          >
            <Input value={kidAgeState} onChange={handleAgeChange} />
          </Form.Item>
        </Form>
      </Modal>
    </Card>
  );
}

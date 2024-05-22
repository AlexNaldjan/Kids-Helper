import {
  Card,
  Form,
  Input,
  Button,
  Avatar,
  Upload,
  Descriptions,
  Modal,
  Select,
} from 'antd';
const { Option } = Select;
import { UploadOutlined } from '@ant-design/icons';

import { useState, useEffect, FormEvent } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { getProfile } from '../../../store/auth/actionCreators';

import './ProfileCard.css';
import { RootState } from '../../../store';

export interface Kid {
  id: number | null;
  name: string;
  age: number;
  color: string;
}

export function ProfileCard(): JSX.Element {
  const dispatch = useDispatch();
  const profile = useSelector(
    (state: RootState) => state.auth.profileData.profile,
  );
  console.log(profile);
  const [isProfileModalVisible, setIsProfileModalVisible] =
    useState<boolean>(false); // состояни для профиля
  const [isKidsModalVisible, setIsKidsModalVisible] = useState<boolean>(false); // состояние для модалки "добавить ребенка"
  const [isOneKidModalVisible, setIsOneKidModalVisible] =
    useState<boolean>(false); // состояние для модалки "редактировать одного ребенка"
  const [selectedKid, setSelectedKid] = useState<Kid | undefined>(undefined); // состояние для выбранного ребенка
  console.log(selectedKid);
  const [kidNameState, setKidNameState] = useState<string>('');
  const [kidAgeState, setKidAgeState] = useState<number>(0);
  const [kidColor, setKidColor] = useState<string>('#00000');

  const markerColors = [
    'green',
    'orange',
    'yellow',
    'purple',
    'pink',
    'tomato',
    'salmon',
    'grey',
  ];

  const [form] = Form.useForm(); // хук для библиотеки ant design

  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);

  useEffect(() => {
    if (selectedKid && isOneKidModalVisible) {
      form.setFieldsValue({
        name: selectedKid.name,
        age: selectedKid.age,
        color: selectedKid.color,
      });
      // Также обновляем локальное состояние, если используете его для полей
      setKidNameState(selectedKid.name);
      setKidAgeState(selectedKid.age);
      setKidColor(selectedKid.color);
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

  const showOneKidModalWindow = (id: number | null) => {
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
    form.setFieldsValue({});
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

  const handleKidColorChange = (e: string) => {
    console.log(e);
    setKidColor(e);
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
            color: kidColor,
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
  console.log(profile.id);

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
            color: kidColor,
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

  const deleteKid = async (id: number | null) => {
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
  console.log('kids', profile.kids);
  return (
    <div className="profile-card-custom">
      <Card title="Личный кабинет" style={{ color: '#EFF2F7' }}>
        <div className="avatar-container" style={{ gap: '40px' }}>
          <Avatar size={100} />
          <Upload>
            <Button className="change-avatar" icon={<UploadOutlined />}>
              Изменить аватар
            </Button>
          </Upload>
        </div>
        <Descriptions title="Данные профиля">
          <div className="profile-data-wrapper">
            <div className="profile-data-name">
              <span>Псевдоним:</span>{' '}
              {profile ? profile.username : 'Загрузка...'}
            </div>
            <div className="profile-data-email">
              <span>Email:</span> {profile ? profile.email : 'Загрузка...'}
            </div>
          </div>
        </Descriptions>
        <div className="profile-edit-nickname-btn">
          <Button onClick={showProfileModalWindow}>Изменить псевдоним</Button>
        </div>

        <Descriptions title="Мои Дети">
          {profile?.kids?.length > 0 && (
            <div className="kids-list-container">
              <ul className="kids-list">
                {profile.kids.map(kid => (
                  <li
                    className="kid-li-item"
                    key={kid.id}
                    style={{
                      ...({ '--kid-color': kid.color } as React.CSSProperties),
                      color: 'black',
                    }}
                  >
                    <div className="kid-info-wrapper">
                      {kid.name} {kid.age} лет
                    </div>
                    <div className="kid-info-btns-wrapper">
                      <Button
                        onClick={() => showOneKidModalWindow(kid.id)}
                        id="profile-change-btn"
                      >
                        <span className="small-btn-text">Изменить</span>
                      </Button>
                      <Button
                        onClick={() => deleteKid(kid.id)}
                        id="profile-del-btn"
                      >
                        <svg
                          className="svg-del-icon"
                          width="32"
                          height="32"
                          viewBox="0 0 114 114"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <circle
                            cx="57"
                            cy="56.9999"
                            r="39"
                            transform="rotate(45 57 56.9999)"
                            fill="#EFF2F7"
                            stroke="#364351"
                            stroke-width="2"
                          />
                          <path
                            d="M68.3137 45.6862L45.6863 68.3136"
                            stroke="#364351"
                            stroke-width="2"
                            stroke-linecap="round"
                          />
                          <path
                            d="M68.3137 68.3137L45.6863 45.6862"
                            stroke="#364351"
                            stroke-width="2"
                            stroke-linecap="round"
                          />
                        </svg>
                      </Button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </Descriptions>
        <div className="profile-add-kids-btn">
          <Button
            onClick={showKidseModalWindow}
            id="profile-add-kids-btn
        "
          >
            Добавить детей
          </Button>
        </div>

        <Modal
          title="Изменить информацию о ребёнке"
          open={isOneKidModalVisible}
          onCancel={handleOneKidCancel}
          onOk={updateKid}
          cancelButtonProps={{ style: { display: 'none' } }}
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
                  {
                    required: true,
                    message: 'Пожалуйста, введите имя ребёнка!',
                  },
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
          title="Изменить псевдоним"
          open={isProfileModalVisible}
          onCancel={handleProfileCancel}
          onOk={updateProfile}
          className="change-login-modal"
          cancelButtonProps={{ style: { display: 'none' } }}
        >
          <Form form={form} className="change-login-modal-from">
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
          cancelButtonProps={{ style: { display: 'none' } }}
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
            <Form.Item
              label="Цвет маркера"
              name="color"
              rules={[
                {
                  required: true,
                  message: 'Выберите маркер для ребенка',
                },
              ]}
            >
              {/* <label className="input-label">
                <span className="input-title">Цвет маркера</span> */}

              <Select
                className="input"
                onChange={e => handleKidColorChange(e)}
                // rules={[
                //   {
                //     required: true,
                //     message: 'Выберите маркер для ребенка',
                //   },
                // ]}
              >
                {markerColors.map((kidColor, index) => (
                  <Option key={index} value={kidColor}>
                    {kidColor}
                  </Option>
                ))}
              </Select>
              {/* </label> */}
            </Form.Item>
          </Form>
        </Modal>
      </Card>
    </div>
  );
}

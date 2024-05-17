import { useState, useEffect } from 'react';
import { Modal } from 'antd';
import { Moment } from 'moment';
import './ModalWindow.css';
import { FormData } from '../CalendarGrid/CalendarGrid';

import { useSelector, useDispatch } from 'react-redux';
import { getProfile } from '../../../store/auth/actionCreators';
import { RootState } from '../../../store';
import moment from 'moment';

interface ModalWindowProps {
  dayItem: Moment | null | undefined;
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleAddEvent: (
    formData: FormData,
    dayItem: Moment | null | undefined,
  ) => void;
}

function ModalWindow({
  dayItem,
  isModalOpen,
  setIsModalOpen,
}: // handleAddEvent,
ModalWindowProps): JSX.Element {
  const [formData, setFormData] = useState<FormData>({
    title: '',
    description: '',
    category: '',
    cost: 0,
    date: '',
    kidId: null,
  });
  // const [kidId, setKidId] = useState<number>(0);

  const dispatch = useDispatch();
  const profile = useSelector(
    (state: RootState) => state.auth.profileData.profile,
  );

  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);

  useEffect(() => {
    if (profile && profile.kids.length > 0) {
      setFormData(prevFormData => ({
        ...prevFormData,
        kidId: profile.kids[0].id, // Устанавливаем kidId первого ребенка в профиле
      }));
    }
  }, [profile]);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLTextAreaElement | HTMLSelectElement | HTMLInputElement
    >,
  ): void => {
    e.preventDefault();
    const { name, value } = e.target;
    if (name === 'date' && dayItem) {
      // Объединяем dayItem и время из формы в одну дату
      const combinedDateTime = dayItem
        .clone()
        .set({
          hour: parseInt(value.split(':')[0], 10),
          minute: parseInt(value.split(':')[1], 10),
        })
        .toISOString();

      setFormData(prev => ({
        ...prev,
        [name]: combinedDateTime,
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const addEvent = async () => {
    try {
      const event = {
        userId: profile.id,
        title: formData.title,
        description: formData.description,
        category: formData.category,
        date: moment(formData.date), // Преобразуем в формат ISO для Postgres
        cost: formData.cost,
        kidId: formData.kidId,
      };

      const response = await fetch(`http://localhost:3000/api/profile/events`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(event),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Ошибка при создании события');
      }

      setIsModalOpen(false); // Закрыть модальное окно после успешного создания
    } catch (error) {
      console.error('Error while creating an event:', error);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addEvent(); // Вызов функции добавления события
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <Modal
      title="Новое Событие"
      open={isModalOpen}
      onCancel={handleCancel}
      onOk={addEvent}
      key={dayItem ? dayItem.unix() : undefined}
    >
      {dayItem && (
        <form className="event-form" onSubmit={handleSubmit}>
          <label className="input-label">
            <span className="input-title">Название:</span>
            <input
              className="input"
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
            />
          </label>
          <label className="input-label">
            <span className="input-title">Время:</span>
            <input
              className="input"
              type="time"
              name="date"
              value={formData.date ? moment(formData.date).format('HH:mm') : ''}
              onChange={handleInputChange}
            />
          </label>
          <fieldset className="radio-set">
            <legend className="visually-hidden">Категории:</legend>
            <div className="radio-container">
              <label className="radio-label">
                <input
                  className="radio"
                  type="radio"
                  name="category"
                  value="Медицина"
                  checked={formData.category === 'Медицина'}
                  onChange={handleInputChange}
                />
                <span className="radio-title">Медицина</span>
              </label>
              <label className="radio-label">
                <input
                  className="radio"
                  type="radio"
                  name="category"
                  value="Досуг"
                  checked={formData.category === 'Досуг'}
                  onChange={handleInputChange}
                />
                <span className="radio-title">Досуг</span>
              </label>
              <label className="radio-label">
                <input
                  className="radio"
                  type="radio"
                  name="category"
                  value="Образование"
                  checked={formData.category === 'Образование'}
                  onChange={handleInputChange}
                />
                <span className="radio-title">Образование</span>
              </label>
              <label className="radio-label">
                <input
                  className="radio"
                  type="radio"
                  name="category"
                  value="Спорт"
                  checked={formData.category === 'Спорт'}
                  onChange={handleInputChange}
                />
                <span className="radio-title">Спорт</span>
              </label>
              <label className="radio-label">
                <input
                  className="radio"
                  type="radio"
                  name="category"
                  value="Развлечения"
                  checked={formData.category === 'Развлечения'}
                  onChange={handleInputChange}
                />
                <span className="radio-title">Развлечения</span>
              </label>
            </div>
          </fieldset>
          <label className="input-label">
            <span className="input-title">Стоимость:</span>
            <input
              className="input"
              type="number"
              name="cost"
              value={formData.cost}
              onChange={handleInputChange}
            />
          </label>
          <label className="input-label">
            <span className="input-title">Описание:</span>
            <textarea
              className="input input-textarea"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
            ></textarea>
          </label>
          <label className="input-label">
            <span className="input-title">Ребенок:</span>
            <label className="input-label">
              <select
                className="input"
                onChange={handleInputChange}
                name="kidId"
                value={Number(formData.kidId)}
              >
                <option value="" disabled>
                  Выберите ребенка
                </option>
                {profile.kids.map(kid => (
                  <option key={kid.id} value={kid.id}>
                    {kid.name}
                  </option>
                ))}
              </select>
            </label>
          </label>
          <button type="submit">Создать Событие</button>
        </form>
      )}
    </Modal>
  );
}

export default ModalWindow;

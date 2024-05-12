import { useState } from 'react';
import { Modal } from 'antd';
import { Moment } from 'moment';
import './ModalWindow.css';
import { FormData } from '../CalendarGrid/CalendarGrid';

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
  handleAddEvent,
}: ModalWindowProps): JSX.Element {
  const [formData, setFormData] = useState<FormData>({
    title: '',
    description: '',
    category: '',
    cost: 0,
    date: 0,
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleAddEvent(formData, dayItem);
    setIsModalOpen(false);

    setFormData({
      title: '',
      category: '',
      description: '',
      cost: 0,
      date: 0,
    });
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <Modal
      title="Новое Событие"
      open={isModalOpen}
      onCancel={handleCancel}
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
              value={formData.date}
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
          <button type="submit">Создать Событие</button>
        </form>
      )}
    </Modal>
  );
}

export default ModalWindow;

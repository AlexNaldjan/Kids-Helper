import { useState } from 'react';
import { Modal } from 'antd';
import moment from 'moment';
import './ModalWindow.css';

interface ModalWindowProps {
  dayItem: moment.Moment;
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
  handleAddEvent: (formData: FormData, dayItem: moment.Moment) => void;
}

interface FormData {
  title: string;
  description: string;
  category: string;
  cost: number;
  date: string;  // Assuming date is stored as string (e.g., time)
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
    cost: 1000,
    date: '',  // Initialize as empty string if it is intended to capture time as string
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
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
    // Resetting form data after the event is handled
    setFormData({
      title: '',
      category: '',
      description: '',
      cost: 0,
      date: '',
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
      key={dayItem ? dayItem.unix() : undefined}  // Using the Unix timestamp as a unique key
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
              type="number"  // Changed to number to properly capture numerical input
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

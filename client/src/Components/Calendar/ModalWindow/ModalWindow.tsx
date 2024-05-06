import { Modal } from 'antd';
import moment from 'moment';

interface ModalWindowProps {
  dayItem: moment.Moment;
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
}

function ModalWindow({
  dayItem,
  isModalOpen,
  setIsModalOpen,
}: ModalWindowProps): JSX.Element {
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <Modal
      title="Новое Событие"
      open={isModalOpen}
      onCancel={handleCancel}
      key={dayItem.unix()} // Добавляем ключ для каждого модального окна
    >
      <label className="input-label">
        <span className="input-title">Название:</span>
        <input className="input" type="text" name="one-line" />
      </label>

      <fieldset className="radio-set">
        <legend className="visually-hidden">Категории:</legend>

        <div className="radio-container">
          <label className="radio-label">
            <input
              className="radio"
              type="radio"
              name="browser"
              value="ie"
              id="ie"
            />
            <span className="radio-title">Медицина</span>
          </label>
          <label className="radio-label">
            <input
              className="radio"
              type="radio"
              name="browser"
              value="opera"
              id="opera"
            />
            <span className="radio-title">Досуг/Хобби</span>
          </label>
          <label className="radio-label">
            <input
              className="radio"
              type="radio"
              name="browser"
              value="firefox"
              id="firefox"
            />
            <span className="radio-title">Образование</span>
          </label>
        </div>
      </fieldset>

      <label className="input-label">
        <span className="input-title">Описание:</span>
        <textarea className="input input-textarea" name="comment"></textarea>
      </label>
    </Modal>
  );
}

export default ModalWindow;

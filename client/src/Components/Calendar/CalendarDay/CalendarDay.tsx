import { useState } from 'react';
import { Button, Modal } from 'antd';
import moment from 'moment';

export const CalendarDay = (dayItem: moment.Moment, dayStyle: any) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const iscurrentDay = (day: moment.Moment): boolean =>
    moment().isSame(day, 'day');

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="calendar-day" key={dayItem.unix()} style={dayStyle}>
        {!iscurrentDay(dayItem) && (
          <>
            <Button
              type="primary"
              onClick={handleModalOpen}
              className="calendar-day-add-btn"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 80 80"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  cx="40"
                  cy="40"
                  r="39"
                  fill="#FAFAFA"
                  stroke="#364351"
                  stroke-width="2"
                />
                <path
                  d="M40 24L40 56"
                  stroke="#364351"
                  stroke-width="2"
                  stroke-linecap="round"
                />
                <path
                  d="M56 40L24 40"
                  stroke="#364351"
                  stroke-width="2"
                  stroke-linecap="round"
                />
              </svg>
            </Button>

            <div className="date-number">{dayItem.format('D')}</div>
          </>
        )}
        {iscurrentDay(dayItem) && (
          <>
            <Button
              type="primary"
              onClick={handleModalOpen}
              className="calendar-day-add-btn"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 80 80"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  cx="40"
                  cy="40"
                  r="39"
                  fill="#FAFAFA"
                  stroke="#364351"
                  stroke-width="2"
                />
                <path
                  d="M40 24L40 56"
                  stroke="#364351"
                  stroke-width="2"
                  stroke-linecap="round"
                />
                <path
                  d="M56 40L24 40"
                  stroke="#364351"
                  stroke-width="2"
                  stroke-linecap="round"
                />
              </svg>
            </Button>

            <div className="date-number-highlight">{dayItem.format('D')}</div>
            <Modal
              title="Новое Событие"
              open={isModalOpen}
              onCancel={handleCancel}
              key={dayItem.unix()} // Добавляем ключ для каждого модального окна
              cancelButtonProps={{ style: { display: 'none' } }}
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
                <textarea
                  className="input input-textarea"
                  name="comment"
                ></textarea>
              </label>
            </Modal>
          </>
        )}
      </div>
    </>
  );
};
export default CalendarDay;

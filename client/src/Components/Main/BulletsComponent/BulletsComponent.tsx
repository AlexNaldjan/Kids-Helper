import React from 'react';
import './BulletsComponent.css';

function BulletsComponent(): React.ReactElement {
  return (
    <>
      <div className="bullets-container">
        <div className="bullets-wrapper">
          <div id="bullet-1" className="bullet-wraper">
            <div className="bullet-img">
              <img src="/src/Components/Main/BulletsComponent/иллюстрация на роликах.svg" />
            </div>
            <div>
              <p className="bullet-text">
                Понятные инструменты для планирования и организации досуга
                детей,
              </p>
            </div>
          </div>
          <div id="bullet-2" className="bullet-wraper">
            <div className="bullet-img">
              <img src="/src/Components/Main/BulletsComponent/Иллюстрация футбольная.svg" />
            </div>
            <div>
              <p className="bullet-text">
                Находите новые и увлекательные мероприятия для детей всех
                возрастов
              </p>
            </div>
          </div>
          <div id="bullet-3" className="bullet-wraper">
            <div className="bullet-img">
              <img src="/src/Components/Main/BulletsComponent/иллюстрация часы.svg" />
            </div>
            <div>
              <p className="bullet-text"></p>
              Управляйте своим временем, чтобы проводить больше времени с самыми
              близкими
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default BulletsComponent;

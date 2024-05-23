import React from 'react';
import './FeaturesComponents.css';

function FeaturesComponent(): React.ReactElement {
  return (
    <>
      <div className="features-container">
        <div className="features-wrapper">
          <div id="feature-bullet-1" className="feature-bullet-wraper">
            <div className="feature-bullet-content">
              <h1>Планируйте досуг</h1>
              <p className="feature-bullet-text">
                Планируйте спортивные <br />и иные активности с детьми
              </p>
            </div>
          </div>
          <div id="feature-bullet-2" className="feature-bullet-wraper">
            <div className="feature-bullet-content">
              <h1>Находите новые места</h1>
              <p className="feature-bullet-text">
                Выбирайте новые локации <br />и организации среди наших
                партнёров
              </p>
            </div>
          </div>
          <div id="feature-bullet-3" className="feature-bullet-wraper">
            <div className="feature-bullet-content">
              <h1>
                Держите свой бюджет <br />
                под контролем
              </h1>
              <p className="feature-bullet-text">
                Держите под контролём ваши расходы <br />и распоряжайтесь своим
                временем и финансами эффективно
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default FeaturesComponent;

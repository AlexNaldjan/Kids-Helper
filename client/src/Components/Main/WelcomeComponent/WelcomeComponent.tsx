import React from 'react';
import './WelcomeComponent.css';

function Home(): React.ReactElement {
  return (
    <>
      <div className="welcome-container">
        <div className="welcome-wrapper">
          <div id="welcome-bullit-1" className="welcome-bullit-wraper">
            <div className="welcome-bullit-img">
              <img src="/src/Components/Main/WelcomeComponent/иллюстрация на роликах.svg" />
            </div>
            <div>
              <p className="welcome-bullit-text">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Aperiam, tempore.
              </p>
            </div>
          </div>
          <div id="welcome-bullit-2" className="welcome-bullit-wraper">
            <div className="welcome-bullit-img">
              <img src="/src/Components/Main/WelcomeComponent/Иллюстрация футбольная.svg" />
            </div>
            <div>
              <p className="welcome-bullit-text">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Aperiam, tempore.
              </p>
            </div>
          </div>
          <div id="welcome-bullit-3" className="welcome-bullit-wraper">
            <div className="welcome-bullit-img">
              <img src="/src/Components/Main/WelcomeComponent/иллюстрация часы.svg" />
            </div>
            <div>
              <p className="welcome-bullit-text">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Aperiam, tempore.
              </p>
            </div>
          </div>
          <div id="welcome-bullit-4" className="welcome-bullit-wraper">
            <div className="welcome-bullit-img">
              <img src="/src/Components/Main/WelcomeComponent/иллюстрация с чеком.svg" />
            </div>
            <div>
              <p className="welcome-bullit-text">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Aperiam, tempore.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;

import './WelcomeComponent.css';

function WelcomeComponent() {
  return (
    <div className="welcome-component-container">
      <div className="welcome-component-wrapper">
        <div className="left-welcome-component-container">
          <div className="left-welcome-component-wrapper">
            <p>Lorem, ipsum dolor.</p>
            <h1>Lorem, ipsum.</h1>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              Voluptatem doloremque ab est?
            </p>
            <button id="get-started-btn-main">Начать</button>
          </div>
        </div>
        <div className="right-welcome-component-container">
          <div className="right-welcome-component-wrapper">
            <div className="photo-column-left">
              <img src="https://educhess.ru/assets/images/index/index-1.webp" />
              <img src="https://mosmuseum.ru/wp/wp-content/uploads/2022/01/photo_2022-03-21-09.47.02.jpeg" />
              <img src="https://avatars.mds.yandex.net/get-altay/13581124/2a0000018f1150dfc475528c1b3fce02b730/L_height" />
            </div>
            <div className="photo-column-right">
              <img src="https://avatars.mds.yandex.net/get-altay/11368589/2a0000018bc8b0d1c17d062c596ffd947dda/L_height" />
              <img src="https://avatars.mds.yandex.net/get-altay/1880524/2a0000016b40a7619ad4ecfd6e1aded0b1d7/L_height" />
              <img src="https://avatars.mds.yandex.net/get-altay/13212052/2a0000018f4e8b831869f2fc4e9fe5d41380/L_height" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WelcomeComponent;

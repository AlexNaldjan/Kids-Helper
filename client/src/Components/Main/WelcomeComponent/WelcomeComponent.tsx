import React from 'react';
// import Header from '../Header/Header';
import WelcomeBanner from '../WelcomeBanner/WelcomeBanner';
const bannerImage = '/src/components/WelcomeBanner/roe-deer-2634729_1280.jpeg';

function Home(): React.ReactElement {
  return (
    <>
      <WelcomeBanner backgroundImage={bannerImage} />
      <div className="welcomeContainer">
        <div className="cityImageContainer">
          <img className="cityImage" src="/558668.jpeg" />
        </div>
        <div className="welcomeText">
          <p>
            l Погрузитесь в удивительный мир Урюписнского зоопарка, где
            экзотические и редкие животные со всех уголков планеты ждут вас!
            Здесь вы станете частью нашей большой зоопарковой семьи, наслаждаясь
            близостью к природе и узнавая множество интересных фактов о наших
            обитателях. Мы стремимся создать для животных условия, максимально
            приближенные к их естественной среде обитания, чтобы и вам, и им
            было комфортно. Приходите за незабываемыми впечатлениями и новыми
            знаниями!
          </p>
        </div>
      </div>
    </>
  );
}

export default Home;

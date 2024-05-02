import Calendar from '../Calendar/Calendar';
// import { Button } from 'antd';
import { Card } from 'antd';

function Profile(): JSX.Element {
  return (
    <div className="profile-container">
      <div className="calendar-placeholder">
        <Calendar />
      </div>
      <div className="profile-card">
        <Card
          hoverable
          style={{
            width: 240,
          }}
          cover={
            <img
              alt="example"
              src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
            />
          }
        ></Card>
      </div>
    </div>
  );
}

export default Profile;

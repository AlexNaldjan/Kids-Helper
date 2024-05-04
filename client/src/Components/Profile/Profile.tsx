import './Profile.css';
import Calendar from '../Calendar/Calendar';
// import { Button } from 'antd';
import { Card } from 'antd';

function Profile(): JSX.Element {
  return (
    <div className="profile-container">
      <div className="calendar-placeholder">
        <Calendar />
      </div>
      <div className="profile-card"></div>
    </div>
  );
}

export default Profile;

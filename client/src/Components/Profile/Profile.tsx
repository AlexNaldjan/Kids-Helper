import './Profile.css';
import { CalendarMain } from '../Calendar/CalendarMain/CalendarMain';
import { ProfileCard } from './ProfileCard/ProfileCard';


function Profile(): JSX.Element {
  return (
    <div className="profile-container">
      <div className="calendar-placeholder">
        <CalendarMain />
      </div>
      <div className="profile-big-event-container">
        <div className="profile-card">
          <ProfileCard />
        </div>

        <div className="long-event-card"></div>
      </div>
    </div>
  );
}

export default Profile;

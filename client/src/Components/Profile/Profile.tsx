import './Profile.css';
import { CalendarMain } from '../Calendar/CalendarMain/CalendarMain';
import { ProfileCard } from '../Profile/ProfileCard/ProfileCard';

function Profile(): JSX.Element {
  return (
    <div className="profile-page-container">
      <div className="calendar-placeholder">
        <CalendarMain />
      </div>
      <div className="profile-big-container">
        <ProfileCard />
      </div>
    </div>
  );
}

export default Profile;

import './Profile.css';
import { CalendarMain } from '../Calendar/CalendarMain/CalendarMain';
import { ProfileCard } from '../Profile/ProfileCard/ProfileCard';
import Favorites from '../ FavoritesPage/ FavoritesPage';

function Profile(): JSX.Element {
  return (
    <div className="profile-page">
      <div className="profile-page-container">
        <div className="calendar-profile-container">
          <div className="calendar-placeholder">
            <CalendarMain />
          </div>
          <div className="profile-big-container">
            <ProfileCard />
          </div>
        </div>
        <div className="favorites">
          {' '}
          <Favorites />
        </div>
      </div>
    </div>
  );
}

export default Profile;

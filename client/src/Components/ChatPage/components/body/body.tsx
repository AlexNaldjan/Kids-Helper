import { useNavigate } from 'react-router-dom';
import styles from './style.module.css';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../store';
import { Message } from '../../ChatPage';

interface BodyProps {
  messages: Message[];
}

export const Body: React.FC<BodyProps> = ({ messages }) => {
  const profile = useSelector(
    (state: RootState) => state.auth.profileData.profile,
  );
  const navigate = useNavigate();
  const handleLeave = () => {
    navigate('/');
  };
  return (
    <>
      <header className={styles.header}>
        <button className={styles.btn} onClick={handleLeave}>
          Покинуть чат
        </button>
      </header>

      <div className={styles.container}>
        {messages.map(element =>
          element.name === profile.username ? (
            <div className={styles.chats} key={element.id}>
              <p className={styles.senderName}>Вы</p>
              <div className={styles.messageSender}>
                <p>{element.text}</p>
              </div>
            </div>
          ) : (
            <div className={styles.chats}>
              <p>{element.name}</p>
              <div className={styles.messageRecipient}>
                <p>{element.text}</p>
              </div>
            </div>
          ),
        )}
      </div>
    </>
  );
};

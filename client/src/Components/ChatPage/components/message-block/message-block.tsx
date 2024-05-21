/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import styles from './style.module.css';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../store';

export const MessageBlock = ({ socket }: any) => {
  const profile = useSelector(
    (state: RootState) => state.auth.profileData.profile,
  );
  const [message, setMessage] = useState<string>('');

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && profile) {
      socket.emit('message', {
        text: message,
        name: profile.username,
        id: `${socket.id} - ${Math.floor(Math.random() * 100000)}`,
        socketID: socket.id,
      });
    }
    setMessage('');
  };
  return (
    <div className={styles.messageBlock}>
      <form className={styles.form} onSubmit={handleSend}>
        <input
          type="text"
          className={styles.userMessage}
          value={message}
          onChange={e => setMessage(e.target.value)}
        />
        <button className={styles.btn}>Отправить</button>
      </form>
    </div>
  );
};

import io from 'socket.io-client';

import { Body } from './components/body/body';
import { MessageBlock } from './components/message-block/message-block';
import styles from './style.module.css';
import { useEffect, useState } from 'react';

const socket = io('http://localhost:3000');

export interface Message {
  id: number;
  content: string;
  user: string;
}

function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    socket.on('response', data => {
      setMessages([...messages, data]);
    });
  }, [messages]);
  return (
    <div className={styles.chat}>
      <main className={styles.main}>
        <Body messages={messages} />
        <MessageBlock socket={socket} />
      </main>
    </div>
  );
}
export default ChatPage;

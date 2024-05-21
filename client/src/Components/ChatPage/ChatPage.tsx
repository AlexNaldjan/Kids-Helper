import io from 'socket.io-client';

import { Body } from './components/body/body';
import { MessageBlock } from './components/message-block/message-block';
import styles from './style.module.css';
import { useEffect, useState } from 'react';

const socket = io('http://localhost:3000');

export interface Message {
  id: string;
  name: string;
  text: string;
}

function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/messages');
        const data = await response.json();
        setMessages(data);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    fetchMessages();

    socket.on('response', data => {
      setMessages(prevMessages => [...prevMessages, data]);
    });
    return () => {
      socket.off('response');
    };
  }, []);
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

import socketIO from 'socket.io-client';
import { Sidebar } from './components/sidebar/sidebar';
import { Body } from './components/body/body';
import { MessageBlock } from './components/message-block/message-block';
import styles from './style.module.css';
import { useEffect, useState } from 'react';

const socket = socketIO.connect('http://localhost:3000');
function ChatPage() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on('response', data => {
      setMessages([...messages, data]);
    });
  }, [socket, messages]);
  return (
    <div className={styles.chat}>
      <Sidebar socket={socket} />
      <main className={styles.main}>
        <Body messages={messages} />
        <MessageBlock socket={socket} />
      </main>
    </div>
  );
}
export default ChatPage;

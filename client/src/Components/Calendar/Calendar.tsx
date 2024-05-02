import { useState } from 'react';
import { Button } from 'antd';
import Calendar from 'react-calendar';
import './Calendar.css';
import 'react-calendar/dist/Calendar.css';

type TaskType = {
  description: string;
};

export default function CalendarPage(): JSX.Element {
  const [selectedDate, setSelectedDate] = useState(null);
  const [eventFormVisible, setEventFormVisible] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [tasks, setTasks] = useState({});

  const handleDateClick = date => {
    setSelectedDate(date);
    setEventFormVisible(true);
  };
  function handleAddTask() {
    if (!tasks[selectedDate]) {
      setTasks({ ...tasks, [selectedDate]: [inputValue] });
    } else {
      setTasks({
        ...tasks,
        [selectedDate]: [...tasks[selectedDate], inputValue],
      });
    }
    setInputValue('');
  }

  return (
    <div>
      <Calendar value={selectedDate} onChange={handleDateClick} />
      {eventFormVisible && (
        <div>
          <h3>Запланировано на: {selectedDate.toLocaleDateString()}</h3>
          <input
            value={inputValue}
            type="text"
            onChange={e => setInputValue(e.target.value)}
          />
          <div>
            <Button type="primary" onClick={handleAddTask}>
              +
            </Button>
            {tasks[selectedDate]?.map((task, index) => (
              <div key={index} style={{ boxSizing: 'border-box' }}>
                {index + 1}. {task}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

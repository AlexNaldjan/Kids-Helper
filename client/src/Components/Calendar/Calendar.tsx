import { useState } from 'react';
import { Button } from 'antd';
import Calendar, { CalendarProps } from 'react-calendar';
import './Calendar.css';
import 'react-calendar/dist/Calendar.css';

export default function CalendarPage(): JSX.Element {
  const [selectedDate, setSelectedDate] = useState<Date | [Date, Date] | null>(
    null,
  );
  const [eventFormVisible, setEventFormVisible] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>('');
  const [tasks, setTasks] = useState<{ [key: string]: string[] }>({});

  const handleDateClick = (date: Date | Date[] | null): void => {
    if (date !== null) {
      setSelectedDate(date instanceof Date ? date : [date[0], date[1]]);
      setEventFormVisible(true);
    }
  };

  const handleAddTask = (): void => {
    if (selectedDate !== null && inputValue.trim() !== '') {
      const newTask = inputValue.trim();
      setTasks(prevTasks => ({
        ...prevTasks,
        [selectedDate instanceof Date
          ? selectedDate.toISOString()
          : selectedDate[0].toISOString()]: [
          ...(prevTasks[
            selectedDate instanceof Date
              ? selectedDate.toISOString()
              : selectedDate[0].toISOString()
          ] || []),
          newTask,
        ],
      }));
      setInputValue('');
    }
  };

  return (
    <div>
      <Calendar
        value={selectedDate}
        onChange={handleDateClick as CalendarProps['onChange']}
      />
      {eventFormVisible && selectedDate && (
        <div>
          <h3>
            Запланировано на:{' '}
            {Array.isArray(selectedDate)
              ? selectedDate[0].toLocaleDateString()
              : selectedDate.toLocaleDateString()}
          </h3>
          <input
            value={inputValue}
            type="text"
            onChange={e => setInputValue(e.target.value)}
          />
          <div>
            <Button type="primary" onClick={handleAddTask}>
              +
            </Button>
            {tasks[
              selectedDate instanceof Date
                ? selectedDate.toISOString()
                : selectedDate[0].toISOString()
            ]?.map((task, index) => (
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

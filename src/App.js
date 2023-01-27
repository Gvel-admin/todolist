import AddNewTask from './components/AddNewTask';
import TaskList from './components/TaskList';

import { useEffect, useState } from 'react';
import { v4 } from 'uuid';

import './App.css';

// ----------------------------------------------------------------------

const tasks = [
  { id: v4(), title: 'Buy bread', priority: 1, isCompleted: false },
  { id: v4(), title: 'Learn React', priority: 2, isCompleted: false },
  { id: v4(), title: 'Go to the movies', priority: 3, isCompleted: false },
  { id: v4(), title: 'Clean the house', priority: 2, isCompleted: false },
  {
    id: v4(),
    title: 'Play Dark Souls for 20 hours',
    priority: 3,
    isCompleted: true,
  },
  { id: v4(), title: 'Feed the dog', priority: 1, isCompleted: true },
  {
    id: v4(),
    title: 'Go to my best friend birthday',
    priority: 3,
    isCompleted: false,
  },
  { id: v4(), title: 'Fix the toilet', priority: 1, isCompleted: false },
  { id: v4(), title: 'Go running', priority: 3, isCompleted: false },
  {
    id: v4(),
    title: 'Return The Lord of the Rings to the public library',
    priority: 2,
    isCompleted: false,
  },
];

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export default function App() {
  const [taskList, setTaskList] = useState([]);
  const [task, setTask] = useState({});

  useEffect(() => {
    setTaskList(tasks);
  }, []);

  function handleChange(e) {
    const { name, value } = e.target;

    // Check if value is a number. Convert it to a number if it is.
    let setValue;
    if (!isNaN(value)) {
      setValue = Number(value);
    } else {
      setValue = value;
    }

    // We generate a new ID using uuid v4
    const newId = v4();

    setTask({ ...task, id: newId, [name]: setValue });
  }

  function handleSubmit(e) {
    e.preventDefault();

    const defaultStatus = false; //set a default task status
    const newTask = { ...task, isCompleted: defaultStatus };

    setTaskList([...taskList, newTask]);

    //Reset form
    e.target.reset();
    setTask({});
  }

  function handleDelete(id) {
    const filteredList = taskList.filter((task) => task.id !== id);

    setTaskList(filteredList);
  }

  function handleUpdate(id) {
    const updatedTask = taskList.find((task) => task.id === id);
    const updatedStatus = !updatedTask.isCompleted;
    updatedTask.isCompleted = updatedStatus;

    setTaskList([...taskList]);
  }

  return (
    <>
      <div>
        <h1>A page title</h1>
      </div>
      <div>
        <h2>Add a new task</h2>
        <AddNewTask handleChange={handleChange} handleSubmit={handleSubmit} />
      </div>
      <div>
        <h2>⌛ Pending tasks</h2>
        <TaskList
          taskList={taskList}
          isCompleted={false}
          handleDelete={handleDelete}
          handleUpdate={handleUpdate}
        />
      </div>
      <div>
        <h2>✅ Completed tasks</h2>
        <TaskList
          taskList={taskList}
          isCompleted={true}
          handleDelete={handleDelete}
          handleUpdate={handleUpdate}
        />
      </div>
    </>
  );
}

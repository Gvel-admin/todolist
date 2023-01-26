import AddNewTask from './components/AddNewTask';
import TaskList from './components/TaskList';

import { useEffect, useState } from 'react';
import { v4 } from 'uuid';

import './App.css';

// ----------------------------------------------------------------------

const tasks = [
  { id: v4(), title: 'Buy bread', isCompleted: false },
  { id: v4(), title: 'Learn React', isCompleted: false },
  { id: v4(), title: 'Go to the movies', isCompleted: false },
  { id: v4(), title: 'Clean the house', isCompleted: false },
  { id: v4(), title: 'Play Dark Souls for 20 hours', isCompleted: true },
  { id: v4(), title: 'Feed the dog', isCompleted: true },
  { id: v4(), title: 'Go to my best friend birthday', isCompleted: false },
  { id: v4(), title: 'Fix the toilet', isCompleted: false },
  { id: v4(), title: 'Go running', isCompleted: false },
  {
    id: v4(),
    title: 'Return The Lord of the Rings to the public library',
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
    const newId = v4();
    setTask({ ...task, id: newId, [name]: value });
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!task) return;

    setTaskList([...taskList, task]);
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
        <h2>Pending tasks</h2>
        <TaskList
          taskList={taskList}
          isCompleted={false}
          handleDelete={handleDelete}
          handleUpdate={handleUpdate}
        />
      </div>
      <div>
        <h2>Completed tasks</h2>
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

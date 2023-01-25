import { useEffect, useState } from 'react';
import './App.css';

// ----------------------------------------------------------------------

const tasks = [
  { title: 'Buy bread' },
  { title: 'Learn React' },
  { title: 'Go to the movies' },
  { title: 'Clean the house' },
  { title: 'Play Dark Souls for 20 hours' },
  { title: 'Feed the dog' },
  { title: 'Go to my best friend birthday' },
  { title: 'Fix the toilet' },
  { title: 'Go running' },
  { title: 'Return The Lord of the Rings to the public library' },
];

// ----------------------------------------------------------------------

export function AddNewTask({ handleChange, handleSubmit }) {
  return (
    <>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input
          name="title"
          type="text"
          placeholder="What do you want to achieve?"
          onChange={(e) => handleChange(e)}
        />
        <input type="submit" value="Submit" />
      </form>
    </>
  );
}

// ----------------------------------------------------------------------

export function TaskList({ taskList }) {
  // No unique ID in the initial task list, we will use the data position in array (id) instead. May cause some bugs when adding a Delete Task feature
  if (taskList.length === 0) return 'No task';
  return (
    <>
      {taskList.map((task, id) => (
        <ul key={id}>
          <li>{task.title}</li>
        </ul>
      ))}
    </>
  );
}

// ----------------------------------------------------------------------

export default function App() {
  const [taskList, setTaskList] = useState([]);
  const [task, setTask] = useState({});

  useEffect(() => {
    // Load data once DOM is loaded
    setTaskList(tasks);
  }, []);

  function handleChange(e) {
    // Anticipation for a more complexe form, we update the task object based on its names and values
    // We don't check for empty input for now (not asked)
    const { name, value } = e.target;
    setTask({ ...task, [name]: value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    setTaskList([...taskList, task]); // Update the task list when the form is submitted.
    e.target.reset();
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
        <h2>To do list</h2>
        <TaskList taskList={taskList} />
      </div>
    </>
  );
}

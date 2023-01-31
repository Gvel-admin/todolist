//Components
import AddNewTask from './components/AddNewTask';
import TaskList from './components/TaskList';
import Filter from './components/Filter';
// ----------------------------------------------------------------------
//Data
import { generateTasks } from './data/tasks';
import { filters } from './data/filters';
// ----------------------------------------------------------------------
//Functions
import { useEffect, useState } from 'react';
import { v4 } from 'uuid';
import { convertDateToMS } from './helpers/datesHandlers';
// ----------------------------------------------------------------------

export default function App() {
  const [initialTaskList, setInitialTaskList] = useState([]);
  const [taskList, setTaskList] = useState([]);
  const [task, setTask] = useState({});
  const [filter, setFilter] = useState(filters);

  useEffect(() => {
    setTaskList(generateTasks());
    setInitialTaskList(generateTasks());
  }, []);

  const updateTaskState = (e) => {
    const { name, value } = e.target;

    setTask({
      ...task,
      id: v4(),
      [name]: !isNaN(value) ? Number(value) : value,
    });
  };

  const submitNewTask = (e) => {
    e.preventDefault();

    setTaskList([
      ...taskList,
      { ...task, isCompleted: false, creationDate: new Date().toISOString() },
    ]);
    e.target.reset(); //TODO check if OP
    setTask({});
    setFilter(filters);
  };

  const deleteSelectedTask = (id) => {
    setTaskList(taskList.filter((task) => task.id !== id));
  };

  const updateSelectedTask = (id) => {
    const updatedTask = taskList.find((task) => task.id === id);
    const updatedStatus = !updatedTask.isCompleted;
    updatedTask.isCompleted = updatedStatus;

    setTaskList([...taskList]);
  };

  const handleFilterUpdate = (e) => {
    const { name, value, type } = e.target;

    setFilter({
      ...filter,
      [name]: type === 'checkbox' ? e.target.checked : value,
    });
  };

  const handleFilterSubmit = (e) => {
    e.preventDefault();

    const { title, priority, lateness, isCompleted, minDate, maxDate } = filter;

    // Check if all inputs are empty, abort the function if it is
    if (
      !title &&
      !priority &&
      !lateness &&
      !isCompleted &&
      !minDate &&
      !maxDate
    )
      return;

    // Unecessary comment for prod (explaination):
    // For this filter, we will create a filtered list to allow filter accumulation, based on the initialTaskList and not the taskList.
    // Everytime we need to look for a value, we search it through the initialTaskList, that way, we avoid reducing the result every time we search for something
    // Because each filter handles different data format, we check one by one the filters
    // Everytime we activate a new filter, we "add" it to the filteredList.

    let filteredList = initialTaskList;

    if (title) {
      filteredList = filteredList.filter((task) => {
        return task.title.toLowerCase().includes(title.toLowerCase());
      });
    }

    if (priority) {
      filteredList = filteredList.filter((task) => {
        return task.priority === +priority;
      });
    }

    if (lateness) {
      filteredList = filteredList.filter((task) => {
        const todaytoMs = convertDateToMS();
        const creationDateToMS = convertDateToMS(task.creationDate);

        let condition;
        if (lateness === 'finished') condition = creationDateToMS > todaytoMs;
        if (lateness === 'pending') condition = creationDateToMS <= todaytoMs;
        return condition;
      });
    }
    if (minDate && maxDate) {
      filteredList = filteredList.filter((task) => {
        const creationDateToMS = convertDateToMS(task.creationDate);
        const minDateToMS = convertDateToMS(minDate);
        const maxDateToMS = convertDateToMS(maxDate);

        return (
          creationDateToMS >= minDateToMS && creationDateToMS <= maxDateToMS
        );
      });
    }

    if (typeof isCompleted === 'boolean') {
      filteredList = filteredList.filter((task) => {
        return task.isCompleted === isCompleted;
      });
    }

    setTaskList(filteredList);
  };

  const resetFilters = (e) => {
    e.preventDefault();
    setFilter(filters); //reset filters
    setTaskList(initialTaskList); //reset taskList
  };

  return (
    <>
      <div>
        <h1>I am ugly (for now...)</h1>
      </div>
      <hr />
      <div>
        <h2>Add a new task</h2>
        <AddNewTask
          updateTaskState={updateTaskState}
          submitNewTask={submitNewTask}
        />
      </div>
      <hr />
      <div>
        <h2>🔍 Search for a task</h2>
        <Filter
          handleFilterUpdate={handleFilterUpdate}
          handleFilterSubmit={handleFilterSubmit}
          resetFilters={resetFilters}
          filter={filter}
        />
      </div>
      <hr />
      <div>
        <h2>⌛ Pending tasks</h2>
        <TaskList
          taskList={taskList}
          isCompleted={false}
          deleteSelectedTask={deleteSelectedTask}
          updateSelectedTask={updateSelectedTask}
        />
      </div>
      <hr />
      <div>
        <h2>✅ Completed tasks</h2>
        <TaskList
          taskList={taskList}
          isCompleted={true}
          deleteSelectedTask={deleteSelectedTask}
          updateSelectedTask={updateSelectedTask}
        />
      </div>
    </>
  );
}

export default function AddNewTask({ updateTaskState, submitNewTask }) {
  const priorityOptions = [
    { level: 'Select a priority', value: '' },
    { level: 'low', value: 3 },
    { level: 'medium', value: 2 },
    { level: 'high', value: 1 },
  ];

  return (
    <>
      <form onSubmit={(e) => submitNewTask(e)}>
        <input
          name="title"
          type="text"
          placeholder="What do you want to achieve?"
          onChange={(e) => updateTaskState(e)}
          required
        />
        <select name="priority" onChange={(e) => updateTaskState(e)} required>
          {priorityOptions.map((priority) => (
            <option key={priority.value} value={priority.value}>
              {priority.level}
            </option>
          ))}
        </select>
        <input type="submit" value="Submit" />
      </form>
    </>
  );
}

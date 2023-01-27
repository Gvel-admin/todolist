export default function AddNewTask({ handleChange, handleSubmit }) {
  const taskPriorities = [
    { level: 'Select a priority', value: '' },
    { level: 'low', value: 3 },
    { level: 'medium', value: 2 },
    { level: 'high', value: 1 },
  ];

  return (
    <>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input
          name="title"
          type="text"
          placeholder="What do you want to achieve?"
          onChange={(e) => handleChange(e)}
          required
        />
        <select name="priority" onChange={(e) => handleChange(e)} required>
          {taskPriorities.map((priority) => (
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

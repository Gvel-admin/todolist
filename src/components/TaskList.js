export default function TaskList({ taskList, handleDelete, handleUpdate }) {
  const tableHeaders = ['Title', 'Delete'];

  if (taskList.length === 0) return 'No task';
  return (
    <>
      <table>
        <thead>
          <tr>
            {tableHeaders.map((tableHeader, id) => (
              <th key={id}>{tableHeader}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {taskList.map((task) => (
            <tr key={task.id}>
              <td>{task.title}</td>
              <td>
                <button onClick={() => handleDelete(task.id)}>x</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

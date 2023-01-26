export default function TaskList({
  taskList,
  handleDelete,
  handleUpdate,
  isCompleted,
}) {
  const tableHeaders = ['Title', 'Complete', 'Delete'];

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
          {taskList
            .filter((task) => task.isCompleted === isCompleted)
            .map((task) => {
              const { id, title, isCompleted } = task;
              return (
                <tr key={id}>
                  <td style={{ cursor: 'auto' }}>{title}</td>
                  <td style={{ textAlign: 'center' }}>
                    <input
                      type="checkbox"
                      name="isComplete"
                      checked={isCompleted}
                      onChange={() => handleUpdate(id)}
                      style={{ cursor: 'pointer' }}
                    />
                  </td>
                  <td style={{ textAlign: 'center' }}>
                    <button
                      onClick={() => handleDelete(id)}
                      style={{ cursor: 'pointer' }}
                    >
                      x
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </>
  );
}

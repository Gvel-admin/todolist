export default function TaskList({
  taskList,
  handleDelete,
  handleUpdate,
  isCompleted,
}) {
  const tableHeaders = ['Title', 'Priority', 'Complete', 'Delete'];

  function getPriority(priorityId) {
    // convert the priority lvl (integer) to string
    let returnedStatus;
    switch (priorityId) {
      case 1:
        returnedStatus = 'High';
        break;
      case 2:
        returnedStatus = 'Medium';
        break;
      case 3:
        returnedStatus = 'Low';
        break;
      default:
        returnedStatus = '-';
    }
    return returnedStatus;
  }

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
            //list.sort((a, b) => a.priority - b.priority);
            .sort((a, b) => a.priority - b.priority)
            .filter((task) => task.isCompleted === isCompleted)
            .map((task) => {
              const { id, title, priority, isCompleted } = task;
              return (
                <tr key={id}>
                  <td style={{ cursor: 'auto' }}>{title}</td>
                  <td>
                    <span
                      className={`priority priority-${getPriority(
                        priority
                      ).toLowerCase()}`}
                    >
                      {getPriority(priority)}
                    </span>
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      name="isComplete"
                      checked={isCompleted}
                      onChange={() => handleUpdate(id)}
                      style={{ cursor: 'pointer' }}
                    />
                  </td>
                  <td>
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

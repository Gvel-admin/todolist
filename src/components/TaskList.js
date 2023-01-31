import { useMemo } from 'react';
import { convertDateToMS } from '../helpers/datesHandlers';
import { formatDate } from '../helpers/formaters';

// ----------------------------------------------------------------------

const priorityMap = {
  1: 'High',
  2: 'Medium',
  3: 'Low',
};

const tableHeaders = [
  'Title',
  'Priority',
  'Creation date',
  'Lateness',
  'Complete',
  'Delete',
];

export default function TaskList(props) {
  const { taskList, deleteSelectedTask, updateSelectedTask, isCompleted } =
    props;

  const getPriority = (priorityId) => priorityMap[priorityId] || '-';

  const getLateness = useMemo(
    () => (creationDate) => {
      const todayToMS = convertDateToMS();
      const creationDateToMS = convertDateToMS(creationDate);

      return creationDateToMS <= todayToMS ? 'Pending' : 'Finished';
    },
    []
  );

  const dedicatedTaskList = taskList
    .filter((task) => task.isCompleted === isCompleted)
    .sort((a, b) => a.priority - b.priority);

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
          {dedicatedTaskList.length > 0 ? (
            dedicatedTaskList.map((task) => {
              const { id, title, priority, isCompleted, creationDate } = task;
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
                  <td>{formatDate(creationDate)}</td>
                  <td>{getLateness(creationDate)}</td>
                  <td>
                    <input
                      type="checkbox"
                      name="isComplete"
                      checked={isCompleted}
                      onChange={() => updateSelectedTask(id)}
                      style={{ cursor: 'pointer' }}
                    />
                  </td>
                  <td>
                    <button
                      onClick={() => deleteSelectedTask(id)}
                      style={{ cursor: 'pointer' }}
                    >
                      x
                    </button>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td>No task</td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
}

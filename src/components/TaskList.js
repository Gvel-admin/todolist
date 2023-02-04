import {
  Alert,
  Checkbox,
  Chip,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
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

export default function TaskList({
  taskList,
  deleteSelectedTask,
  updateSelectedTask,
  isCompleted,
}) {
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
      <Table size="small">
        <TableHead>
          <TableRow>
            {tableHeaders.map((tableHeader, id) => (
              <TableCell key={id}>{tableHeader}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {dedicatedTaskList.length > 0 ? (
            dedicatedTaskList.map((task) => {
              const { id, title, priority, isCompleted, creationDate } = task;
              return (
                <TableRow key={id}>
                  <TableCell>
                    <Typography variant="span" fontWeight={'bold'}>
                      {title}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Chip
                      size="small"
                      label={getPriority(priority)}
                      className={`priority priority-${getPriority(
                        priority
                      ).toLowerCase()}`}
                    />
                  </TableCell>
                  <TableCell>{formatDate(creationDate)}</TableCell>
                  <TableCell>
                    <Chip label={getLateness(creationDate)} size="small" />
                  </TableCell>
                  <TableCell>
                    <Checkbox
                      name="isComplete"
                      checked={isCompleted}
                      onChange={() => updateSelectedTask(id)}
                    />
                  </TableCell>
                  <TableCell>
                    <IconButton
                      aria-label="delete"
                      onClick={() => deleteSelectedTask(id)}
                      style={{ cursor: 'pointer' }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              );
            })
          ) : (
            <TableRow>
              <TableCell
                colSpan={tableHeaders.length}
                sx={{ border: 0 }}
                align="center"
              >
                <Alert severity="info">No task</Alert>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  );
}

import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';

export default function AddNewTask({ updateTaskState, submitNewTask }) {
  const priorityOptions = [
    { level: 'low', value: 3 },
    { level: 'medium', value: 2 },
    { level: 'high', value: 1 },
  ];

  return (
    <>
      <form onSubmit={(e) => submitNewTask(e)}>
        <TextField
          name="title"
          variant="outlined"
          label="Task title"
          onChange={(e) => updateTaskState(e)}
          required
        />
        <FormControl>
          <InputLabel>Priority</InputLabel>
          <Select
            name="priority"
            label="Priority"
            onChange={(e) => updateTaskState(e)}
            required
          >
            {priorityOptions.map((priority) => (
              <MenuItem key={priority.value} value={priority.value}>
                {priority.level}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Button variant="contained" type="submit">
          Submit
        </Button>
      </form>
    </>
  );
}

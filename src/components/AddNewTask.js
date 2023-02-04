import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from '@mui/material';

const priorityOptions = [
  { level: 'low', value: 3 },
  { level: 'medium', value: 2 },
  { level: 'high', value: 1 },
];

export default function AddNewTask({ updateTaskState, submitNewTask }) {
  return (
    <>
      <form onSubmit={(e) => submitNewTask(e)}>
        <Stack direction="row" spacing={2} sx={{ my: 2 }}>
          <TextField
            name="title"
            variant="outlined"
            label="Task title"
            onChange={(e) => updateTaskState(e)}
            required
            sx={{ width: 250 }}
          />
          <FormControl>
            <InputLabel>Priority</InputLabel>
            <Select
              defaultValue=""
              name="priority"
              label="Priority"
              onChange={(e) => updateTaskState(e)}
              required
              sx={{ width: 250 }}
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
        </Stack>
      </form>
    </>
  );
}

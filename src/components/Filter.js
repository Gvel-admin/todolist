import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import { Stack } from '@mui/system';

const priorityOptions = [
  { label: 'low', value: 3 },
  { label: 'medium', value: 2 },
  { label: 'high', value: 1 },
];

const latenessyOptions = [
  { label: 'Pending', value: 'pending' },
  { label: 'Finished', value: 'finished' },
];

export default function Filter({
  handleFilterUpdate,
  handleFilterSubmit,
  resetFilters,
  filter,
}) {
  return (
    <>
      <form
        onSubmit={(e) => handleFilterSubmit(e)}
        onReset={(e) => resetFilters(e)}
      >
        <Stack direction="row" spacing={2} sx={{ my: 2 }}>
          <TextField
            fullWidth
            name="title"
            type="search"
            label="Search for a task"
            value={filter.title}
            onChange={(e) => handleFilterUpdate(e)}
          />

          <FormControl fullWidth>
            <InputLabel>Priority</InputLabel>
            <Select
              name="priority"
              label="Priority"
              onChange={(e) => handleFilterUpdate(e)}
              value={filter.priority}
            >
              {priorityOptions.map((priority) => (
                <MenuItem key={priority.value} value={priority.value}>
                  {priority.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            fullWidth
            label="Min date"
            value={filter.minDate}
            name="minDate"
            type="date"
            onChange={(e) => handleFilterUpdate(e)}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            fullWidth
            label="Max date"
            value={filter.maxDate}
            name="maxDate"
            type="date"
            onChange={(e) => handleFilterUpdate(e)}
            InputLabelProps={{ shrink: true }}
          />
          <FormControl fullWidth>
            <InputLabel>Lateness</InputLabel>
            <Select
              name="lateness"
              label="Lateness"
              onChange={(e) => handleFilterUpdate(e)}
              value={filter.lateness}
            >
              {latenessyOptions.map((lateness) => (
                <MenuItem key={lateness.value} value={lateness.value}>
                  {lateness.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  checked={filter.isCompleted}
                  name="isCompleted"
                  onChange={(e) => handleFilterUpdate(e)}
                />
              }
              label="Is Completed:"
              labelPlacement="start"
            />
          </FormGroup>
        </Stack>
        <Stack direction="row" spacing={2} justifyContent="flex-end">
          <Button variant="contained" type="submit">
            Search
          </Button>
          <Button variant="outlined" type="reset">
            Reset filters
          </Button>
        </Stack>
      </form>
    </>
  );
}

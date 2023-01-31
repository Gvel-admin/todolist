const priorityOptions = [
  { label: 'Select a priority', value: '' },
  { label: 'low', value: 3 },
  { label: 'medium', value: 2 },
  { label: 'high', value: 1 },
];

const latenessyOptions = [
  { label: 'Select a lateness', value: '' },
  { label: 'Pending', value: 'pending' },
  { label: 'Finished', value: 'finished' },
];

export default function Filter(props) {
  const { handleFilterUpdate, handleFilterSubmit, resetFilters, filter } =
    props;

  return (
    <>
      <form
        onSubmit={(e) => handleFilterSubmit(e)}
        onReset={(e) => resetFilters(e)}
      >
        <input
          name="title"
          type="search"
          placeholder="Search for a task"
          value={filter.title}
          onChange={(e) => handleFilterUpdate(e)}
        />
        <select
          name="priority"
          onChange={(e) => handleFilterUpdate(e)}
          value={filter.priority}
        >
          {priorityOptions.map((priority) => (
            <option key={priority.value} value={priority.value}>
              {priority.label}
            </option>
          ))}
        </select>
        <label>Min date: </label>
        <input
          value={filter.minDate}
          name="minDate"
          type="date"
          onChange={(e) => handleFilterUpdate(e)}
        />
        <label>Max date: </label>
        <input
          value={filter.maxDate}
          name="maxDate"
          type="date"
          onChange={(e) => handleFilterUpdate(e)}
        />
        <select
          name="lateness"
          onChange={(e) => handleFilterUpdate(e)}
          value={filter.lateness}
        >
          {latenessyOptions.map((lateness) => (
            <option key={lateness.value} value={lateness.value}>
              {lateness.label}
            </option>
          ))}
        </select>
        <label>Completed task:</label>
        <input
          checked={filter.isCompleted}
          name="isCompleted"
          type="checkbox"
          onChange={(e) => handleFilterUpdate(e)}
        />
        <input type="submit" value="Search" />
        <input type="reset" value="Reset filters" />
      </form>
    </>
  );
}

export default function AddNewTask({ handleChange, handleSubmit }) {
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
        <input type="submit" value="Submit" />
      </form>
    </>
  );
}

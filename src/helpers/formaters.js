// Format date to fr format (dd/mm/yyyy)
export const formatDate = (date) => {
  const theDate = new Date(date);
  return new Intl.DateTimeFormat('fr-FR').format(theDate);
};

export const toStringDate = (date) => {
  const stringDate = date.toISOString().slice(0, 10);
  return stringDate;
};

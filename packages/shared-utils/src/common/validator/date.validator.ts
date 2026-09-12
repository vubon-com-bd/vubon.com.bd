/**
 * Date Validator.
 */
export const isValidDate = (date: Date | string | number): boolean => {
  const d = new Date(date);
  return d instanceof Date && !isNaN(d.getTime());
};

export const isDateInFuture = (date: Date | string | number): boolean => {
  const d = new Date(date);
  if (!isValidDate(d)) return false;
  return d.getTime() > Date.now();
};

export const isDateInPast = (date: Date | string | number): boolean => {
  const d = new Date(date);
  if (!isValidDate(d)) return false;
  return d.getTime() < Date.now();
};

export const isToday = (date: Date | string | number): boolean => {
  const d = new Date(date);
  if (!isValidDate(d)) return false;
  const now = new Date();
  return (
    d.getFullYear() === now.getFullYear() &&
    d.getMonth() === now.getMonth() &&
    d.getDate() === now.getDate()
  );
};

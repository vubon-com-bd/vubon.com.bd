export const isValidDate = (date: Date | string): boolean => {
  const d = new Date(date);
  return d instanceof Date && !isNaN(d.getTime());
};

export const isDateInFuture = (date: Date): boolean => {
  return date > new Date();
};

export const isDateInPast = (date: Date): boolean => {
  return date < new Date();
};

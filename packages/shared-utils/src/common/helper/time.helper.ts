export const getTimeDifference = (time1: Date, time2: Date): number => {
  return Math.abs(time2.getTime() - time1.getTime());
};

export const addHours = (date: Date, hours: number): Date => {
  const result = new Date(date);
  result.setHours(result.getHours() + hours);
  return result;
};

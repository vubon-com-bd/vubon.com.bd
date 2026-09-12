/**
 * Time Helper — time-specific operations.
 * Note: Date operations (addDays, startOfDay, endOfDay) live in date.helper.ts.
 */
export const getTimeDifference = (time1: Date, time2: Date): number =>
  Math.abs(time2.getTime() - time1.getTime());

export const addHours = (date: Date, hours: number): Date => {
  if (!Number.isFinite(hours)) throw new Error('Hours must be a finite number');
  const result = new Date(date);
  result.setHours(result.getHours() + hours);
  return result;
};

export const addMinutes = (date: Date, minutes: number): Date =>
  new Date(date.getTime() + minutes * 60 * 1000);

export const addSeconds = (date: Date, seconds: number): Date =>
  new Date(date.getTime() + seconds * 1000);

export const subtractHours = (date: Date, hours: number): Date => addHours(date, -hours);

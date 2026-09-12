/**
 * Relative Time Formatter.
 */
const MINUTE = 60;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;
const WEEK = 7 * DAY;
const MONTH = 30 * DAY;
const YEAR = 365 * DAY;

export const formatRelativeTime = (
  date: Date | string | number,
  now: Date = new Date()
): string => {
  const d = new Date(date);
  if (isNaN(d.getTime())) return 'invalid date';
  const diffSec = Math.floor((now.getTime() - d.getTime()) / 1000);

  if (diffSec < 0) return 'in the future';
  if (diffSec < 45) return 'just now';

  if (diffSec < HOUR) {
    const m = Math.floor(diffSec / MINUTE);
    return `${m} minute${m === 1 ? '' : 's'} ago`;
  }
  if (diffSec < DAY) {
    const h = Math.floor(diffSec / HOUR);
    return `${h} hour${h === 1 ? '' : 's'} ago`;
  }
  if (diffSec < WEEK) {
    const dd = Math.floor(diffSec / DAY);
    return `${dd} day${dd === 1 ? '' : 's'} ago`;
  }
  if (diffSec < MONTH) {
    const w = Math.floor(diffSec / WEEK);
    return `${w} week${w === 1 ? '' : 's'} ago`;
  }
  if (diffSec < YEAR) {
    const mo = Math.floor(diffSec / MONTH);
    return `${mo} month${mo === 1 ? '' : 's'} ago`;
  }
  const y = Math.floor(diffSec / YEAR);
  return `${y} year${y === 1 ? '' : 's'} ago`;
};

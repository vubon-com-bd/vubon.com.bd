// DateTime formatter functions
export const formatDateTime = (date: Date): string => {
  return date.toISOString().replace('T', ' ').substring(0, 19);
};

export const formatDateTimeShort = (date: Date): string => {
  return date.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

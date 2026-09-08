// Date formatter functions
export const formatDate = (date: Date): string => {
  return date.toISOString().split('T')[0];
};

export const formatDateShort = (date: Date): string => {
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};

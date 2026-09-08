export const formatTime = (time: Date | string): string => {
  const d = new Date(time);
  return d.toLocaleTimeString('bn-BD');
};

export const formatTime12Hour = (time: Date): string => {
  return time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
};

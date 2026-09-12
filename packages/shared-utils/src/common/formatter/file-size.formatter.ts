/**
 * File Size Formatter.
 */
const UNITS = ['B', 'KB', 'MB', 'GB', 'TB', 'PB'];

export const formatFileSize = (bytes: number, decimals: number = 2): string => {
  if (!Number.isFinite(bytes) || bytes < 0) return '0 B';
  if (bytes === 0) return '0 B';
  const k = 1024;
  const i = Math.min(Math.floor(Math.log(bytes) / Math.log(k)), UNITS.length - 1);
  const value = bytes / Math.pow(k, i);
  return `${value.toFixed(decimals)} ${UNITS[i]}`;
};

export const parseFileSize = (input: string): number => {
  const match = /^([\d.]+)\s*(B|KB|MB|GB|TB|PB)$/i.exec(input.trim());
  if (!match) throw new Error('Invalid file size format');
  const value = parseFloat(match[1]!);
  const unit = match[2]!.toUpperCase();
  const i = UNITS.indexOf(unit);
  if (i === -1) throw new Error(`Unknown unit: ${unit}`);
  return value * Math.pow(1024, i);
};

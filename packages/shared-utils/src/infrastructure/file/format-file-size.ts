/**
 * Format bytes into human-readable size (KB, MB, GB)
 * @module shared-utils/infrastructure/file
 */
export function formatFileSize(bytes: number, decimals = 2): string {
  if (!Number.isFinite(bytes) || bytes < 0) {
    throw new RangeError('bytes must be a non-negative finite number');
  }
  if (bytes === 0) return '0 B';

  const k = 1024;
  const units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB'];
  const i = Math.min(Math.floor(Math.log(bytes) / Math.log(k)), units.length - 1);
  const value = bytes / Math.pow(k, i);
  return `${value.toFixed(decimals)} ${units[i]}`;
}

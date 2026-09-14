/**
 * Extract file extension (lowercase, no dot). Returns '' if none.
 * @module shared-utils/infrastructure/file
 */
export function getExtension(filename: string): string {
  const lastDot = filename.lastIndexOf('.');
  if (lastDot <= 0 || lastDot === filename.length - 1) return '';
  return filename.slice(lastDot + 1).toLowerCase();
}

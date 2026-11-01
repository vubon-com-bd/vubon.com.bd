/**
 * Sanitize a filename: strip unsafe chars, prevent traversal
 * @module shared-utils/infrastructure/file
 */
export function sanitizeFilename(filename: string, maxLength = 255): string {
  if (!Number.isInteger(maxLength) || maxLength < 1) {
    throw new RangeError('maxLength must be a positive integer');
  }

  // Remove path separators and control chars
  let safe = filename
    .replace(/[/\\]/g, '_')
    .replace(/[\x00-\x1f\x7f]/g, '')
    .replace(/^\.+/, '_')
    .trim();

  // Collapse repeated underscores
  safe = safe.replace(/_{2,}/g, '_');

  if (safe.length > maxLength) {
    const ext = getExtension(safe);
    const baseLength = maxLength - (ext ? ext.length + 1 : 0);
    const base = ext ? safe.slice(0, safe.length - ext.length - 1) : safe;
    safe = ext ? `${base.slice(0, Math.max(1, baseLength))}.${ext}` : safe.slice(0, maxLength);
  }

  return safe || 'file';
}

function getExtension(filename: string): string {
  const lastDot = filename.lastIndexOf('.');
  if (lastDot <= 0 || lastDot === filename.length - 1) return '';
  return filename.slice(lastDot + 1).toLowerCase();
}

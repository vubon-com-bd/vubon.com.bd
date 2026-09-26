/**
 * Check if filename is an archive
 * @module shared-utils/infrastructure/file
 */
import { getExtension } from './get-extension';

const ARCHIVE_EXTS = new Set(['zip', 'rar', '7z', 'tar', 'gz', 'bz2', 'xz', 'tgz']);

export function isArchive(filename: string): boolean {
  return ARCHIVE_EXTS.has(getExtension(filename));
}

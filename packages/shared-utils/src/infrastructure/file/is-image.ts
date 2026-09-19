/**
 * Check if filename is an image
 * @module shared-utils/infrastructure/file
 */
import { IMAGE_FORMAT } from '@vubon/shared-constants/common';
import { getExtension } from './get-extension';

const IMAGE_EXTS = new Set(Object.values(IMAGE_FORMAT).map((v) => v.toLowerCase()));

export function isImage(filename: string): boolean {
  return IMAGE_EXTS.has(getExtension(filename));
}

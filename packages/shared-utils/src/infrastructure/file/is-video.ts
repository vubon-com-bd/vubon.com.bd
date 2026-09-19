/**
 * Check if filename is a video
 * @module shared-utils/infrastructure/file
 */
import { VIDEO_FORMAT } from '@vubon/shared-constants/common';
import { getExtension } from './get-extension';

const VIDEO_EXTS = new Set(Object.values(VIDEO_FORMAT).map((v) => v.toLowerCase()));

export function isVideo(filename: string): boolean {
  return VIDEO_EXTS.has(getExtension(filename));
}

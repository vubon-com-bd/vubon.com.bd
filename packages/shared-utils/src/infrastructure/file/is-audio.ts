/**
 * Check if filename is an audio file
 * @module shared-utils/infrastructure/file
 */
import { AUDIO_FORMAT } from '@vubon/shared-constants/common';
import { getExtension } from './get-extension';

const AUDIO_EXTS = new Set(Object.values(AUDIO_FORMAT).map((v) => v.toLowerCase()));

export function isAudio(filename: string): boolean {
  return AUDIO_EXTS.has(getExtension(filename));
}

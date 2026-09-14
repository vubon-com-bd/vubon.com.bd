/**
 * Get MIME type from filename extension
 * @module shared-utils/infrastructure/file
 *
 * Values আসে shared-constants/common থেকে image/video/audio/document constants।
 */
import { IMAGE_MIME, VIDEO_MIME, AUDIO_MIME, DOCUMENT_MIME } from '@vubon/shared-constants/common';
import { getExtension } from './get-extension';

const MIME_MAP: Record<string, string> = {};

function buildMap(): void {
  for (const [key, value] of Object.entries(IMAGE_MIME)) {
    MIME_MAP[key.toLowerCase()] = value as string;
  }
  for (const [key, value] of Object.entries(VIDEO_MIME)) {
    MIME_MAP[key.toLowerCase()] = value as string;
  }
  for (const [key, value] of Object.entries(AUDIO_MIME)) {
    MIME_MAP[key.toLowerCase()] = value as string;
  }
  for (const [key, value] of Object.entries(DOCUMENT_MIME)) {
    MIME_MAP[key.toLowerCase()] = value as string;
  }
}
buildMap();

export function getMimeType(filename: string): string {
  const ext = getExtension(filename);
  return MIME_MAP[ext] ?? 'application/octet-stream';
}

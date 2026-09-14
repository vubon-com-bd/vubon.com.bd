/**
 * Check if filename is a document
 * @module shared-utils/infrastructure/file
 */
import { DOCUMENT_FORMAT } from '@vubon/shared-constants/common';
import { getExtension } from './get-extension';

const DOC_EXTS = new Set(Object.values(DOCUMENT_FORMAT).map((v) => v.toLowerCase()));

export function isDocument(filename: string): boolean {
  return DOC_EXTS.has(getExtension(filename));
}

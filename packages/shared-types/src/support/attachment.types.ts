/**
 * Attachment Types
 * @module shared-types/support
 */

import type { Url } from '../common/primitives';

export interface Attachment {
  readonly id: string;
  readonly messageId?: string;
  readonly ticketId?: string;
  readonly fileName: string;
  readonly fileUrl: Url;
  readonly fileSize: number;
  readonly mimeType: string;
  readonly thumbnailUrl?: Url;
  readonly uploadedBy: string;
  readonly uploadedAt: string;
}

export interface AttachmentPublic {
  readonly id: string;
  readonly fileName: string;
  readonly fileUrl: Url;
  readonly fileSize: number;
  readonly mimeType: string;
  readonly thumbnailUrl?: Url;
}

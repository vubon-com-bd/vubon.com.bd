import { BaseEntity } from '../common/base.types';
import { ATTACHMENT } from '@vubon/shared-constants/src/support/attachment.constants';
import { Message } from './message.types';

export interface Attachment extends BaseEntity {
  attachmentId: string;
  messageId: string;
  message: Message;
  type: keyof typeof ATTACHMENT.TYPES | string;
  name: string;
  filename: string;
  url: string;
  size: number;
  mimeType: string;
  extension: string;
  width?: number;
  height?: number;
  duration?: number;
  metadata: Record<string, unknown>;
  uploadedAt: Date;
}

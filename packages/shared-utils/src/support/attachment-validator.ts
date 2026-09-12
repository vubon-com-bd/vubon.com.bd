import { ATTACHMENT } from '@vubon/shared-constants/src/support/attachment.constants';

export interface AttachmentInput {
  messageId: string;
  name: string;
  url: string;
  type: string;
  size: number;
}

export const validateAttachment = (
  attachment: Partial<AttachmentInput>
): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  if (!attachment.messageId) errors.push('Message ID is required');
  if (!attachment.name) errors.push('Attachment name is required');
  if (!attachment.url) errors.push('Attachment URL is required');
  if (attachment.type && !Object.keys(ATTACHMENT.TYPES).includes(attachment.type)) {
    errors.push('Invalid attachment type');
  }
  if (attachment.size !== undefined && attachment.size < 0) {
    errors.push('Size cannot be negative');
  }
  return { isValid: errors.length === 0, errors };
};

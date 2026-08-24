/**
 * Attachment Constants Index
 * Export all attachment constants and types for easy importing
 */

// Attachment Constants
export {
  ATTACHMENT,
  attachmentGetTypeLabel,
  attachmentGetStatusLabel,
  attachmentGetMimeType,
  attachmentIsUploaded,
  attachmentIsFailed,
  attachmentIsProcessing,
  attachmentGetTypeFromMime,
} from './attachment.constants';

export type { AttachmentType, AttachmentStatus, AttachmentMimeType } from './attachment.constants';

// Attachment Type Constants
export {
  ATTACHMENT_TYPE,
  attachmentTypeGetLabel,
  attachmentTypeGetIcon,
  attachmentTypeGetColor,
  attachmentTypeGetSizeLimit,
  attachmentTypeGetCategory,
} from './attachment-type.constants';

export type {
  AttachmentTypeType,
  AttachmentTypeCategory,
  AttachmentTypeIcon,
  AttachmentTypeColor,
  AttachmentTypeSizeLimit,
} from './attachment-type.constants';

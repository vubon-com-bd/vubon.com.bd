/**
 * Attachment Constants
 * Configuration for file attachments in support system
 */

export const ATTACHMENT = {
  // Attachment Types
  TYPES: {
    IMAGE: 'image',
    VIDEO: 'video',
    AUDIO: 'audio',
    DOCUMENT: 'document',
    SPREADSHEET: 'spreadsheet',
    PRESENTATION: 'presentation',
    PDF: 'pdf',
    ARCHIVE: 'archive',
    CODE: 'code',
    OTHER: 'other',
  } as const,

  // Attachment Statuses
  STATUS: {
    PENDING: 'pending',
    UPLOADING: 'uploading',
    UPLOADED: 'uploaded',
    PROCESSING: 'processing',
    PROCESSED: 'processed',
    FAILED: 'failed',
    DELETED: 'deleted',
  } as const,

  // Attachment Limits
  LIMITS: {
    MAX_SIZE: 10485760, // 10MB
    MAX_TOTAL_SIZE: 52428800, // 50MB
    MAX_COUNT: 10,
    MAX_PER_DAY: 50,
    MAX_DIMENSION_WIDTH: 4096,
    MAX_DIMENSION_HEIGHT: 4096,
  } as const,

  // MIME Types
  MIME_TYPES: {
    // Images
    JPEG: 'image/jpeg',
    PNG: 'image/png',
    GIF: 'image/gif',
    WEBP: 'image/webp',
    SVG: 'image/svg+xml',
    BMP: 'image/bmp',

    // Documents
    PDF: 'application/pdf',
    DOC: 'application/msword',
    DOCX: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    TXT: 'text/plain',
    RTF: 'application/rtf',

    // Spreadsheets
    XLS: 'application/vnd.ms-excel',
    XLSX: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    CSV: 'text/csv',

    // Presentations
    PPT: 'application/vnd.ms-powerpoint',
    PPTX: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',

    // Archives
    ZIP: 'application/zip',
    RAR: 'application/x-rar-compressed',
    '7Z': 'application/x-7z-compressed',
    GZIP: 'application/gzip',

    // Code
    JSON: 'application/json',
    XML: 'application/xml',
    YAML: 'application/x-yaml',
    JS: 'application/javascript',
    TS: 'application/typescript',
    PY: 'text/x-python',
    JAVA: 'text/x-java',
    CS: 'text/x-csharp',

    // Video
    MP4: 'video/mp4',
    WEBM: 'video/webm',
    AVI: 'video/x-msvideo',
    MOV: 'video/quicktime',

    // Audio
    MP3: 'audio/mpeg',
    WAV: 'audio/wav',
    OGG: 'audio/ogg',
    AAC: 'audio/aac',
  } as const,

  // File Extensions
  EXTENSIONS: {
    IMAGE: ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg', '.bmp'],
    VIDEO: ['.mp4', '.webm', '.avi', '.mov', '.mkv'],
    AUDIO: ['.mp3', '.wav', '.ogg', '.aac', '.flac'],
    DOCUMENT: ['.pdf', '.doc', '.docx', '.txt', '.rtf'],
    SPREADSHEET: ['.xls', '.xlsx', '.csv'],
    PRESENTATION: ['.ppt', '.pptx'],
    ARCHIVE: ['.zip', '.rar', '.7z', '.gz', '.tar'],
    CODE: ['.json', '.xml', '.yaml', '.yml', '.js', '.ts', '.py', '.java', '.cs'],
  } as const,
} as const;

// Attachment Types
export type AttachmentType = (typeof ATTACHMENT.TYPES)[keyof typeof ATTACHMENT.TYPES];

// Attachment Statuses
export type AttachmentStatus = (typeof ATTACHMENT.STATUS)[keyof typeof ATTACHMENT.STATUS];

// MIME Types
export type AttachmentMimeType = (typeof ATTACHMENT.MIME_TYPES)[keyof typeof ATTACHMENT.MIME_TYPES];

// Utility Functions
export function attachmentGetTypeLabel(type: AttachmentType): string {
  const labels: Record<AttachmentType, string> = {
    [ATTACHMENT.TYPES.IMAGE]: 'Image',
    [ATTACHMENT.TYPES.VIDEO]: 'Video',
    [ATTACHMENT.TYPES.AUDIO]: 'Audio',
    [ATTACHMENT.TYPES.DOCUMENT]: 'Document',
    [ATTACHMENT.TYPES.SPREADSHEET]: 'Spreadsheet',
    [ATTACHMENT.TYPES.PRESENTATION]: 'Presentation',
    [ATTACHMENT.TYPES.PDF]: 'PDF',
    [ATTACHMENT.TYPES.ARCHIVE]: 'Archive',
    [ATTACHMENT.TYPES.CODE]: 'Code',
    [ATTACHMENT.TYPES.OTHER]: 'Other',
  };
  return labels[type] || 'Unknown';
}

export function attachmentGetStatusLabel(status: AttachmentStatus): string {
  const labels: Record<AttachmentStatus, string> = {
    [ATTACHMENT.STATUS.PENDING]: 'Pending',
    [ATTACHMENT.STATUS.UPLOADING]: 'Uploading',
    [ATTACHMENT.STATUS.UPLOADED]: 'Uploaded',
    [ATTACHMENT.STATUS.PROCESSING]: 'Processing',
    [ATTACHMENT.STATUS.PROCESSED]: 'Processed',
    [ATTACHMENT.STATUS.FAILED]: 'Failed',
    [ATTACHMENT.STATUS.DELETED]: 'Deleted',
  };
  return labels[status] || 'Unknown';
}

export function attachmentGetMimeType(extension: string): AttachmentMimeType | null {
  const mimeMap: Record<string, AttachmentMimeType> = {
    '.jpg': ATTACHMENT.MIME_TYPES.JPEG,
    '.jpeg': ATTACHMENT.MIME_TYPES.JPEG,
    '.png': ATTACHMENT.MIME_TYPES.PNG,
    '.gif': ATTACHMENT.MIME_TYPES.GIF,
    '.webp': ATTACHMENT.MIME_TYPES.WEBP,
    '.svg': ATTACHMENT.MIME_TYPES.SVG,
    '.bmp': ATTACHMENT.MIME_TYPES.BMP,
    '.pdf': ATTACHMENT.MIME_TYPES.PDF,
    '.doc': ATTACHMENT.MIME_TYPES.DOC,
    '.docx': ATTACHMENT.MIME_TYPES.DOCX,
    '.txt': ATTACHMENT.MIME_TYPES.TXT,
    '.rtf': ATTACHMENT.MIME_TYPES.RTF,
    '.xls': ATTACHMENT.MIME_TYPES.XLS,
    '.xlsx': ATTACHMENT.MIME_TYPES.XLSX,
    '.csv': ATTACHMENT.MIME_TYPES.CSV,
    '.ppt': ATTACHMENT.MIME_TYPES.PPT,
    '.pptx': ATTACHMENT.MIME_TYPES.PPTX,
    '.zip': ATTACHMENT.MIME_TYPES.ZIP,
    '.rar': ATTACHMENT.MIME_TYPES.RAR,
    '.7z': ATTACHMENT.MIME_TYPES['7Z'],
    '.gz': ATTACHMENT.MIME_TYPES.GZIP,
    '.json': ATTACHMENT.MIME_TYPES.JSON,
    '.xml': ATTACHMENT.MIME_TYPES.XML,
    '.yaml': ATTACHMENT.MIME_TYPES.YAML,
    '.yml': ATTACHMENT.MIME_TYPES.YAML,
    '.js': ATTACHMENT.MIME_TYPES.JS,
    '.ts': ATTACHMENT.MIME_TYPES.TS,
    '.mp4': ATTACHMENT.MIME_TYPES.MP4,
    '.webm': ATTACHMENT.MIME_TYPES.WEBM,
    '.mp3': ATTACHMENT.MIME_TYPES.MP3,
    '.wav': ATTACHMENT.MIME_TYPES.WAV,
    '.ogg': ATTACHMENT.MIME_TYPES.OGG,
  };
  return mimeMap[extension.toLowerCase()] || null;
}

export function attachmentIsUploaded(status: AttachmentStatus): boolean {
  return status === ATTACHMENT.STATUS.UPLOADED || status === ATTACHMENT.STATUS.PROCESSED;
}

export function attachmentIsFailed(status: AttachmentStatus): boolean {
  return status === ATTACHMENT.STATUS.FAILED;
}

export function attachmentIsProcessing(status: AttachmentStatus): boolean {
  return status === ATTACHMENT.STATUS.UPLOADING || status === ATTACHMENT.STATUS.PROCESSING;
}

export function attachmentGetTypeFromMime(mimeType: string): AttachmentType {
  if (mimeType.startsWith('image/')) return ATTACHMENT.TYPES.IMAGE;
  if (mimeType.startsWith('video/')) return ATTACHMENT.TYPES.VIDEO;
  if (mimeType.startsWith('audio/')) return ATTACHMENT.TYPES.AUDIO;
  if (mimeType === 'application/pdf') return ATTACHMENT.TYPES.PDF;
  if (mimeType.includes('document') || mimeType.includes('word')) return ATTACHMENT.TYPES.DOCUMENT;
  if (mimeType.includes('spreadsheet') || mimeType.includes('excel'))
    return ATTACHMENT.TYPES.SPREADSHEET;
  if (mimeType.includes('presentation') || mimeType.includes('powerpoint'))
    return ATTACHMENT.TYPES.PRESENTATION;
  if (mimeType.includes('zip') || mimeType.includes('rar') || mimeType.includes('7z'))
    return ATTACHMENT.TYPES.ARCHIVE;
  if (mimeType.includes('json') || mimeType.includes('xml') || mimeType.includes('javascript'))
    return ATTACHMENT.TYPES.CODE;
  return ATTACHMENT.TYPES.OTHER;
}

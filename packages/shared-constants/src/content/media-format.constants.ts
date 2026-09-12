import { TYPES as COMMON_TYPES } from '../common/types.constants';
import { DOCUMENT } from '../common/document.constants';

export const MEDIA_FORMAT = {
  TYPES: {
    ...COMMON_TYPES,
    ...DOCUMENT.TYPES,
    JPEG: 'jpeg',
    PNG: 'png',
    GIF: 'gif',
    SVG: 'svg',
    WEBP: 'webp',
    BMP: 'bmp',
    TIFF: 'tiff',
    MP4: 'mp4',
    AVI: 'avi',
    MKV: 'mkv',
    MOV: 'mov',
    WMV: 'wmv',
    PDF: 'pdf',
    DOC: 'doc',
    DOCX: 'docx',
    XLS: 'xls',
    XLSX: 'xlsx',
    PPT: 'ppt',
    PPTX: 'pptx',
  },
  FILE_TYPES: { ...DOCUMENT.TYPES },
} as const;

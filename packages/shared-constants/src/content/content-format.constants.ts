import { TYPES as COMMON_TYPES } from '../common/types.constants';
import { MEDIA_FORMAT } from './media-format.constants';

export const CONTENT_FORMAT = {
  TYPES: {
    ...COMMON_TYPES,
    TEXT: 'text',
    HTML: 'html',
    MARKDOWN: 'markdown',
    JSON: 'json',
    XML: 'xml',
    PDF: 'pdf',
    DOC: 'doc',
    DOCX: 'docx',
    TXT: 'txt',
  },
  MEDIA_FORMAT: { ...MEDIA_FORMAT },
  SUPPORTED_FORMATS: ['html', 'markdown', 'json', 'xml', 'pdf', 'docx'],
  DEFAULT_FORMAT: 'html',
} as const;

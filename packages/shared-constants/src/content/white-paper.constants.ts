import { STATUS } from '../common/status.constants';
import { PERMISSIONS } from '../common/permissions.constants';
import { WHITE_PAPER_STATUS } from './white-paper-status.constants';

export const WHITE_PAPER = {
  STATUS: {
    ...STATUS,
    ...WHITE_PAPER_STATUS,
    DRAFT: 'draft',
    PUBLISHED: 'published',
  },
  PERMISSIONS: {
    ...PERMISSIONS,
    VIEW: 'white_paper:view',
    CREATE: 'white_paper:create',
    UPDATE: 'white_paper:update',
    DELETE: 'white_paper:delete',
  },
  WHITE_PAPER_STATUS: { ...WHITE_PAPER_STATUS },
  WHITE_PAPER_TYPES: {
    TECHNICAL: 'technical',
    BUSINESS: 'business',
    RESEARCH: 'research',
    POLICY: 'policy',
  },
  MAX_TITLE_LENGTH: 200,
  MAX_CONTENT_LENGTH: 100000,
} as const;

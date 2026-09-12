import { STATUS } from '../common/status.constants';
import { PERMISSIONS } from '../common/permissions.constants';
import { CASE_STUDY_STATUS } from './case-study-status.constants';

export const CASE_STUDY = {
  STATUS: {
    ...STATUS,
    ...CASE_STUDY_STATUS,
    DRAFT: 'draft',
    PUBLISHED: 'published',
  },
  PERMISSIONS: {
    ...PERMISSIONS,
    VIEW: 'case_study:view',
    CREATE: 'case_study:create',
    UPDATE: 'case_study:update',
    DELETE: 'case_study:delete',
  },
  CASE_STUDY_STATUS: { ...CASE_STUDY_STATUS },
  CASE_STUDY_TYPES: {
    SUCCESS: 'success',
    FAILURE: 'failure',
    MIXED: 'mixed',
  },
  MAX_TITLE_LENGTH: 200,
  MAX_CONTENT_LENGTH: 10000,
} as const;

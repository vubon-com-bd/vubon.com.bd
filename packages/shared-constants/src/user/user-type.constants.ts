import { TYPES as COMMON_TYPES } from '../common/types.constants';

export const USER_TYPES = {
  ...COMMON_TYPES,
  INDIVIDUAL: 'individual',
  BUSINESS: 'business',
  STUDENT: 'student',
  TEACHER: 'teacher',
} as const;

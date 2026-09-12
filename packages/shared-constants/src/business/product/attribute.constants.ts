import { TYPES as COMMON_TYPES } from '../../common/types.constants';
import { VALIDATION } from '../../common/validation.constants';

export const ATTRIBUTE = {
  TYPES: {
    ...COMMON_TYPES,
    TEXT: 'text',
    NUMBER: 'number',
    BOOLEAN: 'boolean',
    DATE: 'date',
    SELECT: 'select',
    MULTISELECT: 'multiselect',
  },
  VALIDATION: {
    ...VALIDATION,
    MAX_ATTRIBUTES: 50,
    MAX_OPTIONS: 100,
  },
} as const;

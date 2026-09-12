import { TYPES as COMMON_TYPES } from '../../common/types.constants';
import { REPORT_FILTER_OPERATOR } from './report-filter-operator.constants';

export const REPORT_FILTER = {
  TYPES: {
    ...COMMON_TYPES,
    DATE: 'date',
    DATETIME: 'datetime',
    TEXT: 'text',
    NUMBER: 'number',
    BOOLEAN: 'boolean',
    SELECT: 'select',
    MULTISELECT: 'multiselect',
    RANGE: 'range',
    SEARCH: 'search',
  },
  REPORT_FILTER_OPERATOR: { ...REPORT_FILTER_OPERATOR },
  FILTER_GROUPS: {
    TIME: 'time',
    DIMENSION: 'dimension',
    METRIC: 'metric',
    ATTRIBUTE: 'attribute',
  },
  MAX_FILTERS: 20,
  MAX_FILTER_VALUES: 100,
} as const;

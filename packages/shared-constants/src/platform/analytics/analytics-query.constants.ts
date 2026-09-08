import { TYPES as COMMON_TYPES } from '../../common/types.constants';
import { ANALYTICS_TYPE } from './analytics-type.constants';
import { ANALYTICS_FILTER } from './analytics-filter.constants';
import { ANALYTICS_GROUP } from './analytics-group.constants';
import { ANALYTICS_SORT } from './analytics-sort.constants';

export const ANALYTICS_QUERY = {
  TYPES: {
    ...COMMON_TYPES,
    ...ANALYTICS_TYPE.TYPES,
    METRIC: 'metric',
    DIMENSION: 'dimension',
    TIME_SERIES: 'time_series',
    COMPARISON: 'comparison',
  },
  ANALYTICS_TYPE: { ...ANALYTICS_TYPE },
  ANALYTICS_FILTER: { ...ANALYTICS_FILTER },
  ANALYTICS_GROUP: { ...ANALYTICS_GROUP },
  ANALYTICS_SORT: { ...ANALYTICS_SORT },
  QUERY_OPERATIONS: {
    SUM: 'sum',
    AVG: 'avg',
    COUNT: 'count',
    MIN: 'min',
    MAX: 'max',
    DISTINCT: 'distinct',
    PERCENTILE: 'percentile',
  },
  TIME_GRANULARITY: {
    MINUTE: 'minute',
    HOUR: 'hour',
    DAY: 'day',
    WEEK: 'week',
    MONTH: 'month',
    QUARTER: 'quarter',
    YEAR: 'year',
  },
  MAX_QUERY_DIMENSIONS: 10,
  MAX_QUERY_METRICS: 20,
} as const;

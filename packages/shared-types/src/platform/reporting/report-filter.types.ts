import { Filter } from '../../common/filter.types';
import { REPORT_FILTER } from '@vubon/shared-constants/src/platform/reporting/report-filter.constants';
import { REPORT_FILTER_OPERATOR } from '@vubon/shared-constants/src/platform/reporting/report-filter-operator.constants';
import { Report } from './report.types';

/**
 * Report filter operator type — derived from constants
 */
export type ReportFilterOperator =
  (typeof REPORT_FILTER_OPERATOR.TYPES)[keyof typeof REPORT_FILTER_OPERATOR.TYPES];

/**
 * Report filter type — derived from constants
 */
export type ReportFilterType = (typeof REPORT_FILTER.TYPES)[keyof typeof REPORT_FILTER.TYPES];

/**
 * Report filter group type — derived from constants
 */
export type ReportFilterGroup =
  (typeof REPORT_FILTER.FILTER_GROUPS)[keyof typeof REPORT_FILTER.FILTER_GROUPS];

/**
 * Report filter interface
 * Note: uses Omit<Filter, 'operator' | 'type'> because those are more specific here.
 */
export interface ReportFilter extends Omit<Filter, 'operator'> {
  filterId: string;
  reportId: string;
  report: Report;
  type: ReportFilterType;
  operator: ReportFilterOperator;
  group: ReportFilterGroup;
  field: string;
  value: unknown;
  isActive: boolean;
  metadata: Record<string, unknown>;
}

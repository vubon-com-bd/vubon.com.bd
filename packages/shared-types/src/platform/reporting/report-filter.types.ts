/**
 * Report Filter Types
 * @module shared-types/platform/reporting
 */

import type {
  REPORT_FILTER_OPERATOR,
  REPORT_FILTER_LOGIC,
  REPORT_FILTER_TYPE,
} from '@vubon/shared-constants/platform';

export type ReportFilterOperatorValue =
  (typeof REPORT_FILTER_OPERATOR)[keyof typeof REPORT_FILTER_OPERATOR];

export type ReportFilterLogicValue = (typeof REPORT_FILTER_LOGIC)[keyof typeof REPORT_FILTER_LOGIC];

export type ReportFilterTypeValue = (typeof REPORT_FILTER_TYPE)[keyof typeof REPORT_FILTER_TYPE];

export interface ReportFilter {
  readonly field: string;
  readonly operator: ReportFilterOperatorValue;
  readonly value: unknown;
  readonly type: ReportFilterTypeValue;
}

export interface ReportFilterGroup {
  readonly logic: ReportFilterLogicValue;
  readonly filters: readonly (ReportFilter | ReportFilterGroup)[];
}

export interface ReportFilterValue {
  readonly field: string;
  readonly values: readonly (string | number | boolean | Date)[];
}

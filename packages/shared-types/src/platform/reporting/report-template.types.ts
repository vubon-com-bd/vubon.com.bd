/**
 * Report Template Types
 * @module shared-types/platform/reporting
 */

import type {
  REPORT_TEMPLATE_TYPE,
  REPORT_TEMPLATE_CATEGORY,
  REPORT_TEMPLATE_STATUS,
} from '@vubon/shared-constants/platform';

export type ReportTemplateTypeValue =
  (typeof REPORT_TEMPLATE_TYPE)[keyof typeof REPORT_TEMPLATE_TYPE];

export type ReportTemplateCategoryValue =
  (typeof REPORT_TEMPLATE_CATEGORY)[keyof typeof REPORT_TEMPLATE_CATEGORY];

export type ReportTemplateStatusValue =
  (typeof REPORT_TEMPLATE_STATUS)[keyof typeof REPORT_TEMPLATE_STATUS];

export interface ReportTemplate {
  readonly id: string;
  readonly name: string;
  readonly slug: string;
  readonly description?: string;
  readonly type: ReportTemplateTypeValue;
  readonly category: ReportTemplateCategoryValue;
  readonly status: ReportTemplateStatusValue;
  readonly sections: readonly ReportSection[];
  readonly columns: readonly ReportColumn[];
  readonly filters?: readonly ReportFilterConfig[];
  readonly groupings?: readonly ReportGrouping[];
  readonly sorts?: readonly ReportSort[];
  readonly version: number;
  readonly parentId?: string;
  readonly createdBy: string;
  readonly createdAt: string;
  readonly updatedAt: string;
}

export interface ReportSection {
  readonly id: string;
  readonly title: string;
  readonly type: 'table' | 'chart' | 'summary' | 'text';
  readonly order: number;
  readonly config?: Readonly<Record<string, unknown>>;
}

export interface ReportColumn {
  readonly field: string;
  readonly label: string;
  readonly type: 'string' | 'number' | 'date' | 'boolean' | 'currency';
  readonly width?: number;
  readonly sortable?: boolean;
  readonly filterable?: boolean;
  readonly format?: string;
}

export interface ReportFilterConfig {
  readonly field: string;
  readonly operator: string;
  readonly value: unknown;
}

export interface ReportGrouping {
  readonly field: string;
  readonly direction: 'asc' | 'desc';
}

export interface ReportSort {
  readonly field: string;
  readonly direction: 'asc' | 'desc';
}

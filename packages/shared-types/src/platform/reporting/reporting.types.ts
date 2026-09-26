/**
 * Reporting Core Types
 * @module shared-types/platform/reporting
 *
 * Report entity + aggregator।
 */

import type { UserId } from '../../common/primitives';
import type { BaseEntity } from '../../common/base';
import type { ReportTypeValue } from './report-type.types';
import type { ReportFormatValue } from './report-format.types';
import type { ReportStatusValue } from './report-status.types';
import type { ReportPriorityValue } from './report-priority.types';
import type { ReportFilter } from './report-filter.types';

export interface Report extends BaseEntity<string> {
  readonly name: string;
  readonly description?: string;
  readonly type: ReportTypeValue;
  readonly format: ReportFormatValue;
  readonly status: ReportStatusValue;
  readonly priority: ReportPriorityValue;
  readonly templateId?: string;
  readonly filters?: readonly ReportFilter[];
  readonly parameters?: Readonly<Record<string, unknown>>;
  readonly periodStart?: string;
  readonly periodEnd?: string;
  readonly fileUrl?: string;
  readonly fileSize?: number;
  readonly rowCount?: number;
  readonly generatedAt?: string;
  readonly expiresAt?: string;
  readonly generatedBy?: UserId;
  readonly error?: string;
  readonly durationMs?: number;
}

export interface ReportPublic {
  readonly id: string;
  readonly name: string;
  readonly type: ReportTypeValue;
  readonly format: ReportFormatValue;
  readonly status: ReportStatusValue;
  readonly periodStart?: string;
  readonly periodEnd?: string;
  readonly fileUrl?: string;
  readonly rowCount?: number;
  readonly generatedAt?: string;
}

export interface ReportSummary {
  readonly id: string;
  readonly name: string;
  readonly type: ReportTypeValue;
  readonly status: ReportStatusValue;
  readonly createdAt: string;
}

export interface ReportGenerateInput {
  readonly name: string;
  readonly type: ReportTypeValue;
  readonly format: ReportFormatValue;
  readonly priority?: ReportPriorityValue;
  readonly templateId?: string;
  readonly filters?: readonly ReportFilter[];
  readonly parameters?: Readonly<Record<string, unknown>>;
  readonly periodStart?: string;
  readonly periodEnd?: string;
}

export interface ReportGenerateResult {
  readonly success: boolean;
  readonly reportId?: string;
  readonly fileUrl?: string;
  readonly rowCount?: number;
  readonly error?: string;
}

export interface ReportListFilter {
  readonly type?: ReportTypeValue;
  readonly format?: ReportFormatValue;
  readonly status?: ReportStatusValue;
  readonly priority?: ReportPriorityValue;
  readonly generatedBy?: UserId;
  readonly fromDate?: string;
  readonly toDate?: string;
  readonly search?: string;
}

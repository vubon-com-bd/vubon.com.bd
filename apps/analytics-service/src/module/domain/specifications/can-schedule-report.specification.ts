/**
 * Can Schedule Report Specification
 * @module analytics-service/domain/specifications
 *
 * Report scheduling eligibility rules।
 * Business Rule:
 * - Recurring frequency only
 * - Max scheduled reports per user
 * - Format supports scheduling
 * - Time range reasonable
 */
import { Specification } from '@vubon/shared-kernel/domain/base';

export interface ReportScheduleRequest {
  readonly userId: string;
  readonly reportId?: string;
  readonly frequency: string;
  readonly format: string;
  readonly rangeDays: number;
  readonly currentScheduledCount: number;
  readonly hasPermission: boolean;
}

export interface ReportScheduleLimits {
  readonly maxScheduledPerUser: number;
  readonly maxRangeDays: number;
  readonly allowedFormats: readonly string[];
  readonly allowedFrequencies: readonly string[];
}

const DEFAULT_LIMITS: ReportScheduleLimits = {
  maxScheduledPerUser: 50,
  maxRangeDays: 730,
  allowedFormats: ['json', 'csv', 'xlsx', 'pdf', 'html'],
  allowedFrequencies: [
    'hourly',
    'daily',
    'weekly',
    'monthly',
    'quarterly',
    'yearly',
  ],
};

export class CanScheduleReportSpecification extends Specification<ReportScheduleRequest> {
  constructor(private readonly limits: ReportScheduleLimits = DEFAULT_LIMITS) {
    super();
  }

  isSatisfiedBy(request: ReportScheduleRequest): boolean {
    // 1. Permission
    if (!request.hasPermission) return false;

    // 2. Count limit
    if (request.currentScheduledCount >= this.limits.maxScheduledPerUser) {
      return false;
    }

    // 3. Frequency must be recurring (not 'once')
    if (!this.limits.allowedFrequencies.includes(request.frequency)) {
      return false;
    }

    // 4. Format must support scheduled delivery
    if (!this.limits.allowedFormats.includes(request.format)) {
      return false;
    }

    // 5. Range days reasonable
    if (request.rangeDays < 1 || request.rangeDays > this.limits.maxRangeDays) {
      return false;
    }

    // 6. PDF + high-frequency = not allowed (resource intensive)
    if (request.format === 'pdf' && (request.frequency === 'hourly' || request.frequency === 'daily')) {
      return false;
    }

    return true;
  }

  explain(request: ReportScheduleRequest): string | null {
    if (!request.hasPermission) return 'User lacks report scheduling permission';

    if (request.currentScheduledCount >= this.limits.maxScheduledPerUser) {
      return `Scheduled report limit reached (${this.limits.maxScheduledPerUser})`;
    }

    if (!this.limits.allowedFrequencies.includes(request.frequency)) {
      return `Invalid frequency: ${request.frequency} (must be recurring)`;
    }

    if (!this.limits.allowedFormats.includes(request.format)) {
      return `Unsupported format: ${request.format}`;
    }

    if (request.rangeDays < 1 || request.rangeDays > this.limits.maxRangeDays) {
      return `Range days must be 1-${this.limits.maxRangeDays}`;
    }

    if (request.format === 'pdf' && (request.frequency === 'hourly' || request.frequency === 'daily')) {
      return 'PDF format not allowed for hourly/daily schedules (resource intensive)';
    }

    return null;
  }
}

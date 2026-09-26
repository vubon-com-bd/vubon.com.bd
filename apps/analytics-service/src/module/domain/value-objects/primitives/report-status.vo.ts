import { BaseStatusVO } from '@vubon/shared-kernel/domain/primitives/status.vo';
import { ANALYTICS_STATUS } from '@vubon/shared-constants/platform/analytics';

const VALID_STATUSES = new Set<string>(Object.values(ANALYTICS_STATUS));

export class ReportStatusVO extends BaseStatusVO<string> {
  static create(raw: string): ReportStatusVO {
    const normalized = raw.trim().toLowerCase();
    if (!VALID_STATUSES.has(normalized)) {
      throw new Error(`Invalid report status: ${raw}`);
    }
    return new ReportStatusVO(normalized);
  }

  static pending(): ReportStatusVO {
    return new ReportStatusVO(ANALYTICS_STATUS.PENDING);
  }

  static processing(): ReportStatusVO {
    return new ReportStatusVO(ANALYTICS_STATUS.PROCESSING);
  }

  static completed(): ReportStatusVO {
    return new ReportStatusVO(ANALYTICS_STATUS.COMPLETED);
  }

  static failed(): ReportStatusVO {
    return new ReportStatusVO(ANALYTICS_STATUS.FAILED);
  }

  private constructor(value: string) {
    super(value);
  }

  get isTerminal(): boolean {
    return this.value === ANALYTICS_STATUS.COMPLETED ||
           this.value === ANALYTICS_STATUS.FAILED;
  }

  get isInProgress(): boolean {
    return this.value === ANALYTICS_STATUS.PENDING ||
           this.value === ANALYTICS_STATUS.PROCESSING;
  }

  canTransitionTo(next: ReportStatusVO): boolean {
    const transitions: Record<string, readonly string[]> = {
      [ANALYTICS_STATUS.PENDING]: [ANALYTICS_STATUS.PROCESSING, ANALYTICS_STATUS.FAILED],
      [ANALYTICS_STATUS.PROCESSING]: [ANALYTICS_STATUS.COMPLETED, ANALYTICS_STATUS.FAILED],
      [ANALYTICS_STATUS.COMPLETED]: [],
      [ANALYTICS_STATUS.FAILED]: [],
    };
    return (transitions[this.value] ?? []).includes(next.value);
  }
}

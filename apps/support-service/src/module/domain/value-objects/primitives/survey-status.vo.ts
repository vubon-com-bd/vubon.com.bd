/**
 * SurveyStatusVO — Survey publication status
 * @module support-service/domain/value-objects/primitives
 *
 * Registry: extends BaseStatusVO
 */
import { BaseStatusVO } from '@vubon/shared-kernel/domain/primitives/status.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { SURVEY_STATUS } from '@vubon/shared-constants/support';

export type SurveyStatusValue =
  (typeof SURVEY_STATUS)[keyof typeof SURVEY_STATUS];

const STATUS_SET: ReadonlySet<string> = new Set(
  Object.values(SURVEY_STATUS),
);

const ACCEPTING: ReadonlySet<string> = new Set<string>(['active', 'published']);

export class SurveyStatusVO extends BaseStatusVO<SurveyStatusValue> {
  private constructor(value: SurveyStatusValue) {
    super(value);
  }

  protected static allowedValues(): ReadonlySet<string> {
    return STATUS_SET;
  }

  static create(raw: string): SurveyStatusVO {
    const normalized = raw.trim().toLowerCase();
    if (!STATUS_SET.has(normalized)) {
      throw new ValidationError(
        `Invalid survey status: ${raw}`,
        'surveyStatus',
      );
    }
    return new SurveyStatusVO(normalized as SurveyStatusValue);
  }

  isAcceptingResponses(): boolean {
    return ACCEPTING.has(this.value);
  }

  isClosed(): boolean {
    return this.value === ('closed' as SurveyStatusValue);
  }
}

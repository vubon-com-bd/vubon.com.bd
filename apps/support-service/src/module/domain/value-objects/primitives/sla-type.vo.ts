/**
 * SlaTypeVO — SLA metric type
 * @module support-service/domain/value-objects/primitives
 *
 * Registry: extends BaseTypeVO
 * Values from SUPPORT_SLA_TYPE: first_response, response, resolution, resolve, update, follow_up
 */
import { BaseTypeVO } from '@vubon/shared-kernel/domain/primitives/type.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { SUPPORT_SLA_TYPE } from '@vubon/shared-constants/support';

export type SlaTypeValue =
  (typeof SUPPORT_SLA_TYPE)[keyof typeof SUPPORT_SLA_TYPE];

const TYPE_SET: ReadonlySet<string> = new Set(
  Object.values(SUPPORT_SLA_TYPE),
);

const RESPONSE_TYPES: ReadonlySet<string> = new Set<string>([
  SUPPORT_SLA_TYPE.FIRST_RESPONSE,
  SUPPORT_SLA_TYPE.RESPONSE,
]);

const RESOLUTION_TYPES: ReadonlySet<string> = new Set<string>([
  SUPPORT_SLA_TYPE.RESOLUTION,
  SUPPORT_SLA_TYPE.RESOLVE,
]);

export class SlaTypeVO extends BaseTypeVO<SlaTypeValue> {
  private constructor(value: SlaTypeValue) {
    super(value);
  }

  protected static allowedValues(): ReadonlySet<string> {
    return TYPE_SET;
  }

  static create(raw: string): SlaTypeVO {
    const normalized = raw.trim().toLowerCase();
    if (!TYPE_SET.has(normalized)) {
      throw new ValidationError(
        `Invalid SLA type: ${raw}`,
        'slaType',
      );
    }
    return new SlaTypeVO(normalized as SlaTypeValue);
  }

  isResponseSla(): boolean {
    return RESPONSE_TYPES.has(this.value);
  }

  isResolutionSla(): boolean {
    return RESOLUTION_TYPES.has(this.value);
  }

  isFollowUp(): boolean {
    return this.value === SUPPORT_SLA_TYPE.FOLLOW_UP;
  }
}

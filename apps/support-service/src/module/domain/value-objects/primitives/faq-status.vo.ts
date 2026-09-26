/**
 * FaqStatusVO — FAQ publication status
 * @module support-service/domain/value-objects/primitives
 *
 * Registry: extends BaseStatusVO
 */
import { BaseStatusVO } from '@vubon/shared-kernel/domain/primitives/status.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { FAQ_STATUS } from '@vubon/shared-constants/support';

export type FaqStatusValue = (typeof FAQ_STATUS)[keyof typeof FAQ_STATUS];

const STATUS_SET: ReadonlySet<string> = new Set(Object.values(FAQ_STATUS));
const PUBLIC_STATUSES: ReadonlySet<string> = new Set<string>([
  'published' as string,
]);

export class FaqStatusVO extends BaseStatusVO<FaqStatusValue> {
  private constructor(value: FaqStatusValue) {
    super(value);
  }

  protected static allowedValues(): ReadonlySet<string> {
    return STATUS_SET;
  }

  static create(raw: string): FaqStatusVO {
    const normalized = raw.trim().toLowerCase();
    if (!STATUS_SET.has(normalized)) {
      throw new ValidationError(
        `Invalid FAQ status: ${raw}`,
        'faqStatus',
      );
    }
    return new FaqStatusVO(normalized as FaqStatusValue);
  }

  static draft(): FaqStatusVO {
    return new FaqStatusVO('draft' as FaqStatusValue);
  }

  static published(): FaqStatusVO {
    return new FaqStatusVO('published' as FaqStatusValue);
  }

  isPubliclyVisible(): boolean {
    return PUBLIC_STATUSES.has(this.value);
  }
}

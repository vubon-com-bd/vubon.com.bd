import { BaseStatusVO } from '@vubon/shared-kernel/domain/primitives';
import { NOTIFICATION_DIGEST_STATUS } from '@vubon/shared-constants/platform/notification';

const ALLOWED = new Set<string>(Object.values(NOTIFICATION_DIGEST_STATUS));

export class DigestStatusVO extends BaseStatusVO<string> {
  private constructor(value: string) {
    super(value);
  }

  protected static override allowedValues(): ReadonlySet<string> {
    return ALLOWED;
  }

  static create(raw: string): DigestStatusVO {
    if (!ALLOWED.has(raw)) {
      throw new Error(`Invalid digest status: ${raw}`);
    }
    return new DigestStatusVO(raw);
  }
}

import { BaseTypeVO } from '@vubon/shared-kernel/domain/primitives';
import { NOTIFICATION_DIGEST_TYPE } from '@vubon/shared-constants/platform/notification';

const ALLOWED = new Set<string>(Object.values(NOTIFICATION_DIGEST_TYPE));

export class DigestTypeVO extends BaseTypeVO<string> {
  private constructor(value: string) {
    super(value);
  }

  protected static override allowedValues(): ReadonlySet<string> {
    return ALLOWED;
  }

  static create(raw: string): DigestTypeVO {
    if (!ALLOWED.has(raw)) {
      throw new Error(`Invalid digest type: ${raw}`);
    }
    return new DigestTypeVO(raw);
  }
}

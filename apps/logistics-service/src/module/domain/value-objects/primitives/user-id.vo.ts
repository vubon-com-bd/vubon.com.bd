import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import type { BrandedId } from '@vubon/shared-kernel/domain/primitives';

export type UserRefId = BrandedId<'LogisticsUserRefId'>;

export class UserIdVO extends BaseVO<UserRefId> {
  private constructor(value: UserRefId) {
    super(value);
  }

  static create(raw: string): UserIdVO {
    if (!raw || raw.trim().length === 0) {
      throw new Error('UserId cannot be empty');
    }
    return new UserIdVO(raw as UserRefId);
  }
}

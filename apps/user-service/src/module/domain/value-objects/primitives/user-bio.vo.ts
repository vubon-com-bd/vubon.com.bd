import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { InvalidUserBioError } from '../../errors/user.errors';

export class UserBioVO extends BaseVO<string> {
  static readonly MAX_LENGTH = 500;

  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): UserBioVO {
    if (raw.length > UserBioVO.MAX_LENGTH) {
      throw new InvalidUserBioError(`Bio must not exceed ${UserBioVO.MAX_LENGTH} characters`);
    }
    return new UserBioVO(raw);
  }
}

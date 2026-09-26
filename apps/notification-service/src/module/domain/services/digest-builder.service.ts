import { DigestItemEntity } from '../entities/digest-item.entity';
import { DigestEntity } from '../entities/digest.entity';
import { DigestTypeVO } from '../value-objects/primitives/digest-type.vo';
import { DigestStatusVO } from '../value-objects/primitives/digest-status.vo';
import { DigestPeriodVO } from '../value-objects/primitives/digest-period.vo';
import { UserIdVO } from '../value-objects/primitives/user-id.vo';

export interface BuildDigestInput {
  readonly userId: UserIdVO;
  readonly type: DigestTypeVO;
  readonly period: DigestPeriodVO;
  readonly scheduledAt: Date;
  readonly items: readonly DigestItemEntity[];
}

export class DigestBuilderService {
  build(input: BuildDigestInput): DigestEntity {
    if (input.items.length === 0) {
      throw new Error('Cannot build digest with no items');
    }
    return DigestEntity.create({
      userId: input.userId,
      type: input.type,
      status: DigestStatusVO.create('pending'),
      period: input.period,
      scheduledAt: input.scheduledAt,
      sentAt: null,
    });
  }
}

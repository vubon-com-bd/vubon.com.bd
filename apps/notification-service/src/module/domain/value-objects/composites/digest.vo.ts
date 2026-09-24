import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { DigestIdVO } from '../primitives/digest-id.vo';
import { DigestStatusVO } from '../primitives/digest-status.vo';
import { DigestTypeVO } from '../primitives/digest-type.vo';
import { DigestPeriodVO } from '../primitives/digest-period.vo';
import { UserIdVO } from '../primitives/user-id.vo';

export interface DigestProps {
  readonly id: DigestIdVO;
  readonly userId: UserIdVO;
  readonly type: DigestTypeVO;
  readonly status: DigestStatusVO;
  readonly period: DigestPeriodVO;
  readonly scheduledAt: Date;
  readonly sentAt: Date | null;
}

export class DigestVO extends BaseVO<DigestProps> {
  private constructor(props: DigestProps) {
    super(Object.freeze({ ...props }));
  }

  static create(props: DigestProps): DigestVO {
    return new DigestVO(props);
  }

  get id(): DigestIdVO { return this.value.id; }
  get userId(): UserIdVO { return this.value.userId; }
  get type(): DigestTypeVO { return this.value.type; }
  get status(): DigestStatusVO { return this.value.status; }
  get period(): DigestPeriodVO { return this.value.period; }
  get scheduledAt(): Date { return this.value.scheduledAt; }
  get sentAt(): Date | null { return this.value.sentAt; }
}

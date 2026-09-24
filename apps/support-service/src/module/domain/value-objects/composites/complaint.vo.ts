import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ComplaintIdVO } from '../primitives/complaint-id.vo';
import { ComplaintTypeVO } from '../primitives/complaint-type.vo';
import { ComplaintStatusVO } from '../primitives/complaint-status.vo';
import { ComplaintSeverityVO } from '../primitives/complaint-severity.vo';
import { UserIdVO } from '../primitives/user-id.vo';

export interface ComplaintProps {
  readonly id: ComplaintIdVO;
  readonly userId: UserIdVO;
  readonly type: ComplaintTypeVO;
  readonly severity: ComplaintSeverityVO;
  readonly status: ComplaintStatusVO;
  readonly content: string;
  readonly createdAt: Date;
}

export class ComplaintVO extends BaseVO<ComplaintProps> {
  private constructor(props: ComplaintProps) {
    super(Object.freeze({ ...props }));
  }

  static create(props: ComplaintProps): ComplaintVO {
    return new ComplaintVO(props);
  }

  get id(): ComplaintIdVO { return this.value.id; }
  get userId(): UserIdVO { return this.value.userId; }
  get type(): ComplaintTypeVO { return this.value.type; }
  get severity(): ComplaintSeverityVO { return this.value.severity; }
  get status(): ComplaintStatusVO { return this.value.status; }
  get content(): string { return this.value.content; }
  get createdAt(): Date { return this.value.createdAt; }
}

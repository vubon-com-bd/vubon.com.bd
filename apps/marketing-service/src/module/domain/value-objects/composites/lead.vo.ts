import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { LeadIdVO } from '../primitives/lead-id.vo';
import { LeadNameVO } from '../primitives/lead-name.vo';
import { LeadEmailVO } from '../primitives/lead-email.vo';
import { LeadStatusVO } from '../primitives/lead-status.vo';
import { LeadSourceVO } from '../primitives/lead-source.vo';
import { LeadScoreVO } from '../primitives/lead-score.vo';
import { UserIdVO } from '../primitives/user-id.vo';

export interface LeadProps {
  readonly id: LeadIdVO;
  readonly name: LeadNameVO;
  readonly email: LeadEmailVO;
  readonly status: LeadStatusVO;
  readonly source: LeadSourceVO;
  readonly score: LeadScoreVO;
  readonly assignedTo: UserIdVO | null;
}

export class LeadVO extends BaseVO<LeadProps> {
  private constructor(props: LeadProps) {
    super(Object.freeze({ ...props }));
  }

  static create(props: LeadProps): LeadVO {
    return new LeadVO(props);
  }

  get id(): LeadIdVO { return this.value.id; }
  get name(): LeadNameVO { return this.value.name; }
  get email(): LeadEmailVO { return this.value.email; }
  get status(): LeadStatusVO { return this.value.status; }
  get source(): LeadSourceVO { return this.value.source; }
  get score(): LeadScoreVO { return this.value.score; }
  get assignedTo(): UserIdVO | null { return this.value.assignedTo; }
}

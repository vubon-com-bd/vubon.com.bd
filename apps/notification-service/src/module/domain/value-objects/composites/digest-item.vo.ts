import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { UserIdVO } from '../primitives/user-id.vo';

export interface DigestItemProps {
  readonly userId: UserIdVO;
  readonly title: string;
  readonly body: string;
  readonly actionUrl: string | null;
  readonly createdAt: Date;
}

export class DigestItemVO extends BaseVO<DigestItemProps> {
  private constructor(props: DigestItemProps) {
    super(Object.freeze({ ...props }));
  }

  static create(props: DigestItemProps): DigestItemVO {
    return new DigestItemVO(props);
  }

  get userId(): UserIdVO { return this.value.userId; }
  get title(): string { return this.value.title; }
  get body(): string { return this.value.body; }
  get actionUrl(): string | null { return this.value.actionUrl; }
  get createdAt(): Date { return this.value.createdAt; }
}

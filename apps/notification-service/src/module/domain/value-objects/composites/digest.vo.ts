/**
 * DigestVO — aggregated notification summary snapshot
 * @module notification-service/domain/value-objects/composites
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { DigestIdVO } from '../primitives/digest-id.vo.js';
import { DigestFrequencyVO } from '../primitives/digest-frequency.vo.js';
import { DigestTypeVO } from '../primitives/digest-type.vo.js';
import { DigestStatusVO } from '../primitives/digest-status.vo.js';

export interface DigestVOProps {
  readonly id: DigestIdVO;
  readonly userId: string;
  readonly frequency: DigestFrequencyVO;
  readonly type: DigestTypeVO;
  readonly status: DigestStatusVO;
  readonly periodStart: string;
  readonly periodEnd: string;
  readonly itemCount: number;
  readonly generatedAt?: string;
  readonly sentAt?: string;
  readonly channel?: string;
  readonly createdAt: string;
  readonly updatedAt: string;
}

export class DigestVO extends BaseVO<DigestVOProps> {
  private constructor(props: DigestVOProps) {
    super(props);
  }

  static create(props: DigestVOProps): DigestVO {
    const vo = new DigestVO(props);
    vo.validate();
    return vo;
  }

  static reconstitute(props: DigestVOProps): DigestVO {
    return new DigestVO(props);
  }

  protected validate(): void {
    const v = this.value;
    if (v.periodEnd <= v.periodStart) {
      throw new ValidationError('periodEnd must be after periodStart', 'periodEnd');
    }
    if (v.itemCount < 0) {
      throw new ValidationError('Item count cannot be negative', 'itemCount');
    }
    if (v.status.isSent() && !v.sentAt) {
      throw new ValidationError('Sent digest requires sentAt timestamp', 'sentAt');
    }
  }

  get id(): DigestIdVO { return this.value.id; }
  get userId(): string { return this.value.userId; }
  get frequency(): DigestFrequencyVO { return this.value.frequency; }
  get type(): DigestTypeVO { return this.value.type; }
  get status(): DigestStatusVO { return this.value.status; }
  get periodStart(): string { return this.value.periodStart; }
  get periodEnd(): string { return this.value.periodEnd; }
  get itemCount(): number { return this.value.itemCount; }
  get generatedAt(): string | undefined { return this.value.generatedAt; }
  get sentAt(): string | undefined { return this.value.sentAt; }
  get channel(): string | undefined { return this.value.channel; }
  get createdAt(): string { return this.value.createdAt; }
  get updatedAt(): string { return this.value.updatedAt; }

  isEmpty(): boolean { return this.value.itemCount === 0; }
  hasItems(): boolean { return this.value.itemCount > 0; }
}

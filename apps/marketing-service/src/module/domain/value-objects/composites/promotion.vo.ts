import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { PromotionIdVO } from '../primitives/promotion-id.vo';
import { PromotionNameVO } from '../primitives/promotion-name.vo';
import { PromotionCodeVO } from '../primitives/promotion-code.vo';
import { PromotionStatusVO } from '../primitives/promotion-status.vo';
import { PromotionTypeVO } from '../primitives/promotion-type.vo';
import { PromotionUsageVO } from '../primitives/promotion-usage.vo';

export interface PromotionProps {
  readonly id: PromotionIdVO;
  readonly name: PromotionNameVO;
  readonly code: PromotionCodeVO;
  readonly status: PromotionStatusVO;
  readonly type: PromotionTypeVO;
  readonly usage: PromotionUsageVO;
  readonly maxUsage: number | null;
  readonly startDate: Date | null;
  readonly endDate: Date | null;
}

export class PromotionVO extends BaseVO<PromotionProps> {
  private constructor(props: PromotionProps) {
    super(Object.freeze({ ...props }));
  }

  static create(props: PromotionProps): PromotionVO {
    return new PromotionVO(props);
  }

  get id(): PromotionIdVO { return this.value.id; }
  get name(): PromotionNameVO { return this.value.name; }
  get code(): PromotionCodeVO { return this.value.code; }
  get status(): PromotionStatusVO { return this.value.status; }
  get type(): PromotionTypeVO { return this.value.type; }
  get usage(): PromotionUsageVO { return this.value.usage; }
  get maxUsage(): number | null { return this.value.maxUsage; }
  get startDate(): Date | null { return this.value.startDate; }
  get endDate(): Date | null { return this.value.endDate; }
}

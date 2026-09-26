import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { DeliveryMethodIdVO } from '../primitives/delivery-method-id.vo';
import { DeliveryMethodTypeVO } from '../primitives/delivery-method-type.vo';

export interface DeliveryMethodProps {
  readonly id: DeliveryMethodIdVO;
  readonly type: DeliveryMethodTypeVO;
  readonly name: string;
  readonly basePrice: number;
  readonly isActive: boolean;
}

export class DeliveryMethodVO extends BaseVO<DeliveryMethodProps> {
  private constructor(props: DeliveryMethodProps) {
    super(Object.freeze({ ...props }));
  }

  static create(props: DeliveryMethodProps): DeliveryMethodVO {
    return new DeliveryMethodVO(props);
  }

  get id(): DeliveryMethodIdVO { return this.value.id; }
  get type(): DeliveryMethodTypeVO { return this.value.type; }
  get name(): string { return this.value.name; }
  get basePrice(): number { return this.value.basePrice; }
  get isActive(): boolean { return this.value.isActive; }
}

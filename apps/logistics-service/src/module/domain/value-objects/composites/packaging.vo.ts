import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { PackagingTypeVO } from '../primitives/packaging-type.vo';
import { PackagingMaterialVO } from '../primitives/packaging-material.vo';
import { PackagingSizeVO } from '../primitives/packaging-size.vo';
import { WeightVO } from '../primitives/weight.vo';

export interface PackagingProps {
  readonly type: PackagingTypeVO;
  readonly material: PackagingMaterialVO;
  readonly size: PackagingSizeVO;
  readonly maxWeight: WeightVO | null;
  readonly cost: number;
  readonly currency: string;
}

export class PackagingVO extends BaseVO<PackagingProps> {
  private constructor(props: PackagingProps) {
    super(Object.freeze({ ...props }));
  }

  static create(props: PackagingProps): PackagingVO {
    return new PackagingVO(props);
  }

  get type(): PackagingTypeVO { return this.value.type; }
  get material(): PackagingMaterialVO { return this.value.material; }
  get size(): PackagingSizeVO { return this.value.size; }
  get maxWeight(): WeightVO | null { return this.value.maxWeight; }
  get cost(): number { return this.value.cost; }
  get currency(): string { return this.value.currency; }
}

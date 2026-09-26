import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { LocationIdVO } from '../primitives/location-id.vo';
import { LocationCodeVO } from '../primitives/location-code.vo';
import { LocationNameVO } from '../primitives/location-name.vo';
import { LocationStatusVO } from '../primitives/location-status.vo';
import { LocationTypeVO } from '../primitives/location-type.vo';
import { WarehouseIdVO } from '../primitives/warehouse-id.vo';

export interface InventoryLocationProps {
  readonly id: LocationIdVO;
  readonly warehouseId: WarehouseIdVO;
  readonly code: LocationCodeVO;
  readonly name: LocationNameVO | null;
  readonly type: LocationTypeVO;
  readonly status: LocationStatusVO;
}

export class InventoryLocationVO extends BaseVO<InventoryLocationProps> {
  private constructor(props: InventoryLocationProps) {
    super(Object.freeze({ ...props }));
  }

  static create(props: InventoryLocationProps): InventoryLocationVO {
    return new InventoryLocationVO(props);
  }

  get id(): LocationIdVO { return this.value.id; }
  get warehouseId(): WarehouseIdVO { return this.value.warehouseId; }
  get code(): LocationCodeVO { return this.value.code; }
  get name(): LocationNameVO | null { return this.value.name; }
  get type(): LocationTypeVO { return this.value.type; }
  get status(): LocationStatusVO { return this.value.status; }
}

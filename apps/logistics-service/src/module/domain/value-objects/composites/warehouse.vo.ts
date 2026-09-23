import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { WarehouseIdVO } from '../primitives/warehouse-id.vo';
import { WarehouseCodeVO } from '../primitives/warehouse-code.vo';
import { WarehouseNameVO } from '../primitives/warehouse-name.vo';
import { WarehouseStatusVO } from '../primitives/warehouse-status.vo';

export interface WarehouseProps {
  readonly id: WarehouseIdVO;
  readonly code: WarehouseCodeVO;
  readonly name: WarehouseNameVO;
  readonly status: WarehouseStatusVO;
  readonly division: string | null;
  readonly district: string | null;
  readonly capacity: number | null;
}

export class WarehouseVO extends BaseVO<WarehouseProps> {
  private constructor(props: WarehouseProps) {
    super(Object.freeze({ ...props }));
  }

  static create(props: WarehouseProps): WarehouseVO {
    return new WarehouseVO(props);
  }

  get id(): WarehouseIdVO { return this.value.id; }
  get code(): WarehouseCodeVO { return this.value.code; }
  get name(): WarehouseNameVO { return this.value.name; }
  get status(): WarehouseStatusVO { return this.value.status; }
  get division(): string | null { return this.value.division; }
  get district(): string | null { return this.value.district; }
  get capacity(): number | null { return this.value.capacity; }
}

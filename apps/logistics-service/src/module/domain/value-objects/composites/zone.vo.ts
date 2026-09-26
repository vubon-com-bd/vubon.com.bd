import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ZoneIdVO } from '../primitives/zone-id.vo';
import { ZoneNameVO } from '../primitives/zone-name.vo';
import { ZoneTypeVO } from '../primitives/zone-type.vo';
import { ZoneStatusVO } from '../primitives/zone-status.vo';

export interface ZoneProps {
  readonly id: ZoneIdVO;
  readonly name: ZoneNameVO;
  readonly type: ZoneTypeVO;
  readonly status: ZoneStatusVO;
  readonly divisions: readonly string[];
  readonly districts: readonly string[];
}

export class ZoneVO extends BaseVO<ZoneProps> {
  private constructor(props: ZoneProps) {
    super(Object.freeze({
      ...props,
      divisions: Object.freeze([...props.divisions]),
      districts: Object.freeze([...props.districts]),
    }));
  }

  static create(props: ZoneProps): ZoneVO {
    return new ZoneVO(props);
  }

  get id(): ZoneIdVO { return this.value.id; }
  get name(): ZoneNameVO { return this.value.name; }
  get type(): ZoneTypeVO { return this.value.type; }
  get status(): ZoneStatusVO { return this.value.status; }
  get divisions(): readonly string[] { return this.value.divisions; }
  get districts(): readonly string[] { return this.value.districts; }
}

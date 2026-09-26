import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { CourierIdVO } from '../primitives/courier-id.vo';
import { CourierNameVO } from '../primitives/courier-name.vo';
import { CourierStatusVO } from '../primitives/courier-status.vo';
import { CourierTypeVO } from '../primitives/courier-type.vo';

export interface CourierProps {
  readonly id: CourierIdVO;
  readonly name: CourierNameVO;
  readonly type: CourierTypeVO;
  readonly status: CourierStatusVO;
  readonly apiUrl: string | null;
}

export class CourierVO extends BaseVO<CourierProps> {
  private constructor(props: CourierProps) {
    super(Object.freeze({ ...props }));
  }

  static create(props: CourierProps): CourierVO {
    return new CourierVO(props);
  }

  get id(): CourierIdVO { return this.value.id; }
  get name(): CourierNameVO { return this.value.name; }
  get type(): CourierTypeVO { return this.value.type; }
  get status(): CourierStatusVO { return this.value.status; }
  get apiUrl(): string | null { return this.value.apiUrl; }
}

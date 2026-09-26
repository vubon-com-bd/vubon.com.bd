import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { DeviceIdVO } from '../primitives/device-id.vo';
import { DeviceTokenVO as DeviceTokenValueVO } from '../primitives/device-token.vo';

export interface DeviceTokenCompositeProps {
  readonly deviceId: DeviceIdVO;
  readonly token: DeviceTokenValueVO;
  readonly lastUsedAt: Date;
}

export class DeviceTokenCompositeVO extends BaseVO<DeviceTokenCompositeProps> {
  private constructor(props: DeviceTokenCompositeProps) {
    super(Object.freeze({ ...props }));
  }

  static create(props: DeviceTokenCompositeProps): DeviceTokenCompositeVO {
    return new DeviceTokenCompositeVO(props);
  }

  get deviceId(): DeviceIdVO { return this.value.deviceId; }
  get token(): DeviceTokenValueVO { return this.value.token; }
  get lastUsedAt(): Date { return this.value.lastUsedAt; }
}

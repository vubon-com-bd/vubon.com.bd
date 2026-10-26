import { BaseQuery } from '@vubon/shared-kernel/application/queries';
import type { DeviceListOptionsDTO } from '@application/services/interfaces/device.service.interface.js';

export class ListDevicesQuery extends BaseQuery {
  readonly type = 'notification.device.list';
  constructor(public readonly options: DeviceListOptionsDTO) { super(); }
}

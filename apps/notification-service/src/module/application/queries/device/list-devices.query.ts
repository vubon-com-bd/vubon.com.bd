import { BaseQuery } from '@vubon/shared-kernel/application/queries';
import type { ListDevicesRequestDTO } from '../../dtos/requests/device/device.dto.js';

export class ListDevicesQuery extends BaseQuery {
  readonly type = 'device.list';
  constructor(public readonly options: ListDevicesRequestDTO) { super(); }
}

import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { RemoveDeviceRequestDTO } from '../../dtos/requests/device/device.dto.js';

export class RemoveDeviceCommand extends BaseCommand {
  readonly type = 'device.remove';
  constructor(public readonly dto: RemoveDeviceRequestDTO) {
    super();
  }
}

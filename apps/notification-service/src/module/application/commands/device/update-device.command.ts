import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { UpdateDeviceRequestDTO } from '../../dtos/requests/device/device.dto.js';

export class UpdateDeviceCommand extends BaseCommand {
  readonly type = 'device.update';
  constructor(public readonly dto: UpdateDeviceRequestDTO) {
    super();
  }
}

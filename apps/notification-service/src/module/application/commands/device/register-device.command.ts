import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { RegisterDeviceRequestDTO } from '../../dtos/requests/device/device.dto.js';

export class RegisterDeviceCommand extends BaseCommand {
  readonly type = 'device.register';
  constructor(public readonly dto: RegisterDeviceRequestDTO) {
    super();
  }
}

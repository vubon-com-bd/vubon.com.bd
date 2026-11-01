import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { RegisterDeviceCommandDTO } from '@application/dtos/requests/device/index.js';

export class RegisterDeviceCommand extends BaseCommand {
  readonly type = 'notification.device.register';
  constructor(public readonly dto: RegisterDeviceCommandDTO, public readonly actorId?: string) { super(); }
}

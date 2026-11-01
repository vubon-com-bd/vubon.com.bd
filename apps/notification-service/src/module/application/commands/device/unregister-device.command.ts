import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { UnregisterDeviceCommandDTO } from '@application/dtos/requests/device/index.js';

export class UnregisterDeviceCommand extends BaseCommand {
  readonly type = 'notification.device.unregister';
  constructor(public readonly dto: UnregisterDeviceCommandDTO, public readonly actorId?: string) { super(); }
}

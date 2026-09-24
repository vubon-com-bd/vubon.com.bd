import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class UnregisterDeviceCommand extends BaseCommand {
  readonly type = 'device.unregister';

  constructor(public readonly deviceId: string) {
    super();
  }
}

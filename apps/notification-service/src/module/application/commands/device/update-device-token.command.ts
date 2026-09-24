import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class UpdateDeviceTokenCommand extends BaseCommand {
  readonly type = 'device.update-token';

  constructor(
    public readonly deviceId: string,
    public readonly token: string,
  ) {
    super();
  }
}

import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class RegisterDeviceCommand extends BaseCommand {
  readonly type = 'device.register';

  constructor(
    public readonly userId: string,
    public readonly deviceType: string,
    public readonly platform: string,
    public readonly token: string,
    public readonly fingerprint?: string,
  ) {
    super();
  }
}

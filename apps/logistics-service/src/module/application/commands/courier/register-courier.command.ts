import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class RegisterCourierCommand extends BaseCommand {
  readonly type = 'logistics.courier.register';

  constructor(
    public readonly name: string,
    public readonly courierType: string,
    public readonly apiUrl?: string,
    public readonly apiKey?: string,
  ) {
    super();
  }
}

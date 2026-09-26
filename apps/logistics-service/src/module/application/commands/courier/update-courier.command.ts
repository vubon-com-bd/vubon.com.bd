import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class UpdateCourierCommand extends BaseCommand {
  readonly type = 'logistics.courier.update';

  constructor(
    public readonly courierId: string,
    public readonly apiUrl?: string,
    public readonly apiKey?: string,
  ) {
    super();
  }
}

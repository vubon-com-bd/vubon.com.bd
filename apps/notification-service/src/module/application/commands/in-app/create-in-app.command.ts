import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class CreateInAppCommand extends BaseCommand {
  readonly type = 'in-app.create';

  constructor(
    public readonly userId: string,
    public readonly title: string,
    public readonly body: string,
    public readonly position?: string,
    public readonly actionUrl?: string,
    public readonly autoDismissMs?: number,
    public readonly data?: Record<string, unknown>,
  ) {
    super();
  }
}

import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class LockAccountCommand extends BaseCommand {
  readonly type = 'auth.lock-account';

  constructor(
    public readonly userId: string,
    public readonly reason: string,
    public readonly durationMs: number,
  ) {
    super();
  }
}

import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class ReverifyCommand extends BaseCommand {
  readonly type = 'vendor.verification.reverify';

  constructor(
    public readonly vendorId: string,
    public readonly reason?: string,
  ) {
    super();
  }
}

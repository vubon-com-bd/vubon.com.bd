import { BaseCommand } from '@vubon/shared-kernel/application/commands';

export class UpdateReturnWindowCommand extends BaseCommand {
  readonly type = 'vendor.return_policy.update_window';
  constructor(
    public readonly vendorId: string,
    public readonly days: number,
    public readonly actorId?: string,
  ) { super(); }
}

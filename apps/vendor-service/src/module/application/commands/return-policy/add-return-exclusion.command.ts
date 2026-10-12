import { BaseCommand } from '@vubon/shared-kernel/application/commands';

export class AddReturnExclusionCommand extends BaseCommand {
  readonly type = 'vendor.return_policy.add_exclusion';
  constructor(
    public readonly vendorId: string,
    public readonly term: string,
    public readonly actorId?: string,
  ) { super(); }
}

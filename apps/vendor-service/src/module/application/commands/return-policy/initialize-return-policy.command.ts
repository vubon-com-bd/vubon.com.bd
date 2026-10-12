import { BaseCommand } from '@vubon/shared-kernel/application/commands';

export class InitializeReturnPolicyCommand extends BaseCommand {
  readonly type = 'vendor.return_policy.initialize';
  constructor(
    public readonly vendorId: string,
    public readonly actorId?: string,
  ) { super(); }
}

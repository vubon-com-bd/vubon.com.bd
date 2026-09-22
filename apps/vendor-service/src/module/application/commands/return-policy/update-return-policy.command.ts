import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class UpdateReturnPolicyCommand extends BaseCommand {
  readonly type = 'vendor.return-policy.update';

  constructor(
    public readonly vendorId: string,
    public readonly policyType: string,
    public readonly returnWindowDays: number,
    public readonly conditions?: string,
  ) {
    super();
  }
}

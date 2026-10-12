import { BaseCommand } from '@vubon/shared-kernel/application/commands';

export class UpdateReturnTypeCommand extends BaseCommand {
  readonly type = 'vendor.return_policy.update_type';
  constructor(
    public readonly vendorId: string,
    public readonly returnType: string,
    public readonly actorId?: string,
  ) { super(); }
}

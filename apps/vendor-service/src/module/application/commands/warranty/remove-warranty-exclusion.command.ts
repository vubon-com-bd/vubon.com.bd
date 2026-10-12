import { BaseCommand } from '@vubon/shared-kernel/application/commands';

export class RemoveWarrantyExclusionCommand extends BaseCommand {
  readonly type = 'vendor.warranty.remove_exclusion';
  constructor(
    public readonly vendorId: string,
    public readonly term: string,
    public readonly actorId?: string,
  ) { super(); }
}

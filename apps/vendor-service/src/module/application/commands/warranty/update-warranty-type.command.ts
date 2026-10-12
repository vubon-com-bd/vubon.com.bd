import { BaseCommand } from '@vubon/shared-kernel/application/commands';

export class UpdateWarrantyTypeCommand extends BaseCommand {
  readonly type = 'vendor.warranty.update_type';
  constructor(
    public readonly vendorId: string,
    public readonly warrantyType: string,
    public readonly actorId?: string,
  ) { super(); }
}

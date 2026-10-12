import { BaseCommand } from '@vubon/shared-kernel/application/commands';
export class MarkPackedCommand extends BaseCommand {
  readonly type = 'logistics.shipment.mark_packed';
  constructor(public readonly shipmentId: string, public readonly actorId?: string) { super(); }
}

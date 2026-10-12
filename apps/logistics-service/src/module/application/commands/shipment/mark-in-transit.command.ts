import { BaseCommand } from '@vubon/shared-kernel/application/commands';
export class MarkInTransitCommand extends BaseCommand {
  readonly type = 'logistics.shipment.mark_in_transit';
  constructor(public readonly shipmentId: string, public readonly actorId?: string) { super(); }
}

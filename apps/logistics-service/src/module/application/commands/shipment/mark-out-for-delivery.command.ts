import { BaseCommand } from '@vubon/shared-kernel/application/commands';
export class MarkOutForDeliveryCommand extends BaseCommand {
  readonly type = 'logistics.shipment.mark_out_for_delivery';
  constructor(public readonly shipmentId: string, public readonly actorId?: string) { super(); }
}

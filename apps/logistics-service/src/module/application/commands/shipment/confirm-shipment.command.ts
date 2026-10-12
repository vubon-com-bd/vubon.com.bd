import { BaseCommand } from '@vubon/shared-kernel/application/commands';
export class ConfirmShipmentCommand extends BaseCommand {
  readonly type = 'logistics.shipment.confirm';
  constructor(public readonly shipmentId: string, public readonly actorId?: string) { super(); }
}

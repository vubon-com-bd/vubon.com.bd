import { BaseCommand } from '@vubon/shared-kernel/application/commands';
export class StartProcessingCommand extends BaseCommand {
  readonly type = 'logistics.shipment.start_processing';
  constructor(public readonly shipmentId: string, public readonly actorId?: string) { super(); }
}

import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { RecordOrderStatsCommand } from './record-order-stats.command.js';
import {
  VENDOR_STATS_SERVICE,
  type IVendorStatsService,
  type VendorStatsDto,
} from '../../services/interfaces/vendor-stats.service.interface.js';

@CommandHandler(RecordOrderStatsCommand)
export class RecordOrderStatsHandler
  implements ICommandHandler<RecordOrderStatsCommand, VendorStatsDto>
{
  constructor(@Inject(VENDOR_STATS_SERVICE) private readonly service: IVendorStatsService) {}
  async execute(cmd: RecordOrderStatsCommand): Promise<VendorStatsDto> {
    return this.service.recordOrder(cmd.vendorId, cmd.amount, cmd.actorId);
  }
}

import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { InitializeStatsPeriodCommand } from './initialize-stats-period.command.js';
import {
  VENDOR_STATS_SERVICE,
  type IVendorStatsService,
  type VendorStatsDto,
} from '../../services/interfaces/vendor-stats.service.interface.js';

@CommandHandler(InitializeStatsPeriodCommand)
export class InitializeStatsPeriodHandler
  implements ICommandHandler<InitializeStatsPeriodCommand, VendorStatsDto>
{
  constructor(@Inject(VENDOR_STATS_SERVICE) private readonly service: IVendorStatsService) {}
  async execute(cmd: InitializeStatsPeriodCommand): Promise<VendorStatsDto> {
    return this.service.initializePeriod(cmd.vendorId, cmd.periodStart, cmd.periodEnd, cmd.currency, cmd.actorId);
  }
}

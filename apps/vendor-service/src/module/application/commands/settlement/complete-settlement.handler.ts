import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { CompleteSettlementCommand } from './complete-settlement.command.js';
import {
  VENDOR_SETTLEMENT_SERVICE,
  type IVendorSettlementService,
} from '../../services/interfaces/vendor-settlement.service.interface.js';
import type { SettlementResponseDTO } from '../../dtos/responses/settlement-response.dto.js';

@CommandHandler(CompleteSettlementCommand)
export class CompleteSettlementHandler
  implements ICommandHandler<CompleteSettlementCommand, SettlementResponseDTO>
{
  constructor(
    @Inject(VENDOR_SETTLEMENT_SERVICE)
    private readonly service: IVendorSettlementService,
  ) {}

  async execute(c: CompleteSettlementCommand): Promise<SettlementResponseDTO> {
    return this.service.complete(c.dto, c.actorId);
  }
}

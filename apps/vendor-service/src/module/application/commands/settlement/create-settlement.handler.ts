import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { CreateSettlementCommand } from './create-settlement.command.js';
import {
  VENDOR_SETTLEMENT_SERVICE,
  type IVendorSettlementService,
} from '../../services/interfaces/vendor-settlement.service.interface.js';
import type { SettlementResponseDTO } from '../../dtos/responses/settlement-response.dto.js';

@CommandHandler(CreateSettlementCommand)
export class CreateSettlementHandler
  implements ICommandHandler<CreateSettlementCommand, SettlementResponseDTO>
{
  constructor(
    @Inject(VENDOR_SETTLEMENT_SERVICE)
    private readonly service: IVendorSettlementService,
  ) {}

  async execute(c: CreateSettlementCommand): Promise<SettlementResponseDTO> {
    return this.service.create(c.dto, c.actorId);
  }
}

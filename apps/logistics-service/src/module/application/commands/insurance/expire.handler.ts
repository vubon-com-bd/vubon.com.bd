import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ExpireInsuranceCommand } from './expire.command.js';
import { INSURANCE_SERVICE, type IInsuranceService } from '@application/services/interfaces/insurance.service.interface';
import type { InsuranceResponseDTO } from '@application/dtos/responses/insurance/index.js';

@CommandHandler(ExpireInsuranceCommand)
export class ExpireInsuranceHandler implements ICommandHandler<ExpireInsuranceCommand, InsuranceResponseDTO> {
  constructor(@Inject(INSURANCE_SERVICE) private readonly service: IInsuranceService) {}
  async execute(c: ExpireInsuranceCommand): Promise<InsuranceResponseDTO> { return this.service.expire(c.dto, c.actorId); }
}

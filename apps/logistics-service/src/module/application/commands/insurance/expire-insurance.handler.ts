import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ExpireInsuranceCommand } from './expire-insurance.command.js';
import { INSURANCE_SERVICE, type IInsuranceService } from '../../services/interfaces/insurance.service.interface.js';
import type { InsuranceResponseDTO } from '../../dtos/responses/insurance/insurance-response.dto.js';

@CommandHandler(ExpireInsuranceCommand)
export class ExpireInsuranceHandler implements ICommandHandler<ExpireInsuranceCommand, InsuranceResponseDTO> {
  constructor(@Inject(INSURANCE_SERVICE) private readonly service: IInsuranceService) {}
  async execute(c: ExpireInsuranceCommand): Promise<InsuranceResponseDTO> { return this.service.expire(c.dto, c.actorId); }
}

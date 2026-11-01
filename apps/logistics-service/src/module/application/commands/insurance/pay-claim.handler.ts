import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { PayClaimInsuranceCommand } from './pay-claim.command.js';
import { INSURANCE_SERVICE, type IInsuranceService } from '@application/services/interfaces/insurance.service.interface';
import type { InsuranceResponseDTO } from '@application/dtos/responses/insurance/index.js';

@CommandHandler(PayClaimInsuranceCommand)
export class PayClaimInsuranceHandler implements ICommandHandler<PayClaimInsuranceCommand, InsuranceResponseDTO> {
  constructor(@Inject(INSURANCE_SERVICE) private readonly service: IInsuranceService) {}
  async execute(c: PayClaimInsuranceCommand): Promise<InsuranceResponseDTO> { return this.service.payClaim(c.dto, c.actorId); }
}

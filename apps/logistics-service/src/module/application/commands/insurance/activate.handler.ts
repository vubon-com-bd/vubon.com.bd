import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ActivateInsuranceCommand } from './activate.command.js';
import { INSURANCE_SERVICE, type IInsuranceService } from '@application/services/interfaces/insurance.service.interface';
import type { InsuranceResponseDTO } from '@application/dtos/responses/insurance/index.js';

@CommandHandler(ActivateInsuranceCommand)
export class ActivateInsuranceHandler implements ICommandHandler<ActivateInsuranceCommand, InsuranceResponseDTO> {
  constructor(@Inject(INSURANCE_SERVICE) private readonly service: IInsuranceService) {}
  async execute(c: ActivateInsuranceCommand): Promise<InsuranceResponseDTO> { return this.service.activate(c.dto, c.actorId); }
}

import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ActivateInsuranceCommand } from './activate-insurance.command.js';
import { INSURANCE_SERVICE, type IInsuranceService } from '../../services/interfaces/insurance.service.interface.js';
import type { InsuranceResponseDTO } from '../../dtos/responses/insurance/insurance-response.dto.js';

@CommandHandler(ActivateInsuranceCommand)
export class ActivateInsuranceHandler implements ICommandHandler<ActivateInsuranceCommand, InsuranceResponseDTO> {
  constructor(@Inject(INSURANCE_SERVICE) private readonly service: IInsuranceService) {}
  async execute(c: ActivateInsuranceCommand): Promise<InsuranceResponseDTO> { return this.service.activate(c.dto, c.actorId); }
}

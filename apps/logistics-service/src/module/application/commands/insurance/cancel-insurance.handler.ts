import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { CancelInsuranceCommand } from './cancel-insurance.command.js';
import { INSURANCE_SERVICE, type IInsuranceService } from '../../services/interfaces/insurance.service.interface.js';
import type { InsuranceResponseDTO } from '../../dtos/responses/insurance/insurance-response.dto.js';

@CommandHandler(CancelInsuranceCommand)
export class CancelInsuranceHandler implements ICommandHandler<CancelInsuranceCommand, InsuranceResponseDTO> {
  constructor(@Inject(INSURANCE_SERVICE) private readonly service: IInsuranceService) {}
  async execute(c: CancelInsuranceCommand): Promise<InsuranceResponseDTO> { return this.service.cancel(c.dto, c.actorId); }
}

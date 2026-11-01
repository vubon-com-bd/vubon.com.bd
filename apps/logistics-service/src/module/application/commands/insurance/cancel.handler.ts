import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { CancelInsuranceCommand } from './cancel.command.js';
import { INSURANCE_SERVICE, type IInsuranceService } from '@application/services/interfaces/insurance.service.interface';
import type { InsuranceResponseDTO } from '@application/dtos/responses/insurance/index.js';

@CommandHandler(CancelInsuranceCommand)
export class CancelInsuranceHandler implements ICommandHandler<CancelInsuranceCommand, InsuranceResponseDTO> {
  constructor(@Inject(INSURANCE_SERVICE) private readonly service: IInsuranceService) {}
  async execute(c: CancelInsuranceCommand): Promise<InsuranceResponseDTO> { return this.service.cancel(c.dto, c.actorId); }
}

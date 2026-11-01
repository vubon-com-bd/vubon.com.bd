import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { CreateInsuranceCommand } from './create-insurance.command.js';
import { INSURANCE_SERVICE, type IInsuranceService } from '@application/services/interfaces/insurance.service.interface';
import type { InsuranceResponseDTO } from '@application/dtos/responses/insurance/index.js';

@CommandHandler(CreateInsuranceCommand)
export class CreateInsuranceHandler implements ICommandHandler<CreateInsuranceCommand, InsuranceResponseDTO> {
  constructor(@Inject(INSURANCE_SERVICE) private readonly service: IInsuranceService) {}
  async execute(c: CreateInsuranceCommand): Promise<InsuranceResponseDTO> { return this.service.create(c.dto, c.actorId); }
}

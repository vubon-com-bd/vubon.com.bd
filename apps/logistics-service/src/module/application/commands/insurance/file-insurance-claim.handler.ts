import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { FileInsuranceClaimCommand } from './file-insurance-claim.command.js';
import { INSURANCE_SERVICE, type IInsuranceService } from '../../services/interfaces/insurance.service.interface.js';
import type { InsuranceResponseDTO } from '../../dtos/responses/insurance/insurance-response.dto.js';

@CommandHandler(FileInsuranceClaimCommand)
export class FileInsuranceClaimHandler implements ICommandHandler<FileInsuranceClaimCommand, InsuranceResponseDTO> {
  constructor(@Inject(INSURANCE_SERVICE) private readonly service: IInsuranceService) {}
  async execute(c: FileInsuranceClaimCommand): Promise<InsuranceResponseDTO> { return this.service.fileClaim(c.dto, c.actorId); }
}

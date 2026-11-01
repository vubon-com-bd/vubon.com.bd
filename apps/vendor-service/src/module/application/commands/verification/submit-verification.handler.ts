import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { SubmitVerificationCommand } from './submit-verification.command.js';
import {
  VENDOR_VERIFICATION_SERVICE,
  type IVendorVerificationService,
} from '../../services/interfaces/vendor-verification.service.interface.js';
import type { VerificationResponseDTO } from '../../dtos/responses/verification-response.dto.js';

@CommandHandler(SubmitVerificationCommand)
export class SubmitVerificationHandler
  implements ICommandHandler<SubmitVerificationCommand, VerificationResponseDTO>
{
  constructor(
    @Inject(VENDOR_VERIFICATION_SERVICE)
    private readonly service: IVendorVerificationService,
  ) {}

  async execute(c: SubmitVerificationCommand): Promise<VerificationResponseDTO> {
    return this.service.submit(c.dto, c.actorId);
  }
}

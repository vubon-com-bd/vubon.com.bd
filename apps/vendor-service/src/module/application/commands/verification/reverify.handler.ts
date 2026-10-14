import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ReverifyCommand } from './reverify.command.js';
import {
  VENDOR_VERIFICATION_SERVICE,
  type IVendorVerificationService,
} from '../../services/interfaces/vendor-verification.service.interface.js';
import type { VerificationResponseDTO } from '../../dtos/responses/verification-response.dto.js';

@CommandHandler(ReverifyCommand)
export class ReverifyHandler
  implements ICommandHandler<ReverifyCommand, VerificationResponseDTO>
{
  constructor(
    @Inject(VENDOR_VERIFICATION_SERVICE)
    private readonly service: IVendorVerificationService,
  ) {}

  async execute(c: ReverifyCommand): Promise<VerificationResponseDTO> {
    return this.service.reverify(c.dto, c.actorId);
  }
}

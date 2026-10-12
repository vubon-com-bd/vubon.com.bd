/**
 * SubmitVerificationHandler
 * @module vendor-service/application/commands/verification
 */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { SubmitVerificationCommand } from './submit-verification.command.js';
import {
  VENDOR_VERIFICATION_SERVICE,
  type IVendorVerificationService,
} from '../../services/interfaces/vendor-verification.service.interface.js';
import type { VendorVerificationResponseDto } from '../../dtos/responses/vendor-verification-response.dto.js';

@CommandHandler(SubmitVerificationCommand)
export class SubmitVerificationHandler
  implements ICommandHandler<SubmitVerificationCommand, VendorVerificationResponseDto>
{
  constructor(
    @Inject(VENDOR_VERIFICATION_SERVICE) private readonly service: IVendorVerificationService,
  ) {}

  async execute(cmd: SubmitVerificationCommand): Promise<VendorVerificationResponseDto> {
    return this.service.submit(cmd.dto, cmd.actorId);
  }
}

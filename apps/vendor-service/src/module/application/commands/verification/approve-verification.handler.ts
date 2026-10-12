/**
 * ApproveVerificationHandler
 * @module vendor-service/application/commands/verification
 */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ApproveVerificationCommand } from './approve-verification.command.js';
import {
  VENDOR_VERIFICATION_SERVICE,
  type IVendorVerificationService,
} from '../../services/interfaces/vendor-verification.service.interface.js';
import type { VendorVerificationResponseDto } from '../../dtos/responses/vendor-verification-response.dto.js';

@CommandHandler(ApproveVerificationCommand)
export class ApproveVerificationHandler
  implements ICommandHandler<ApproveVerificationCommand, VendorVerificationResponseDto>
{
  constructor(
    @Inject(VENDOR_VERIFICATION_SERVICE) private readonly service: IVendorVerificationService,
  ) {}

  async execute(cmd: ApproveVerificationCommand): Promise<VendorVerificationResponseDto> {
    return this.service.approve(cmd.vendorId, cmd.reviewedBy, cmd.actorId);
  }
}

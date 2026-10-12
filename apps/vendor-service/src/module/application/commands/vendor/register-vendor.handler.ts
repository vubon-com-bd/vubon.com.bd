/**
 * RegisterVendorHandler
 * @module vendor-service/application/commands/vendor
 */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { RegisterVendorCommand } from './register-vendor.command.js';
import {
  VENDOR_SERVICE,
  type IVendorService,
} from '../../services/interfaces/vendor.service.interface.js';
import type { VendorResponseDto } from '../../dtos/responses/vendor-response.dto.js';

@CommandHandler(RegisterVendorCommand)
export class RegisterVendorHandler
  implements ICommandHandler<RegisterVendorCommand, VendorResponseDto>
{
  constructor(
    @Inject(VENDOR_SERVICE) private readonly service: IVendorService,
  ) {}

  async execute(cmd: RegisterVendorCommand): Promise<VendorResponseDto> {
    return this.service.register(cmd.dto, cmd.actorId);
  }
}

/**
 * DeleteVendorHandler
 * @module vendor-service/application/commands/vendor
 */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { DeleteVendorCommand } from './delete-vendor.command.js';
import {
  VENDOR_SERVICE,
  type IVendorService,
} from '../../services/interfaces/vendor.service.interface.js';

@CommandHandler(DeleteVendorCommand)
export class DeleteVendorHandler
  implements ICommandHandler<DeleteVendorCommand, void>
{
  constructor(
    @Inject(VENDOR_SERVICE) private readonly service: IVendorService,
  ) {}

  async execute(cmd: DeleteVendorCommand): Promise<void> {
    return this.service.softDelete(cmd.dto, cmd.actorId);
  }
}

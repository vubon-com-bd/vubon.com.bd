import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { DeleteVendorCommand } from './delete-vendor.command.js';
import {
  VENDOR_SERVICE,
  type IVendorService,
} from '../../services/interfaces/vendor.service.interface.js';

@CommandHandler(DeleteVendorCommand)
export class DeleteVendorHandler
  implements ICommandHandler<DeleteVendorCommand, { readonly success: true; readonly vendorId: string }>
{
  constructor(
    @Inject(VENDOR_SERVICE)
    private readonly service: IVendorService,
  ) {}

  async execute(c: DeleteVendorCommand): Promise<{ readonly success: true; readonly vendorId: string }> {
    return this.service.delete(c.dto);
  }
}

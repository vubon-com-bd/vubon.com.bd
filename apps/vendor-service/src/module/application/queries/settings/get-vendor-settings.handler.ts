import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetVendorSettingsQuery } from './get-vendor-settings.query.js';
import {
  VENDOR_SETTINGS_SERVICE,
  type IVendorSettingsService,
  type VendorSettingsResponseDto,
} from '../../services/interfaces/vendor-settings.service.interface.js';

@QueryHandler(GetVendorSettingsQuery)
export class GetVendorSettingsHandler
  implements IQueryHandler<GetVendorSettingsQuery, VendorSettingsResponseDto>
{
  constructor(@Inject(VENDOR_SETTINGS_SERVICE) private readonly service: IVendorSettingsService) {}
  async execute(query: GetVendorSettingsQuery): Promise<VendorSettingsResponseDto> {
    return this.service.getByVendorId(query.vendorId);
  }
}

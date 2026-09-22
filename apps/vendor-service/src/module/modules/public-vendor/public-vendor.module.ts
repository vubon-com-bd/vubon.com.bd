import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { PublicVendorController } from '../../interfaces/controllers/rest/public-vendor.controller';
import { GetVendorBySlugHandler } from '../../application/queries/vendor';
import { ListVendorsHandler } from '../../application/queries/vendor';

@Module({
  imports: [CqrsModule],
  controllers: [PublicVendorController],
  providers: [GetVendorBySlugHandler, ListVendorsHandler],
})
export class PublicVendorModule {}

import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { BrandController } from '../../interfaces/controllers/rest/brand.controller';
import { BrandService } from '../../application/services/impl/brand.service';
import { BrandMapper } from '../../application/mappers/brand.mapper';
import {
  CreateBrandHandler,
  UpdateBrandHandler,
  DeleteBrandHandler,
} from '../../application/commands/brand';
import {
  ListBrandsHandler,
  GetBrandHandler,
} from '../../application/queries/brand';
import { BrandPrismaRepository } from '../../infrastructure/persistence/prisma/repositories/brand.prisma.repository';

const COMMAND_HANDLERS = [
  CreateBrandHandler,
  UpdateBrandHandler,
  DeleteBrandHandler,
];

const QUERY_HANDLERS = [ListBrandsHandler, GetBrandHandler];

@Module({
  imports: [CqrsModule],
  controllers: [BrandController],
  providers: [
    BrandPrismaRepository,
    BrandService,
    BrandMapper,
    ...COMMAND_HANDLERS,
    ...QUERY_HANDLERS,
  ],
  exports: [BrandService, BrandPrismaRepository],
})
export class BrandModule {}

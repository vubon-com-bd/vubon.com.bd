import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { PackagingController } from '../../interfaces/controllers/rest/packaging.controller';
import { PackagingService } from '../../application/services/impl/packaging.service';

import { CreatePackagingHandler } from '../../application/commands/packaging/create-packaging.handler';
import { SelectPackagingHandler } from '../../application/commands/packaging/select-packaging.handler';

import { ListPackagingHandler } from '../../application/queries/packaging/list-packaging.handler';

import { PackagingPrismaRepository } from '../../infrastructure/persistence/prisma/repositories/packaging.prisma.repository';

@Module({
  imports: [CqrsModule],
  controllers: [PackagingController],
  providers: [
    PackagingPrismaRepository,
    PackagingService,
    CreatePackagingHandler,
    SelectPackagingHandler,
    ListPackagingHandler,
  ],
  exports: [PackagingService, PackagingPrismaRepository],
})
export class PackagingModule {}

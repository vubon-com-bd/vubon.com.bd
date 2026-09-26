import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { VendorController } from '../../interfaces/controllers/rest/vendor.controller';
import { OwnVendorGuard } from '../../interfaces/guards/own-vendor.guard';
import { VendorApprovedGuard } from '../../interfaces/guards/vendor-approved.guard';
import { VendorActiveGuard } from '../../interfaces/guards/vendor-active.guard';
import { TeamMemberGuard } from '../../interfaces/guards/team-member.guard';
import { VendorCacheInterceptor } from '../../interfaces/interceptors/vendor-cache.interceptor';

import { RegisterVendorHandler } from '../../application/commands/vendor';
import { UpdateVendorHandler } from '../../application/commands/vendor';
import { DeleteVendorHandler } from '../../application/commands/vendor';
import { UpdateProfileHandler } from '../../application/commands/vendor';
import { UpdateBusinessHandler } from '../../application/commands/vendor';

import { GetVendorHandler } from '../../application/queries/vendor';
import { GetVendorBySlugHandler } from '../../application/queries/vendor';
import { ListVendorsHandler } from '../../application/queries/vendor';
import { SearchVendorsHandler } from '../../application/queries/vendor';
import { GetMyVendorHandler } from '../../application/queries/vendor';
import { GetVendorStatsHandler } from '../../application/queries/vendor';

import { VendorOnboardingSaga } from '../../application/sagas/vendor-onboarding.saga';

import { VendorService } from '../../application/services/impl/vendor.service';

import { VendorPrismaRepository } from '../../infrastructure/persistence/prisma/repositories/vendor.prisma.repository';
import { VendorCacheRepository } from '../../infrastructure/persistence/cache/repositories/vendor.cache.repository';

import { SlugGeneratorService } from '../../infrastructure/services/internal/slug-generator.service';
import { TierCalculatorService } from '../../infrastructure/services/internal/tier-calculator.service';

const CommandHandlers = [
  RegisterVendorHandler,
  UpdateVendorHandler,
  DeleteVendorHandler,
  UpdateProfileHandler,
  UpdateBusinessHandler,
];

const QueryHandlers = [
  GetVendorHandler,
  GetVendorBySlugHandler,
  ListVendorsHandler,
  SearchVendorsHandler,
  GetMyVendorHandler,
  GetVendorStatsHandler,
];

const Sagas = [VendorOnboardingSaga];

@Module({
  imports: [CqrsModule],
  controllers: [VendorController],
  providers: [
    VendorPrismaRepository,
    VendorCacheRepository,
    VendorService,
    SlugGeneratorService,
    TierCalculatorService,
    ...CommandHandlers,
    ...QueryHandlers,
    ...Sagas,
    OwnVendorGuard,
    VendorApprovedGuard,
    VendorActiveGuard,
    TeamMemberGuard,
    VendorCacheInterceptor,
  ],
  exports: [
    VendorService,
    VendorPrismaRepository,
    VendorCacheRepository,
  ],
})
export class VendorModule {}

import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { ProviderController } from '../../interfaces/controllers/rest/provider.controller';
import { ProviderPrismaRepository } from '../../infrastructure/persistence/prisma/repositories/provider.prisma.repository';
import { ProviderConfigPrismaRepository } from '../../infrastructure/persistence/prisma/repositories/provider-config.prisma.repository';
import { ProviderService } from '../../application/services/impl/provider.service';
import { ProviderConfigService } from '../../application/services/impl/provider-config.service';

@Module({
  imports: [CqrsModule],
  controllers: [ProviderController],
  providers: [
    ProviderPrismaRepository,
    ProviderConfigPrismaRepository,
    ProviderService,
    ProviderConfigService,
  ],
  exports: [ProviderService, ProviderConfigService],
})
export class ProviderModule {}

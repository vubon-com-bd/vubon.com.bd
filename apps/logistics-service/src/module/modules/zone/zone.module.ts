import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { ZoneController } from '../../interfaces/controllers/rest/zone.controller';
import { ZoneService } from '../../application/services/impl/zone.service';

import { CreateZoneHandler } from '../../application/commands/zone/create-zone.handler';
import { UpdateZoneHandler } from '../../application/commands/zone/update-zone.handler';

import { GetZoneHandler } from '../../application/queries/zone/get-zone.handler';
import { ListZonesHandler } from '../../application/queries/zone/list-zones.handler';

import { ZonePrismaRepository } from '../../infrastructure/persistence/prisma/repositories/zone.prisma.repository';
import { ZoneCacheRepository } from '../../infrastructure/persistence/cache/repositories/zone.cache.repository';

@Module({
  imports: [CqrsModule],
  controllers: [ZoneController],
  providers: [
    ZonePrismaRepository,
    ZoneCacheRepository,
    ZoneService,
    CreateZoneHandler,
    UpdateZoneHandler,
    GetZoneHandler,
    ListZonesHandler,
  ],
  exports: [ZoneService, ZonePrismaRepository, ZoneCacheRepository],
})
export class ZoneModule {}

import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { RouteController } from '../../interfaces/controllers/rest/route.controller';
import { RouteService } from '../../application/services/impl/route.service';
import { RouteMapper } from '../../application/mappers/route.mapper';

import { CreateRouteHandler } from '../../application/commands/route/create-route.handler';
import { OptimizeRouteHandler } from '../../application/commands/route/optimize-route.handler';
import { UpdateRouteHandler } from '../../application/commands/route/update-route.handler';

import { GetRouteHandler } from '../../application/queries/route/get-route.handler';
import { ListRoutesHandler } from '../../application/queries/route/list-routes.handler';

import { RoutePrismaRepository } from '../../infrastructure/persistence/prisma/repositories/route.prisma.repository';
import { RouteCacheRepository } from '../../infrastructure/persistence/cache/repositories/route.cache.repository';

@Module({
  imports: [CqrsModule],
  controllers: [RouteController],
  providers: [
    RoutePrismaRepository,
    RouteCacheRepository,
    RouteService,
    RouteMapper,
    CreateRouteHandler,
    OptimizeRouteHandler,
    UpdateRouteHandler,
    GetRouteHandler,
    ListRoutesHandler,
  ],
  exports: [RouteService, RoutePrismaRepository, RouteCacheRepository],
})
export class RouteModule {}

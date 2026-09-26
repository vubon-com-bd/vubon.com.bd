import type { BaseServiceInterface } from '@vubon/shared-kernel/application/services/base.service.interface';
import type { RouteEntity } from '../../../domain/entities/route.entity';
import type { CreateRouteRequestDTO } from '../../dtos/requests/route/create-route.dto';
import type { OptimizeRouteRequestDTO } from '../../dtos/requests/route/optimize-route.dto';
import type { UpdateRouteRequestDTO } from '../../dtos/requests/route/update-route.dto';
import type { RouteResponseDTO } from '../../dtos/responses/route-response.dto';

export interface RouteServiceInterface
  extends BaseServiceInterface<RouteEntity, string> {
  create(input: CreateRouteRequestDTO): Promise<RouteResponseDTO>;
  optimize(input: OptimizeRouteRequestDTO): Promise<RouteResponseDTO>;
  update(input: UpdateRouteRequestDTO): Promise<RouteResponseDTO>;
}

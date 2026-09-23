import { Injectable } from '@nestjs/common';
import { BaseService } from '@vubon/shared-kernel/application/services/base.service';
import type { RouteServiceInterface } from '../interfaces/route.service.interface';
import type { RouteRepository } from '../../../domain/repositories/route.repository.interface';
import { RouteEntity } from '../../../domain/entities/route.entity';
import { RouteIdVO } from '../../../domain/value-objects/primitives/route-id.vo';
import { RouteNameVO } from '../../../domain/value-objects/primitives/route-name.vo';
import { RouteStatusVO } from '../../../domain/value-objects/primitives/route-status.vo';
import { RouteTypeVO } from '../../../domain/value-objects/primitives/route-type.vo';
import { RouteOptimizationVO } from '../../../domain/value-objects/primitives/route-optimization.vo';
import type { CreateRouteRequestDTO } from '../../dtos/requests/route/create-route.dto';
import type { OptimizeRouteRequestDTO } from '../../dtos/requests/route/optimize-route.dto';
import type { UpdateRouteRequestDTO } from '../../dtos/requests/route/update-route.dto';
import type { RouteResponseDTO } from '../../dtos/responses/route-response.dto';

@Injectable()
export class RouteService
  extends BaseService<RouteEntity, string>
  implements RouteServiceInterface
{
  readonly name = 'RouteService';

  constructor(private readonly repo: RouteRepository) {
    super();
  }

  async create(input: CreateRouteRequestDTO): Promise<RouteResponseDTO> {
    const entity = RouteEntity.create({
      name: RouteNameVO.create(input.name),
      status: RouteStatusVO.create('active'),
      type: RouteTypeVO.create(input.type),
      distance: null,
      optimization: null,
      zones: [],
      optimized: false,
    });
    const saved = await this.repo.save(entity);
    return this.toDTO(saved);
  }

  async optimize(input: OptimizeRouteRequestDTO): Promise<RouteResponseDTO> {
    const entity = await this.repo.findById(RouteIdVO.create(input.routeId));
    if (!entity) throw new Error('Route not found');
    const updated = entity.markOptimized(0);
    const saved = await this.repo.save(updated);
    void RouteOptimizationVO.create(input.optimization);
    return this.toDTO(saved);
  }

  async update(input: UpdateRouteRequestDTO): Promise<RouteResponseDTO> {
    const entity = await this.repo.findById(RouteIdVO.create(input.routeId));
    if (!entity) throw new Error('Route not found');
    return this.toDTO(entity);
  }

  private toDTO(entity: RouteEntity): RouteResponseDTO {
    return {
      id: entity.id.value,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    } as unknown as RouteResponseDTO;
  }
}

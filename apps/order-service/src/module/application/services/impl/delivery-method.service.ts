/**
 * DeliveryMethodService
 * @module order-service/application/services/impl
 */
import { Inject, Injectable } from '@nestjs/common';
import type { IDeliveryMethodService } from '../interfaces/delivery-method.service.interface.js';
import {
  DELIVERY_METHOD_REPOSITORY,
  type DeliveryMethodRepository,
} from '../../../domain/repositories/delivery-method.repository.interface.js';
import { DeliveryMethodMapper } from '../../mappers/delivery.mapper.js';
import { DeliveryMethodNotFoundApplicationError } from '../../errors/delivery.errors.js';
import type { DeliveryMethodResponseDTO } from '../../dtos/responses/delivery-response.dto.js';

@Injectable()
export class DeliveryMethodService implements IDeliveryMethodService {
  constructor(
    @Inject(DELIVERY_METHOD_REPOSITORY)
    private readonly repo: DeliveryMethodRepository,
  ) {}

  async getById(id: string): Promise<DeliveryMethodResponseDTO> {
    const entity = await this.repo.findById(id);
    if (!entity) throw new DeliveryMethodNotFoundApplicationError(id);
    return DeliveryMethodMapper.toResponse(entity);
  }

  async listActive(): Promise<readonly DeliveryMethodResponseDTO[]> {
    const entities = await this.repo.findActive();
    return entities.map((e) => DeliveryMethodMapper.toResponse(e));
  }

  async listAll(): Promise<readonly DeliveryMethodResponseDTO[]> {
    const entities = await this.repo.findAll();
    return entities.map((e) => DeliveryMethodMapper.toResponse(e));
  }
}

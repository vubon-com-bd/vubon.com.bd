/**
 * DeliveryMethodService
 */
import { Inject, Injectable } from '@nestjs/common';
import type { IDeliveryMethodService } from '../interfaces/delivery-method.service.interface.js';
import {
  DELIVERY_METHOD_REPOSITORY,
  type DeliveryMethodRepository,
} from '../../../domain/repositories/delivery-method.repository.interface.js';
import { DeliveryMethodIdVO } from '../../../domain/value-objects/primitives/delivery-method-id.vo.js';
import { DeliveryMethodTypeVO } from '../../../domain/value-objects/primitives/delivery-method-type.vo.js';
import { DeliveryMapper } from '../../mappers/delivery.mapper.js';
import { DeliveryMethodNotFoundApplicationError } from '../../errors/delivery.errors.js';
import type { DeliveryMethodResponseDTO } from '../../dtos/responses/delivery-response.dto.js';

@Injectable()
export class DeliveryMethodService implements IDeliveryMethodService {
  constructor(
    @Inject(DELIVERY_METHOD_REPOSITORY) private readonly repo: DeliveryMethodRepository,
  ) {}

  async getById(methodId: string): Promise<DeliveryMethodResponseDTO> {
    const entity = await this.repo.findById(methodId);
    if (!entity) throw new DeliveryMethodNotFoundApplicationError(methodId);
    return DeliveryMapper.toMethodResponse(entity);
  }

  async listAll(): Promise<readonly DeliveryMethodResponseDTO[]> {
    const list = await this.repo.findAll();
    return DeliveryMapper.toMethodList(list);
  }

  async listActive(): Promise<readonly DeliveryMethodResponseDTO[]> {
    const list = await this.repo.findActive();
    return DeliveryMapper.toMethodList(list);
  }

  async listByType(type: string): Promise<readonly DeliveryMethodResponseDTO[]> {
    const list = await this.repo.findByType(DeliveryMethodTypeVO.create(type));
    return DeliveryMapper.toMethodList(list);
  }

  static readonly _IdVO = DeliveryMethodIdVO;
}

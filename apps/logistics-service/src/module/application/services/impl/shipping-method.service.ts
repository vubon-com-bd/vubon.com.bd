import { Injectable } from '@nestjs/common';
import { BaseService } from '@vubon/shared-kernel/application/services/base.service';
import type { ShippingMethodServiceInterface } from '../interfaces/shipping-method.service.interface';
import type { ShippingMethodRepository } from '../../../domain/repositories/shipping-method.repository.interface';
import { ShippingMethodEntity } from '../../../domain/entities/shipping-method.entity';
import { ShippingMethodTypeVO } from '../../../domain/value-objects/primitives/shipping-method-type.vo';
import type { CreateShippingMethodRequestDTO } from '../../dtos/requests/shipping-method/create-shipping-method.dto';
import type { UpdateShippingMethodRequestDTO } from '../../dtos/requests/shipping-method/update-shipping-method.dto';
import type { CalculateShippingRequestDTO } from '../../dtos/requests/shipping-method/calculate-shipping.dto';
import type { ShippingMethodResponseDTO } from '../../dtos/responses/shipping-method-response.dto';

@Injectable()
export class ShippingMethodService
  extends BaseService<ShippingMethodEntity, string>
  implements ShippingMethodServiceInterface
{
  readonly name = 'ShippingMethodService';

  constructor(private readonly repo: ShippingMethodRepository) {
    super();
  }

  async create(input: CreateShippingMethodRequestDTO): Promise<ShippingMethodResponseDTO> {
    const entity = ShippingMethodEntity.create({
      name: input.name,
      type: ShippingMethodTypeVO.create(input.type),
      status: 'active',
      baseRate: input.baseRate,
      perKgRate: input.perKgRate ?? null,
      currency: input.currency,
      estimatedDays: input.estimatedDays ?? null,
      zones: [],
    });
    const saved = await this.repo.save(entity);
    return this.toDTO(saved);
  }

  async update(input: UpdateShippingMethodRequestDTO): Promise<ShippingMethodResponseDTO> {
    const entity = await this.repo.findById(input.methodId);
    if (!entity) throw new Error('Shipping method not found');
    return this.toDTO(entity);
  }

  async calculate(input: CalculateShippingRequestDTO): Promise<{ rate: number; currency: string }> {
    const entity = await this.repo.findById(input.methodId ?? '');
    if (!entity) return { rate: 0, currency: 'BDT' };
    const rate = entity.baseRate + (entity.perKgRate ?? 0) * input.weightKg;
    return { rate, currency: entity.currency };
  }

  private toDTO(entity: ShippingMethodEntity): ShippingMethodResponseDTO {
    return {
      id: entity.id,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    } as unknown as ShippingMethodResponseDTO;
  }
}

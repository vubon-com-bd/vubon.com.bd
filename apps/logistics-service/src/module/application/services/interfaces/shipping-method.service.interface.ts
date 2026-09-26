import type { BaseServiceInterface } from '@vubon/shared-kernel/application/services/base.service.interface';
import type { ShippingMethodEntity } from '../../../domain/entities/shipping-method.entity';
import type { CreateShippingMethodRequestDTO } from '../../dtos/requests/shipping-method/create-shipping-method.dto';
import type { UpdateShippingMethodRequestDTO } from '../../dtos/requests/shipping-method/update-shipping-method.dto';
import type { CalculateShippingRequestDTO } from '../../dtos/requests/shipping-method/calculate-shipping.dto';
import type { ShippingMethodResponseDTO } from '../../dtos/responses/shipping-method-response.dto';

export interface ShippingMethodServiceInterface
  extends BaseServiceInterface<ShippingMethodEntity, string> {
  create(input: CreateShippingMethodRequestDTO): Promise<ShippingMethodResponseDTO>;
  update(input: UpdateShippingMethodRequestDTO): Promise<ShippingMethodResponseDTO>;
  calculate(input: CalculateShippingRequestDTO): Promise<{ rate: number; currency: string }>;
}

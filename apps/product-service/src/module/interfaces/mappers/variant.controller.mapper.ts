import { Injectable } from '@nestjs/common';
import type { VariantResponseDTO } from '../../application/dtos/responses/variant-response.dto';
import type { VariantHttpResponseDto } from '../dtos/responses/variant.response.dto';

@Injectable()
export class VariantControllerMapper {
  toHttp(dto: VariantResponseDTO): VariantHttpResponseDto {
    return {
      id: dto.id,
      productId: '',
      name: dto.name,
      sku: dto.sku,
      price: dto.price,
      isDefault: false,
    } as unknown as VariantHttpResponseDto;
  }
}

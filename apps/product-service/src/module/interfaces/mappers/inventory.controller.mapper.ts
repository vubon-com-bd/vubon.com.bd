import { Injectable } from '@nestjs/common';
import type { InventoryResponseDTO } from '../../application/dtos/responses/inventory-response.dto';
import type { InventoryHttpResponseDto } from '../dtos/responses/inventory.response.dto';

@Injectable()
export class InventoryControllerMapper {
  toHttp(dto: InventoryResponseDTO): InventoryHttpResponseDto {
    return {
      productId: dto.productId,
      quantity: dto.quantity,
      reserved: dto.reserved,
      available: dto.available,
      status: dto.status,
    } as unknown as InventoryHttpResponseDto;
  }
}

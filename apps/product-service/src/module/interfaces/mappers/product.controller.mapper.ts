import { Injectable } from '@nestjs/common';
import type { ProductResponseDTO } from '../../application/dtos/responses/product-response.dto';
import type { ProductHttpResponseDto } from '../dtos/responses/product.response.dto';

@Injectable()
export class ProductControllerMapper {
  toHttp(dto: ProductResponseDTO): ProductHttpResponseDto {
    const p = dto.product;
    return {
      id: p.id,
      name: p.name,
      slug: p.slug,
      sku: p.sku,
      status: p.status,
      type: p.type,
      vendorId: (p as unknown as { vendorId?: string }).vendorId ?? '',
      categoryId: (p as unknown as { categoryId?: string | null }).categoryId ?? null,
      brandId: (p as unknown as { brandId?: string | null }).brandId ?? null,
      createdAt: p.createdAt,
      updatedAt: p.updatedAt,
    } as unknown as ProductHttpResponseDto;
  }
}

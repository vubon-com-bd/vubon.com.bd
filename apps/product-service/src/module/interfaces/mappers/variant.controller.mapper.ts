/**
 * VariantControllerMapper
 */
import type { VariantResponseDTO as AppVariantDTO } from '../../application/dtos/responses/variant-response.dto.js';
import { VariantResponseDTO } from '../dtos/responses/variant.response.dto.js';

export class VariantControllerMapper {
  static toHttp(dto: AppVariantDTO): VariantResponseDTO {
    const out = new VariantResponseDTO();
    Object.assign(out, {
      id: String(dto.id),
      productId: String(dto.productId),
      name: dto.name,
      sku: dto.sku,
      barcode: dto.barcode,
      options: dto.options,
      price: Number(dto.price),
      compareAtPrice: dto.compareAtPrice !== undefined ? Number(dto.compareAtPrice) : undefined,
      cost: dto.cost !== undefined ? Number(dto.cost) : undefined,
      weight: dto.weight,
      imageUrl: dto.imageUrl ? String(dto.imageUrl) : undefined,
      status: dto.status,
      stock: dto.stock,
      createdAt: dto.createdAt,
      updatedAt: dto.updatedAt,
    });
    return out;
  }

  static toHttpList(dtos: readonly AppVariantDTO[]): readonly VariantResponseDTO[] {
    return dtos.map((d) => VariantControllerMapper.toHttp(d));
  }
}

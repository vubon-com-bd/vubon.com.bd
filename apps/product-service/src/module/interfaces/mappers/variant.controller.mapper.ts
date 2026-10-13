/**
 * VariantControllerMapper — HTTP DTO ↔ App DTO
 * @module product-service/interfaces/mappers
 */
import type {
  AddVariantHttpDTO,
  UpdateVariantHttpDTO,
  ListVariantsHttpQueryDTO,
} from '../dtos/requests/variant.request.dto.js';

import type {
  AddVariantCommandDTO,
  UpdateVariantRequestDTO,
} from '../../application/dtos/requests/variant/index.js';

import type {
  VariantListOptionsDTO,
  VariantListFilterDTO,
} from '../../application/services/interfaces/product-variant.service.interface.js';

import type {
  VariantResponseDTO,
  VariantPublicResponseDTO,
  VariantSummaryResponseDTO,
  VariantListResponseDTO,
  VariantStatsResponseDTO,
} from '../../application/dtos/responses/variant-response.dto.js';

import {
  VariantHttpResponseDTO,
  VariantPublicHttpResponseDTO,
  VariantSummaryHttpResponseDTO,
  VariantListHttpResponseDTO,
  VariantStatsHttpResponseDTO,
} from '../dtos/responses/variant.response.dto.js';

export class VariantControllerMapper {
  static toAddAppDto(dto: AddVariantHttpDTO): AddVariantCommandDTO {
    return {
      productId: dto.productId,
      name: dto.name,
      sku: dto.sku,
      barcode: dto.barcode,
      type: dto.type as never,
      options: dto.options.map((o) => ({ name: o.name, value: o.value })),
      price: dto.price,
      compareAtPrice: dto.compareAtPrice,
      cost: dto.cost,
      weight: dto.weight,
    } as AddVariantCommandDTO;
  }

  static toUpdateAppDto(variantId: string, dto: UpdateVariantHttpDTO): UpdateVariantRequestDTO {
    return {
      variantId,
      name: dto.name,
      sku: dto.sku,
      barcode: dto.barcode,
      options: dto.options?.map((o) => ({ name: o.name, value: o.value })),
      price: dto.price,
      compareAtPrice: dto.compareAtPrice,
      cost: dto.cost,
      weight: dto.weight,
      imageUrl: dto.imageUrl,
      isActive: dto.isActive,
    };
  }

  static toListOptions(q: ListVariantsHttpQueryDTO): VariantListOptionsDTO {
    const filter: VariantListFilterDTO = {
      productId: q.productId,
      isActive: q.isActive,
      inStock: q.inStock,
      sku: q.sku,
    };
    return {
      page: q.page ?? 1,
      limit: q.limit ?? 20,
      filter,
    };
  }

  static toHttpResponse(app: VariantResponseDTO): VariantHttpResponseDTO {
    return app as unknown as VariantHttpResponseDTO;
  }

  static toPublicHttpResponse(app: VariantPublicResponseDTO): VariantPublicHttpResponseDTO {
    return app as unknown as VariantPublicHttpResponseDTO;
  }

  static toSummaryHttp(app: VariantSummaryResponseDTO): VariantSummaryHttpResponseDTO {
    return app as unknown as VariantSummaryHttpResponseDTO;
  }

  static toListHttp(app: VariantListResponseDTO): VariantListHttpResponseDTO {
    return {
      items: app.items.map((i) => this.toSummaryHttp(i)),
      total: app.total,
      page: app.page,
      limit: app.limit,
      totalPages: app.totalPages,
    };
  }

  static toStatsHttp(app: VariantStatsResponseDTO): VariantStatsHttpResponseDTO {
    return app as unknown as VariantStatsHttpResponseDTO;
  }
}

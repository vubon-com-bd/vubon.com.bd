/**
 * InventoryControllerMapper — HTTP DTO ↔ App DTO
 * @module product-service/interfaces/mappers
 */
import type {
  UpdateInventoryHttpDTO,
  AdjustInventoryHttpDTO,
} from '../dtos/requests/inventory.request.dto.js';

import type {
  UpdateInventoryCommandDTO,
  AdjustInventoryRequestDTO,
} from '../../application/dtos/requests/inventory/index.js';

import type {
  InventoryResponseDTO,
  InventoryPublicResponseDTO,
  InventorySummaryResponseDTO,
  InventoryListResponseDTO,
  InventoryStatsResponseDTO,
  StockCheckResponseDTO,
} from '../../application/dtos/responses/inventory-response.dto.js';

import {
  InventoryHttpResponseDTO,
  InventoryPublicHttpResponseDTO,
  InventorySummaryHttpResponseDTO,
  InventoryListHttpResponseDTO,
  InventoryStatsHttpResponseDTO,
  StockCheckHttpResponseDTO,
} from '../dtos/responses/inventory.response.dto.js';

export class InventoryControllerMapper {
  static toUpdateAppDto(inventoryId: string, dto: UpdateInventoryHttpDTO): UpdateInventoryCommandDTO {
    return {
      inventoryId,
      delta: dto.delta,
      reason: dto.reason,
      reference: dto.reference,
    };
  }

  static toAdjustAppDto(inventoryId: string, dto: AdjustInventoryHttpDTO): AdjustInventoryRequestDTO {
    return {
      inventoryId,
      delta: dto.delta,
      reason: dto.reason,
      reference: dto.reference,
      actorRole: dto.actorRole as never,
    };
  }

  static toHttpResponse(app: InventoryResponseDTO): InventoryHttpResponseDTO {
    return app as unknown as InventoryHttpResponseDTO;
  }

  static toPublicHttpResponse(app: InventoryPublicResponseDTO): InventoryPublicHttpResponseDTO {
    return app as unknown as InventoryPublicHttpResponseDTO;
  }

  static toSummaryHttp(app: InventorySummaryResponseDTO): InventorySummaryHttpResponseDTO {
    return app as unknown as InventorySummaryHttpResponseDTO;
  }

  static toListHttp(app: InventoryListResponseDTO): InventoryListHttpResponseDTO {
    return {
      items: app.items.map((i) => this.toSummaryHttp(i)),
      total: app.total,
      page: app.page,
      limit: app.limit,
      totalPages: app.totalPages,
    };
  }

  static toStatsHttp(app: InventoryStatsResponseDTO): InventoryStatsHttpResponseDTO {
    return app as unknown as InventoryStatsHttpResponseDTO;
  }

  static toStockCheckHttp(app: StockCheckResponseDTO): StockCheckHttpResponseDTO {
    return app as unknown as StockCheckHttpResponseDTO;
  }
}

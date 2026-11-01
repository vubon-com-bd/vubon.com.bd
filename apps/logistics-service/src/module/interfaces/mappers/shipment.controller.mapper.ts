/**
 * ShipmentControllerMapper — HTTP DTO ↔ App DTO
 * @module logistics-service/interfaces/mappers
 *
 * Pure static functions. Bidirectional. NO side effects.
 */
import type {
  CreateShipmentHttpDTO,
  UpdateShipmentHttpDTO,
  CancelShipmentHttpDTO,
  ConfirmShipmentHttpDTO,
  PickUpShipmentHttpDTO,
  StartTransitShipmentHttpDTO,
  DeliverShipmentHttpDTO,
  FailShipmentHttpDTO,
  ListShipmentsHttpQueryDTO,
} from '../dtos/requests/shipment/shipment.request.dto.js';
import type { CreateShipmentRequestDTO } from '@application/dtos/requests/shipment/create-shipment.dto.js';
import type {
  ShipmentResponseDTO,
  ShipmentPublicResponseDTO,
  ShipmentSummaryResponseDTO,
  ShipmentListResponseDTO,
  ShipmentStatsResponseDTO,
} from '@application/dtos/responses/shipment/index.js';
import type {
  ShipmentHttpResponseDTO,
  ShipmentPublicHttpResponseDTO,
  ShipmentSummaryHttpResponseDTO,
  ShipmentListHttpResponseDTO,
  ShipmentStatsHttpResponseDTO,
} from '../dtos/responses/shipment/shipment.response.dto.js';

export class ShipmentControllerMapper {
  // ═══ HTTP → App ═══
  static toCreateAppDto(http: CreateShipmentHttpDTO): CreateShipmentRequestDTO {
    return {
      orderId: http.orderId,
      userId: http.userId,
      vendorId: http.vendorId,
      warehouseId: http.warehouseId,
      courierId: http.courierId,
      type: http.type as CreateShipmentRequestDTO['type'],
      priority: http.priority as CreateShipmentRequestDTO['priority'],
      shippingAddress: http.shippingAddress,
      pickupAddress: http.pickupAddress,
      items: http.items.map((i) => ({
        sku: i.sku,
        name: i.name,
        quantity: i.quantity,
        unitPrice: i.unitPrice,
        currency: i.currency,
        weightKg: i.weightKg,
        productId: i.productId,
        variantId: i.variantId,
        imageUrl: i.imageUrl,
        notes: i.notes,
      })),
      totalWeightKg: http.totalWeightKg,
      totalVolumeM3: http.totalVolumeM3,
      declaredValue: http.declaredValue,
      currency: http.currency,
      shippingCost: http.shippingCost,
      codAmount: http.codAmount,
      isCOD: http.isCOD,
      isInsured: http.isInsured,
      estimatedDeliveryAt: http.estimatedDeliveryAt,
      notes: http.notes,
      metadata: http.metadata,
    };
  }

  static toUpdateAppDto(shipmentId: string, http: UpdateShipmentHttpDTO): Record<string, unknown> {
    return { shipmentId, ...http };
  }

  static toCancelAppDto(shipmentId: string, http: CancelShipmentHttpDTO): Record<string, unknown> {
    return { shipmentId, reason: http.reason };
  }

  static toConfirmAppDto(shipmentId: string, http: ConfirmShipmentHttpDTO): Record<string, unknown> {
    return { shipmentId, notes: http.notes };
  }

  static toPickUpAppDto(shipmentId: string, http: PickUpShipmentHttpDTO): Record<string, unknown> {
    return { shipmentId, courierId: http.courierId, driverId: http.driverId };
  }

  static toStartTransitAppDto(shipmentId: string, http: StartTransitShipmentHttpDTO): Record<string, unknown> {
    return { shipmentId, notes: http.notes };
  }

  static toDeliverAppDto(shipmentId: string, http: DeliverShipmentHttpDTO): Record<string, unknown> {
    return {
      shipmentId,
      recipientName: http.recipientName,
      signedBy: http.signedBy,
      driverId: http.driverId,
    };
  }

  static toFailAppDto(shipmentId: string, http: FailShipmentHttpDTO): Record<string, unknown> {
    return {
      shipmentId,
      reason: http.reason,
      attemptedCount: http.attemptedCount,
    };
  }

  static toListOptions(http: ListShipmentsHttpQueryDTO): Record<string, unknown> {
    return {
      page: http.page ?? 1,
      limit: http.limit ?? 20,
      sortBy: http.sortBy ?? 'createdAt',
      sortDir: http.sortDir ?? 'desc',
      filter: {
        status: http.status,
        type: http.type,
        priority: http.priority,
        orderId: http.orderId,
        courierId: http.courierId,
        warehouseId: http.warehouseId,
        fromDate: http.fromDate,
        toDate: http.toDate,
        search: http.search,
      },
    };
  }

  // ═══ App → HTTP ═══
  static toHttpResponse(app: ShipmentResponseDTO): ShipmentHttpResponseDTO {
    return app as unknown as ShipmentHttpResponseDTO;
  }

  static toPublicHttpResponse(app: ShipmentPublicResponseDTO): ShipmentPublicHttpResponseDTO {
    return app as unknown as ShipmentPublicHttpResponseDTO;
  }

  static toSummaryHttp(app: ShipmentSummaryResponseDTO): ShipmentSummaryHttpResponseDTO {
    return app as unknown as ShipmentSummaryHttpResponseDTO;
  }

  static toListHttp(app: ShipmentListResponseDTO): ShipmentListHttpResponseDTO {
    return {
      items: app.items.map((i) => this.toSummaryHttp(i)),
      total: app.total,
      page: app.page,
      limit: app.limit,
      totalPages: app.totalPages,
    };
  }

  static toStatsHttp(app: ShipmentStatsResponseDTO): ShipmentStatsHttpResponseDTO {
    return app as unknown as ShipmentStatsHttpResponseDTO;
  }
}

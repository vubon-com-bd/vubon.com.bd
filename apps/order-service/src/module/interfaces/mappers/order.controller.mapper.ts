/**
 * OrderControllerMapper — HTTP DTO ↔ App DTO
 * @module order-service/interfaces/mappers
 */
import type { Address } from '@vubon/shared-types/common';
import type {
  CreateOrderHttpDTO,
  UpdateOrderHttpDTO,
  ConfirmOrderHttpDTO,
  HoldOrderHttpDTO,
  ReleaseOrderHttpDTO,
  DeleteOrderHttpDTO,
  ListOrdersHttpQueryDTO,
} from '../dtos/requests/order.request.dto.js';
import type {
  CreateOrderCommandDTO,
  UpdateOrderCommandDTO,
} from '../../application/dtos/requests/order/index.js';
import type { OrderListOptionsDTO } from '../../application/services/interfaces/order.service.interface.js';
import type {
  OrderResponseDTO,
  OrderPublicResponseDTO,
  OrderSummaryResponseDTO,
  OrderListResponseDTO,
  OrderStatsResponseDTO,
  OrderDetailResponseDTO,
} from '../../application/dtos/responses/order-response.dto.js';
import type { OrderHttpResponseDTO, OrderCreateHttpResponseDTO } from '../dtos/responses/order.response.dto.js';
import type { OrderPublicHttpResponseDTO } from '../dtos/responses/order-public.response.dto.js';
import type {
  OrderSummaryHttpResponseDTO,
  OrderListHttpResponseDTO,
  OrderStatsHttpResponseDTO,
} from '../dtos/responses/order-list.response.dto.js';
import type { OrderDetailHttpResponseDTO } from '../dtos/responses/order-detail.response.dto.js';

export class OrderControllerMapper {
  static toCreateAppDto(dto: CreateOrderHttpDTO, actorId?: string): CreateOrderCommandDTO {
    return {
      customerId: dto.customerId,
      cartId: dto.cartId,
      items: dto.items.map((i) => ({
        productId: i.productId,
        variantId: i.variantId,
        vendorId: i.vendorId,
        quantity: i.quantity,
        unitPrice: i.unitPrice,
      })),
      shippingAddress: dto.shippingAddress as unknown as Address,
      billingAddress: dto.billingAddress as unknown as Address | undefined,
      shippingMethod: dto.shippingMethod,
      paymentMethod: dto.paymentMethod,
      currency: dto.currency,
      customerNotes: dto.customerNotes,
      notes: dto.notes,
      idempotencyKey: dto.idempotencyKey,
      actorId,
    };
  }

  static toUpdateAppDto(orderId: string, dto: UpdateOrderHttpDTO, actorId?: string): UpdateOrderCommandDTO {
    return {
      orderId,
      status: dto.status,
      notes: dto.notes,
      customerNotes: dto.customerNotes,
      shippingMethod: dto.shippingMethod,
      trackingNumber: dto.trackingNumber,
      actorId,
    } as UpdateOrderCommandDTO;
  }

  static toConfirmDto(dto: ConfirmOrderHttpDTO): { paymentId?: string; notes?: string } {
    return { paymentId: dto.paymentId, notes: dto.notes };
  }

  static toHoldDto(dto: HoldOrderHttpDTO): { reason: string; holdUntil?: string } {
    return { reason: dto.reason, holdUntil: dto.holdUntil };
  }

  static toReleaseDto(dto: ReleaseOrderHttpDTO): { note?: string } {
    return { note: dto.note };
  }

  static toDeleteDto(dto: DeleteOrderHttpDTO): { reason?: string } {
    return { reason: dto.reason };
  }

  static toListOptions(q: ListOrdersHttpQueryDTO): OrderListOptionsDTO {
    return {
      page: q.page ?? 1,
      limit: q.limit ?? 20,
      filter: {
        customerId: q.customerId,
        vendorId: q.vendorId,
        status: q.status,
        fromDate: q.fromDate,
        toDate: q.toDate,
      },
    };
  }

  static toHttpResponse(app: OrderResponseDTO): OrderHttpResponseDTO {
    return app as unknown as OrderHttpResponseDTO;
  }

  static toCreateHttpResponse(app: { orderId: string; orderNumber: string; status: string }): OrderCreateHttpResponseDTO {
    return { success: true, orderId: app.orderId, orderNumber: app.orderNumber, status: app.status };
  }

  static toPublicHttpResponse(app: OrderPublicResponseDTO): OrderPublicHttpResponseDTO {
    return app as unknown as OrderPublicHttpResponseDTO;
  }

  static toSummaryHttp(app: OrderSummaryResponseDTO): OrderSummaryHttpResponseDTO {
    return app as unknown as OrderSummaryHttpResponseDTO;
  }

  static toListHttp(app: OrderListResponseDTO): OrderListHttpResponseDTO {
    return {
      items: app.items.map((i) => this.toSummaryHttp(i)),
      total: app.total,
      page: app.page,
      limit: app.limit,
      totalPages: app.totalPages,
    };
  }

  static toStatsHttp(app: OrderStatsResponseDTO): OrderStatsHttpResponseDTO {
    return app as unknown as OrderStatsHttpResponseDTO;
  }

  static toDetailHttp(app: OrderDetailResponseDTO): OrderDetailHttpResponseDTO {
    return {
      order: this.toHttpResponse(app.order),
      items: app.items.map((i) => ({
        id: i.id,
        productId: i.productId,
        name: i.name,
        sku: '',
        quantity: i.quantity,
        unitPrice: i.unitPrice,
        total: i.lineTotal,
        status: i.status,
      })),
    };
  }
}

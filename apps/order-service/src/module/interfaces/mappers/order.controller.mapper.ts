/**
 * OrderControllerMapper — HTTP DTO ↔ Application DTO
 * @module order-service/interfaces/mappers
 *
 * Pattern: pure static transforms (no logic, no side effects).
 */
import { CreateOrderCommand } from '../../application/commands/order/create-order.command.js';
import type { CreateOrderHttpDTO } from '../dtos/requests/order.request.dto.js';
import type { OrderResponseDTO } from '../../application/dtos/responses/order-response.dto.js';
import type { OrderHttpResponseDTO } from '../dtos/responses/order.response.dto.js';

export class OrderControllerMapper {
  static toCommand(
    dto: CreateOrderHttpDTO,
    actorId?: string,
  ): CreateOrderCommand {
    return new CreateOrderCommand(
      {
        customerId: dto.customerId,
        cartId: dto.cartId,
        items: dto.items.map((i) => ({
          productId: i.productId,
          variantId: i.variantId,
          vendorId: i.vendorId,
          quantity: i.quantity,
          unitPrice: i.unitPrice,
          discountAmount: i.discountAmount,
          notes: i.notes,
        })),
        // schema expects Address — pass through
        shippingAddress: dto.shippingAddress as never,
        billingAddress: dto.billingAddress as never,
        shippingMethod: dto.shippingMethod,
        paymentMethod: dto.paymentMethod,
        currency: dto.currency,
        customerNotes: dto.customerNotes,
        notes: dto.notes,
        idempotencyKey: dto.idempotencyKey,
      },
      actorId,
    );
  }

  static toResponse(appDto: OrderResponseDTO): OrderHttpResponseDTO {
    return appDto as unknown as OrderHttpResponseDTO;
  }
}

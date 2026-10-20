/**
 * CheckoutControllerMapper — HTTP DTO ↔ App DTO
 * @module order-service/interfaces/mappers
 */
import { BadRequestException } from '@nestjs/common';
import type {
  StartCheckoutHttpDTO,
  SelectAddressHttpDTO,
  SelectShippingHttpDTO,
  SelectPaymentHttpDTO,
  ConfirmCheckoutHttpDTO,
  AbandonCheckoutHttpDTO,
} from '../dtos/requests/checkout.request.dto.js';
import type {
  StartCheckoutCommandDTO,
  SelectAddressCommandDTO,
  SelectShippingCommandDTO,
  SelectPaymentCommandDTO,
  ConfirmCheckoutCommandDTO,
  AbandonCheckoutCommandDTO,
} from '../../application/dtos/requests/checkout/index.js';
import type {
  CheckoutResponseDTO,
  CheckoutPublicResponseDTO,
  CheckoutSessionResponseDTO,
  CheckoutConfirmResponseDTO,
} from '../../application/dtos/responses/checkout-response.dto.js';
import type {
  CheckoutHttpResponseDTO,
  CheckoutPublicHttpResponseDTO,
  CheckoutSessionHttpResponseDTO,
  CheckoutConfirmHttpResponseDTO,
} from '../dtos/responses/checkout.response.dto.js';

export class CheckoutControllerMapper {
  static toStartAppDto(
    dto: StartCheckoutHttpDTO,
    actorId?: string,
  ): StartCheckoutCommandDTO {
    const type = dto.type ?? 'registered';
    return {
      cartId: dto.cartId,
      type,
      email: dto.email,
      ...(dto.phone !== undefined ? { phone: dto.phone } : {}),
      ...(actorId !== undefined ? { actorId } : {}),
    } as StartCheckoutCommandDTO;
  }

  static toSelectAddressDto(
    checkoutId: string,
    dto: SelectAddressHttpDTO,
  ): SelectAddressCommandDTO {
    if (!dto.shippingAddressId && !dto.shippingAddress) {
      throw new BadRequestException(
        'Either shippingAddressId or shippingAddress is required',
      );
    }
    return {
      checkoutId,
      ...(dto.shippingAddressId !== undefined
        ? { shippingAddressId: dto.shippingAddressId }
        : {}),
      ...(dto.shippingAddress !== undefined
        ? { shippingAddress: dto.shippingAddress }
        : {}),
      ...(dto.billingAddressId !== undefined
        ? { billingAddressId: dto.billingAddressId }
        : {}),
      ...(dto.billingAddress !== undefined
        ? { billingAddress: dto.billingAddress }
        : {}),
      useShippingAsBilling: !dto.billingAddressId && !dto.billingAddress,
    } as SelectAddressCommandDTO;
  }

  static toSelectShippingDto(
    checkoutId: string,
    dto: SelectShippingHttpDTO,
  ): SelectShippingCommandDTO {
    return {
      checkoutId,
      shippingMethodId: dto.shippingMethodId,
      ...(dto.notes !== undefined ? { notes: dto.notes } : {}),
    } as SelectShippingCommandDTO;
  }

  static toSelectPaymentDto(
    checkoutId: string,
    dto: SelectPaymentHttpDTO,
  ): SelectPaymentCommandDTO {
    return {
      checkoutId,
      paymentMethod: dto.paymentMethod,
    };
  }

  static toConfirmDto(
    checkoutId: string,
    dto: ConfirmCheckoutHttpDTO,
    actorId?: string,
  ): ConfirmCheckoutCommandDTO {
    return {
      checkoutId,
      paymentMethod: dto.paymentMethod,
      ...(dto.paymentGateway !== undefined
        ? { paymentGateway: dto.paymentGateway }
        : {}),
      ...(dto.customerNotes !== undefined
        ? { customerNotes: dto.customerNotes }
        : {}),
      ...(dto.idempotencyKey !== undefined
        ? { idempotencyKey: dto.idempotencyKey }
        : {}),
      acceptTerms: true,
      ...(actorId !== undefined ? { actorId } : {}),
    } as ConfirmCheckoutCommandDTO;
  }

  static toAbandonDto(
    checkoutId: string,
    dto: AbandonCheckoutHttpDTO,
  ): AbandonCheckoutCommandDTO {
    return {
      checkoutId,
      ...(dto.reason !== undefined ? { reason: dto.reason } : {}),
    } as AbandonCheckoutCommandDTO;
  }

  static toHttpResponse(app: CheckoutResponseDTO): CheckoutHttpResponseDTO {
    return app as unknown as CheckoutHttpResponseDTO;
  }

  static toPublicHttpResponse(
    app: CheckoutPublicResponseDTO,
  ): CheckoutPublicHttpResponseDTO {
    return app as unknown as CheckoutPublicHttpResponseDTO;
  }

  static toSessionHttpResponse(
    app: CheckoutSessionResponseDTO,
  ): CheckoutSessionHttpResponseDTO {
    return app as unknown as CheckoutSessionHttpResponseDTO;
  }

  static toConfirmHttpResponse(
    app: CheckoutConfirmResponseDTO,
  ): CheckoutConfirmHttpResponseDTO {
    return app as unknown as CheckoutConfirmHttpResponseDTO;
  }
}

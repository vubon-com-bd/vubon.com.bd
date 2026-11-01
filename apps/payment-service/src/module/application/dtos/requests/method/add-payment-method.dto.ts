/**
 * AddPaymentMethodRequestDTO
 * @module payment-service/application/dtos/requests/method
 *
 * Adds a saved payment method (card token / wallet).
 * ⚠️ NEVER stores raw PAN/CVV — only gateway tokens.
 *
 * Types:
 *  - PaymentMethodValue, PaymentMethodTypeValue → shared-types
 *  - PaymentGatewayValue → shared-types (also aliased as PaymentGatewayType in constants)
 */
import type {
  PaymentMethodValue,
  PaymentMethodTypeValue,
  PaymentGatewayValue,
} from '@vubon/shared-types/business/payment';

export interface AddPaymentMethodRequestDTO {
  readonly method: PaymentMethodValue;
  readonly type: PaymentMethodTypeValue;
  readonly gateway?: PaymentGatewayValue;
  readonly cardToken?: string;
  readonly last4?: string;
  readonly brand?: string;
  readonly expiryMonth?: number;
  readonly expiryYear?: number;
  readonly holderName?: string;
  readonly walletAddress?: string;
  readonly walletNetwork?: string;
  readonly isDefault?: boolean;
}

export interface AddPaymentMethodContextDTO {
  readonly request: AddPaymentMethodRequestDTO;
  readonly userId: string;
}

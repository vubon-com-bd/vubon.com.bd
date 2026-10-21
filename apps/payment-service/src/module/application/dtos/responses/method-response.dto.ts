/**
 * Payment Method Response DTOs
 * @module payment-service/application/dtos/responses
 */
import type {
  PaymentMethodValue,
  PaymentMethodTypeValue,
  PaymentGatewayValue,
} from '@vubon/shared-types/business/payment';

export interface MethodResponseDTO {
  readonly id: string;
  readonly method: PaymentMethodValue;
  readonly type: PaymentMethodTypeValue;
  readonly gateway?: PaymentGatewayValue;
  readonly label: string;
  readonly last4?: string;
  readonly brand?: string;
  readonly expiryMonth?: number;
  readonly expiryYear?: number;
  readonly holderName?: string;
  readonly walletAddress?: string;
  readonly isActive: boolean;
  readonly isDefault: boolean;
  readonly createdAt: string;
  readonly updatedAt: string;
}

export interface MethodSummaryResponseDTO {
  readonly id: string;
  readonly method: PaymentMethodValue;
  readonly type: PaymentMethodTypeValue;
  readonly label: string;
  readonly isActive: boolean;
  readonly isDefault: boolean;
}

export interface MethodListResponseDTO {
  readonly items: readonly MethodSummaryResponseDTO[];
  readonly total: number;
  readonly page: number;
  readonly limit: number;
  readonly totalPages: number;
}

/**
 * Split Payment Response DTOs
 * @module payment-service/application/dtos/responses
 */
import type { SplitTypeValue } from '@domain/primitives/split-type.vo';

export interface SplitReceiverResponseDTO {
  readonly receiverId: string;
  readonly amount: number;
  readonly percentage?: number;
}

export interface SplitResponseDTO {
  readonly id: string;
  readonly paymentId: string;
  readonly type: SplitTypeValue;
  readonly totalAmount: number;
  readonly currency: string;
  readonly receivers: readonly SplitReceiverResponseDTO[];
  readonly isExecuted: boolean;
  readonly executedAt?: string;
  readonly failureReason?: string;
  readonly createdAt: string;
  readonly updatedAt: string;
}

export interface SplitListResponseDTO {
  readonly items: readonly SplitResponseDTO[];
  readonly total: number;
  readonly page: number;
  readonly limit: number;
  readonly totalPages: number;
}

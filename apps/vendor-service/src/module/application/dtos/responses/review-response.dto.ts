/**
 * Review Response DTOs
 * @module vendor-service/application/dtos/responses
 */
export interface ReviewResponseDTO {
  readonly id: string;
  readonly vendorId: string;
  readonly userId: string;
  readonly orderId?: string;
  readonly productId?: string;
  readonly rating: number;
  readonly content: string;
  readonly title?: string;
  readonly status: string;
  readonly isVerifiedPurchase: boolean;
  readonly helpfulCount: number;
  readonly flaggedCount: number;
  readonly vendorReply?: string;
  readonly vendorRepliedAt?: string;
  readonly submittedAt: string;
  readonly moderatedAt?: string;
  readonly moderatedBy?: string;
  readonly createdAt: string;
  readonly updatedAt: string;
}

export interface ReviewPublicResponseDTO {
  readonly id: string;
  readonly rating: number;
  readonly content: string;
  readonly title?: string;
  readonly isVerifiedPurchase: boolean;
  readonly helpfulCount: number;
  readonly vendorReply?: string;
  readonly submittedAt: string;
}

export interface ReviewSummaryResponseDTO {
  readonly id: string;
  readonly rating: number;
  readonly title?: string;
  readonly status: string;
  readonly submittedAt: string;
}

export interface ReviewListResponseDTO {
  readonly items: readonly ReviewSummaryResponseDTO[];
  readonly total: number;
  readonly page: number;
  readonly limit: number;
  readonly totalPages: number;
}

export interface ReviewStatsResponseDTO {
  readonly total: number;
  readonly averageRating: number;
  readonly positiveCount: number;
  readonly negativeCount: number;
  readonly verifiedPurchaseCount: number;
  readonly withRepliesCount: number;
  readonly byStatus: Readonly<Record<string, number>>;
  readonly byRating: Readonly<Record<1 | 2 | 3 | 4 | 5, number>>;
}

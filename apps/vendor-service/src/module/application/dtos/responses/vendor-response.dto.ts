/**
 * Vendor Response DTOs
 * @module vendor-service/application/dtos/responses
 *
 * Multi-shape output:
 *  - Full: admin (all fields)
 *  - Public: customer-safe (no PII)
 *  - Summary: list views
 *  - List: paginated
 *  - Detail: with children
 *  - Stats: aggregated
 *  - Initiate: for POST create actions
 */
import type {
  VendorStatusValue,
  VendorTypeValue,
  VendorBusinessTypeValue,
  VendorTierValue,
} from '@vubon/shared-types/business/vendor';

// ─── Full (admin) ─────────────────────────
export interface VendorResponseDTO {
  readonly id: string;
  readonly userId: string;
  readonly name: string;
  readonly slug: string;
  readonly displayName: string;
  readonly description?: string;
  readonly type: VendorTypeValue;
  readonly businessType: VendorBusinessTypeValue;
  readonly status: VendorStatusValue;
  readonly tier: VendorTierValue;
  readonly email: string;
  readonly phone?: string;
  readonly website?: string;
  readonly logoUrl?: string;
  readonly bannerUrl?: string;
  readonly rating: number;
  readonly totalSales: number;
  readonly totalOrders: number;
  readonly isVerified: boolean;
  readonly isFeatured: boolean;
  readonly rejectionReason?: string;
  readonly suspensionId?: string;
  readonly joinedAt: string;
  readonly approvedAt?: string;
  readonly createdAt: string;
  readonly updatedAt: string;
}

// ─── Public (customer-safe — NO PII) ──────
export interface VendorPublicResponseDTO {
  readonly id: string;
  readonly name: string;
  readonly slug: string;
  readonly displayName: string;
  readonly description?: string;
  readonly type: VendorTypeValue;
  readonly tier: VendorTierValue;
  readonly logoUrl?: string;
  readonly bannerUrl?: string;
  readonly rating: number;
  readonly totalSales: number;
  readonly isVerified: boolean;
  readonly isFeatured: boolean;
  readonly joinedAt: string;
}

// ─── Summary (list views) ─────────────────
export interface VendorSummaryResponseDTO {
  readonly id: string;
  readonly name: string;
  readonly displayName: string;
  readonly slug: string;
  readonly logoUrl?: string;
  readonly status: VendorStatusValue;
  readonly tier: VendorTierValue;
  readonly rating: number;
  readonly isVerified: boolean;
  readonly isFeatured: boolean;
  readonly createdAt: string;
}

// ─── List (paginated) ─────────────────────
export interface VendorListResponseDTO {
  readonly items: readonly VendorSummaryResponseDTO[];
  readonly total: number;
  readonly page: number;
  readonly limit: number;
  readonly totalPages: number;
  readonly hasNext: boolean;
  readonly hasPrev: boolean;
}

// ─── Stats (aggregated) ───────────────────
export interface VendorStatsResponseDTO {
  readonly total: number;
  readonly activeCount: number;
  readonly pendingCount: number;
  readonly suspendedCount: number;
  readonly verifiedCount: number;
  readonly featuredCount: number;
  readonly totalSales: number;
  readonly byStatus: Readonly<Record<string, number>>;
  readonly byType: Readonly<Record<string, number>>;
  readonly byTier: Readonly<Record<string, number>>;
}

// ─── Initiate (for POST create actions) ───
export interface VendorInitiateResponseDTO {
  readonly success: true;
  readonly vendorId: string;
  readonly status: VendorStatusValue;
  readonly slug: string;
}

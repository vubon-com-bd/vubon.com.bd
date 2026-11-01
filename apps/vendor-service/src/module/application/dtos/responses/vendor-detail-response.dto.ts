/**
 * Vendor Detail Response DTO
 * @module vendor-service/application/dtos/responses
 *
 * Detail view — with children (contacts, addresses, bank accounts, documents, team).
 */
import type { VendorResponseDTO } from './vendor-response.dto.js';

// ─── Child summaries ──────────────────────
export interface ContactSummaryDTO {
  readonly id: string;
  readonly type: string;
  readonly value: string;
  readonly label?: string;
  readonly isPrimary: boolean;
  readonly isVerified: boolean;
}

export interface AddressSummaryDTO {
  readonly id: string;
  readonly label: string;
  readonly addressType: string;
  readonly line1: string;
  readonly city: string;
  readonly district: string;
  readonly division: string;
  readonly country: string;
  readonly isPrimary: boolean;
  readonly isVerified: boolean;
}

export interface BankAccountSummaryDTO {
  readonly id: string;
  readonly bankName: string;
  readonly maskedAccountNumber: string;
  readonly accountHolderName: string;
  readonly currency: string;
  readonly isDefault: boolean;
  readonly isVerified: boolean;
}

export interface DocumentSummaryDTO {
  readonly id: string;
  readonly type: string;
  readonly status: string;
  readonly fileName: string;
  readonly uploadedAt: string;
  readonly expiresAt?: string;
}

export interface TeamMemberSummaryDTO {
  readonly id: string;
  readonly fullName: string;
  readonly email: string;
  readonly role: string;
  readonly status: string;
  readonly isVerified: boolean;
}

export interface BusinessInfoSummaryDTO {
  readonly legalName: string;
  readonly businessType: string;
  readonly vendorType: string;
  readonly registrationNumber?: string;
  readonly taxId?: string;
  readonly establishedYear?: number;
  readonly employeeCount?: number;
  readonly annualRevenue?: number;
}

// ─── Full Detail ──────────────────────────
export interface VendorDetailResponseDTO {
  readonly vendor: VendorResponseDTO;
  readonly business?: BusinessInfoSummaryDTO;
  readonly contacts: readonly ContactSummaryDTO[];
  readonly addresses: readonly AddressSummaryDTO[];
  readonly bankAccounts: readonly BankAccountSummaryDTO[];
  readonly documents: readonly DocumentSummaryDTO[];
  readonly team: readonly TeamMemberSummaryDTO[];
  readonly reviewSummary?: {
    readonly averageRating: number;
    readonly totalReviews: number;
    readonly recentReviews: number;
  };
}

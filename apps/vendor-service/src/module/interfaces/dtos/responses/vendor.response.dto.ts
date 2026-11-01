/**
 * Vendor HTTP Response DTOs
 * @module vendor-service/interfaces/dtos/responses
 *
 * Multi-shape:
 *  - Full (admin)
 *  - Public (customer-safe)
 *  - Summary (list item)
 *  - List (paginated)
 *  - Stats (aggregated)
 *  - Detail (with children)
 *  - Initiate (POST create)
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

// ─── Full (admin) ─────────────────────────
export class VendorHttpResponseDTO {
  @ApiProperty() readonly id!: string;
  @ApiProperty() readonly userId!: string;
  @ApiProperty() readonly name!: string;
  @ApiProperty() readonly slug!: string;
  @ApiProperty() readonly displayName!: string;
  @ApiPropertyOptional() readonly description?: string;
  @ApiProperty() readonly type!: string;
  @ApiProperty() readonly businessType!: string;
  @ApiProperty() readonly status!: string;
  @ApiProperty() readonly tier!: string;
  @ApiProperty() readonly email!: string;
  @ApiPropertyOptional() readonly phone?: string;
  @ApiPropertyOptional() readonly website?: string;
  @ApiPropertyOptional() readonly logoUrl?: string;
  @ApiPropertyOptional() readonly bannerUrl?: string;
  @ApiProperty() readonly rating!: number;
  @ApiProperty() readonly totalSales!: number;
  @ApiProperty() readonly totalOrders!: number;
  @ApiProperty() readonly isVerified!: boolean;
  @ApiProperty() readonly isFeatured!: boolean;
  @ApiPropertyOptional() readonly rejectionReason?: string;
  @ApiPropertyOptional() readonly suspensionId?: string;
  @ApiProperty() readonly joinedAt!: string;
  @ApiPropertyOptional() readonly approvedAt?: string;
  @ApiProperty() readonly createdAt!: string;
  @ApiProperty() readonly updatedAt!: string;
}

// ─── Public (customer-safe) ─────────────────
export class VendorPublicHttpResponseDTO {
  @ApiProperty() readonly id!: string;
  @ApiProperty() readonly name!: string;
  @ApiProperty() readonly slug!: string;
  @ApiProperty() readonly displayName!: string;
  @ApiPropertyOptional() readonly description?: string;
  @ApiProperty() readonly type!: string;
  @ApiProperty() readonly tier!: string;
  @ApiPropertyOptional() readonly logoUrl?: string;
  @ApiPropertyOptional() readonly bannerUrl?: string;
  @ApiProperty() readonly rating!: number;
  @ApiProperty() readonly totalSales!: number;
  @ApiProperty() readonly isVerified!: boolean;
  @ApiProperty() readonly isFeatured!: boolean;
  @ApiProperty() readonly joinedAt!: string;
}

// ─── Summary (list item) ────────────────────
export class VendorSummaryHttpResponseDTO {
  @ApiProperty() readonly id!: string;
  @ApiProperty() readonly name!: string;
  @ApiProperty() readonly displayName!: string;
  @ApiProperty() readonly slug!: string;
  @ApiPropertyOptional() readonly logoUrl?: string;
  @ApiProperty() readonly status!: string;
  @ApiProperty() readonly tier!: string;
  @ApiProperty() readonly rating!: number;
  @ApiProperty() readonly isVerified!: boolean;
  @ApiProperty() readonly isFeatured!: boolean;
  @ApiProperty() readonly createdAt!: string;
}

// ─── List (paginated) ───────────────────────
export class VendorListHttpResponseDTO {
  @ApiProperty({ type: [VendorSummaryHttpResponseDTO] })
  readonly items!: readonly VendorSummaryHttpResponseDTO[];
  @ApiProperty() readonly total!: number;
  @ApiProperty() readonly page!: number;
  @ApiProperty() readonly limit!: number;
  @ApiProperty() readonly totalPages!: number;
  @ApiProperty() readonly hasNext!: boolean;
  @ApiProperty() readonly hasPrev!: boolean;
}

// ─── Stats ─────────────────────────────────
export class VendorStatsHttpResponseDTO {
  @ApiProperty() readonly total!: number;
  @ApiProperty() readonly activeCount!: number;
  @ApiProperty() readonly pendingCount!: number;
  @ApiProperty() readonly suspendedCount!: number;
  @ApiProperty() readonly verifiedCount!: number;
  @ApiProperty() readonly featuredCount!: number;
  @ApiProperty() readonly totalSales!: number;
  @ApiProperty({ type: 'object', additionalProperties: { type: 'number' } })
  readonly byStatus!: Readonly<Record<string, number>>;
  @ApiProperty({ type: 'object', additionalProperties: { type: 'number' } })
  readonly byType!: Readonly<Record<string, number>>;
  @ApiProperty({ type: 'object', additionalProperties: { type: 'number' } })
  readonly byTier!: Readonly<Record<string, number>>;
}

// ─── Initiate (POST /vendors) ────────────────
export class VendorInitiateHttpResponseDTO {
  @ApiProperty() readonly success!: true;
  @ApiProperty() readonly vendorId!: string;
  @ApiProperty() readonly status!: string;
  @ApiProperty() readonly slug!: string;
}

// ─── Child summaries ────────────────────────
export class ContactSummaryHttpResponseDTO {
  @ApiProperty() readonly id!: string;
  @ApiProperty() readonly type!: string;
  @ApiProperty() readonly value!: string;
  @ApiPropertyOptional() readonly label?: string;
  @ApiProperty() readonly isPrimary!: boolean;
  @ApiProperty() readonly isVerified!: boolean;
}

export class AddressSummaryHttpResponseDTO {
  @ApiProperty() readonly id!: string;
  @ApiProperty() readonly label!: string;
  @ApiProperty() readonly addressType!: string;
  @ApiProperty() readonly line1!: string;
  @ApiProperty() readonly city!: string;
  @ApiProperty() readonly district!: string;
  @ApiProperty() readonly division!: string;
  @ApiProperty() readonly country!: string;
  @ApiProperty() readonly isPrimary!: boolean;
  @ApiProperty() readonly isVerified!: boolean;
}

export class BankAccountSummaryHttpResponseDTO {
  @ApiProperty() readonly id!: string;
  @ApiProperty() readonly bankName!: string;
  @ApiProperty() readonly maskedAccountNumber!: string;
  @ApiProperty() readonly accountHolderName!: string;
  @ApiProperty() readonly currency!: string;
  @ApiProperty() readonly isDefault!: boolean;
  @ApiProperty() readonly isVerified!: boolean;
}

export class DocumentSummaryHttpResponseDTO {
  @ApiProperty() readonly id!: string;
  @ApiProperty() readonly type!: string;
  @ApiProperty() readonly status!: string;
  @ApiProperty() readonly fileName!: string;
  @ApiProperty() readonly uploadedAt!: string;
  @ApiPropertyOptional() readonly expiresAt?: string;
}

export class VendorDetailTeamMemberSummaryHttpResponseDTO {
  @ApiProperty() readonly id!: string;
  @ApiProperty() readonly fullName!: string;
  @ApiProperty() readonly email!: string;
  @ApiProperty() readonly role!: string;
  @ApiProperty() readonly status!: string;
  @ApiProperty() readonly isVerified!: boolean;
}

// ─── Detail (with children) ─────────────────
export class VendorDetailHttpResponseDTO {
  @ApiProperty({ type: VendorHttpResponseDTO })
  readonly vendor!: VendorHttpResponseDTO;

  @ApiProperty({ type: [ContactSummaryHttpResponseDTO] })
  readonly contacts!: readonly ContactSummaryHttpResponseDTO[];

  @ApiProperty({ type: [AddressSummaryHttpResponseDTO] })
  readonly addresses!: readonly AddressSummaryHttpResponseDTO[];

  @ApiProperty({ type: [BankAccountSummaryHttpResponseDTO] })
  readonly bankAccounts!: readonly BankAccountSummaryHttpResponseDTO[];

  @ApiProperty({ type: [DocumentSummaryHttpResponseDTO] })
  readonly documents!: readonly DocumentSummaryHttpResponseDTO[];

  @ApiProperty({ type: [VendorDetailTeamMemberSummaryHttpResponseDTO] })
  readonly team!: readonly VendorDetailTeamMemberSummaryHttpResponseDTO[];
}

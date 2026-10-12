/**
 * VendorControllerMapper — HTTP DTO ↔ Application DTO
 * @module vendor-service/interfaces/mappers
 */
import type {
  RegisterVendorHttpDTO,
  UpdateVendorHttpDTO,
  UpdateVendorProfileHttpDTO,
  UpdateVendorBusinessHttpDTO,
  ActivateVendorHttpDTO,
  DeactivateVendorHttpDTO,
  SuspendVendorHttpDTO,
  ReinstateVendorHttpDTO,
  ApproveVendorHttpDTO,
  RejectVendorHttpDTO,
  AppealSuspensionHttpDTO,
  ListVendorsHttpQueryDTO,
  UploadVendorDocumentHttpDTO,
  SubmitVerificationHttpDTO,
  InviteTeamMemberHttpDTO,
  AcceptTeamInviteHttpDTO,
  ChangeTeamMemberRoleHttpDTO,
} from '../dtos/requests/vendor.http-dto.js';

import type { RegisterVendorRequestDto } from '../../application/dtos/requests/register-vendor.dto.js';
import type { UpdateVendorRequestDto } from '../../application/dtos/requests/update-vendor.dto.js';
import type { UpdateVendorProfileRequestDto } from '../../application/dtos/requests/update-profile.dto.js';
import type { UpdateVendorBusinessRequestDto } from '../../application/dtos/requests/update-business.dto.js';
import type { ActivateVendorRequestDto } from '../../application/dtos/requests/activate-vendor.dto.js';
import type { DeactivateVendorRequestDto } from '../../application/dtos/requests/deactivate-vendor.dto.js';
import type { SuspendVendorRequestDto } from '../../application/dtos/requests/suspend-vendor.dto.js';
import type { ReinstateVendorRequestDto } from '../../application/dtos/requests/reinstate-vendor.dto.js';
import type { ApproveVendorRequestDto } from '../../application/dtos/requests/approve-vendor.dto.js';
import type { RejectVendorRequestDto } from '../../application/dtos/requests/reject-vendor.dto.js';
import type { AppealSuspensionRequestDto } from '../../application/dtos/requests/appeal-suspension.dto.js';
import type { UploadVendorDocumentRequestDto } from '../../application/dtos/requests/upload-document.dto.js';
import type { SubmitVerificationRequestDto } from '../../application/dtos/requests/submit-verification.dto.js';
import type { InviteTeamMemberRequestDto } from '../../application/dtos/requests/invite-team-member.dto.js';
import type { AcceptTeamInviteRequestDto } from '../../application/dtos/requests/accept-team-invite.dto.js';
import type {
  VendorListOptionsDto,
} from '../../application/services/interfaces/vendor.service.interface.js';

export class VendorControllerMapper {
  // ─── Register ───
  static toRegisterAppDto(
    dto: RegisterVendorHttpDTO,
    ownerId: string,
  ): RegisterVendorRequestDto {
    return {
      ownerId,
      businessName: dto.businessName,
      displayName: dto.displayName,
      slug: dto.slug,
      vendorType: dto.vendorType,
      businessType: dto.businessType,
      businessRegistration: dto.businessRegistration,
      businessDescription: dto.businessDescription,
      contactEmail: dto.contactEmail,
      contactPhone: dto.contactPhone,
      addressLine1: dto.addressLine1,
      addressLine2: dto.addressLine2,
      division: dto.division,
      district: dto.district,
      upazila: dto.upazila,
      postalCode: dto.postalCode,
      acceptTerms: dto.acceptTerms,
      documents: dto.documents,
      idempotencyKey: dto.idempotencyKey,
    };
  }

  // ─── Update ───
  static toUpdateAppDto(vendorId: string, dto: UpdateVendorHttpDTO): UpdateVendorRequestDto {
    return {
      vendorId,
      name: dto.name,
      displayName: dto.displayName,
      description: dto.description,
      logoUrl: dto.logoUrl,
      bannerUrl: dto.bannerUrl,
      website: dto.website,
      idempotencyKey: dto.idempotencyKey,
    };
  }

  static toUpdateProfileAppDto(
    vendorId: string,
    dto: UpdateVendorProfileHttpDTO,
  ): UpdateVendorProfileRequestDto {
    return {
      vendorId,
      tagline: dto.tagline,
      about: dto.about,
      logoUrl: dto.logoUrl,
      bannerUrl: dto.bannerUrl,
      categories: dto.categories,
      languages: dto.languages,
      socialLinks: dto.socialLinks,
      idempotencyKey: dto.idempotencyKey,
    };
  }

  static toUpdateBusinessAppDto(
    vendorId: string,
    dto: UpdateVendorBusinessHttpDTO,
  ): UpdateVendorBusinessRequestDto {
    return {
      vendorId,
      type: dto.type,
      businessType: dto.businessType,
      legalName: dto.legalName,
      registrationNumber: dto.registrationNumber,
      description: dto.description,
      idempotencyKey: dto.idempotencyKey,
    };
  }

  // ─── Lifecycle ───
  static toActivateAppDto(vendorId: string, dto: ActivateVendorHttpDTO): ActivateVendorRequestDto {
    return {
      vendorId,
      activatedBy: dto.activatedBy,
      idempotencyKey: dto.idempotencyKey,
    };
  }

  static toDeactivateAppDto(vendorId: string, dto: DeactivateVendorHttpDTO): DeactivateVendorRequestDto {
    return {
      vendorId,
      reason: dto.reason,
      idempotencyKey: dto.idempotencyKey,
    };
  }

  static toSuspendAppDto(
    vendorId: string,
    dto: SuspendVendorHttpDTO,
    suspendedBy: string,
  ): SuspendVendorRequestDto {
    return {
      vendorId,
      reason: dto.reason,
      durationDays: dto.durationDays,
      suspendedBy,
      notes: dto.notes,
      idempotencyKey: dto.idempotencyKey,
    };
  }

  static toReinstateAppDto(vendorId: string, dto: ReinstateVendorHttpDTO, liftedBy: string): ReinstateVendorRequestDto {
    return {
      vendorId,
      liftedBy,
      notes: dto.notes,
      idempotencyKey: dto.idempotencyKey,
    };
  }

  // ─── Approval ───
  static toApproveAppDto(
    vendorId: string,
    dto: ApproveVendorHttpDTO,
    reviewedBy: string,
  ): ApproveVendorRequestDto {
    return {
      vendorId,
      reviewedBy,
      note: dto.note,
      idempotencyKey: dto.idempotencyKey,
    };
  }

  static toRejectAppDto(
    vendorId: string,
    dto: RejectVendorHttpDTO,
    reviewedBy: string,
  ): RejectVendorRequestDto {
    return {
      vendorId,
      reviewedBy,
      reason: dto.reason,
      note: dto.note,
      idempotencyKey: dto.idempotencyKey,
    };
  }

  static toAppealAppDto(vendorId: string, dto: AppealSuspensionHttpDTO): AppealSuspensionRequestDto {
    return {
      vendorId,
      suspensionId: dto.suspensionId,
      appealReason: dto.appealReason,
      evidenceUrls: dto.evidenceUrls,
      idempotencyKey: dto.idempotencyKey,
    };
  }

  // ─── List ───
  static toListOptions(q: ListVendorsHttpQueryDTO): VendorListOptionsDto {
    return {
      page: q.page ?? 1,
      limit: q.limit ?? 20,
      sortBy: q.sortBy,
      sortDir: q.sortDir,
      filter: {
        status: q.status,
        type: q.type,
        tier: q.tier,
        isVerified: q.isVerified,
        isFeatured: q.isFeatured,
        minRating: q.minRating,
        search: q.search,
      },
    };
  }

  // ─── Documents ───
  static toUploadDocumentAppDto(
    vendorId: string,
    dto: UploadVendorDocumentHttpDTO,
  ): UploadVendorDocumentRequestDto {
    return {
      vendorId,
      type: dto.type,
      fileUrl: dto.fileUrl,
      fileName: dto.fileName,
      mimeType: dto.mimeType,
      fileSize: dto.fileSize,
      documentNumber: dto.documentNumber,
      issuedAt: dto.issuedAt,
      expiresAt: dto.expiresAt,
      notes: dto.notes,
      idempotencyKey: dto.idempotencyKey,
    };
  }

  // ─── Verification ───
  static toSubmitVerificationAppDto(
    vendorId: string,
    dto: SubmitVerificationHttpDTO,
  ): SubmitVerificationRequestDto {
    return {
      vendorId,
      documents: dto.documents,
      idempotencyKey: dto.idempotencyKey,
    };
  }

  // ─── Team ───
  static toInviteTeamAppDto(
    vendorId: string,
    dto: InviteTeamMemberHttpDTO,
    invitedBy: string,
  ): InviteTeamMemberRequestDto {
    return {
      vendorId,
      email: dto.email,
      role: dto.role,
      message: dto.message,
      invitedBy,
      idempotencyKey: dto.idempotencyKey,
    };
  }

  static toAcceptTeamInviteAppDto(
    dto: AcceptTeamInviteHttpDTO,
    userId: string,
  ): AcceptTeamInviteRequestDto {
    return {
      token: dto.token,
      userId,
      name: dto.name,
      idempotencyKey: dto.idempotencyKey,
    };
  }

  static toRoleChangeArgs(dto: ChangeTeamMemberRoleHttpDTO): { newRole: string; idempotencyKey?: string } {
    return {
      newRole: dto.newRole,
      idempotencyKey: dto.idempotencyKey,
    };
  }

  // ─── Response wrapping ───
  static wrap<T>(data: T): { success: true; data: T; timestamp: string } {
    return {
      success: true,
      data,
      timestamp: new Date().toISOString(),
    };
  }
}

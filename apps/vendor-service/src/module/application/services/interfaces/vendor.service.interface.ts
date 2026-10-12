/**
 * IVendorService — vendor aggregate root contract
 * @module vendor-service/application/services/interfaces
 */
import type { RegisterVendorRequestDto } from '../../dtos/requests/register-vendor.dto.js';
import type { UpdateVendorRequestDto } from '../../dtos/requests/update-vendor.dto.js';
import type { UpdateVendorProfileRequestDto } from '../../dtos/requests/update-profile.dto.js';
import type { UpdateVendorBusinessRequestDto } from '../../dtos/requests/update-business.dto.js';
import type { ActivateVendorRequestDto } from '../../dtos/requests/activate-vendor.dto.js';
import type { DeactivateVendorRequestDto } from '../../dtos/requests/deactivate-vendor.dto.js';
import type { SuspendVendorRequestDto } from '../../dtos/requests/suspend-vendor.dto.js';
import type { ReinstateVendorRequestDto } from '../../dtos/requests/reinstate-vendor.dto.js';
import type { ApproveVendorRequestDto } from '../../dtos/requests/approve-vendor.dto.js';
import type { RejectVendorRequestDto } from '../../dtos/requests/reject-vendor.dto.js';
import type { DeleteVendorRequestDto } from '../../dtos/requests/delete-vendor.dto.js';
import type {
  VendorResponseDto,
  VendorPublicDto,
  VendorSummaryDto,
} from '../../dtos/responses/vendor-response.dto.js';
import type { VendorListResponseDto } from '../../dtos/responses/vendor-list-response.dto.js';
import type { VendorStatsResponseDto } from '../../dtos/responses/vendor-stats-response.dto.js';

export const VENDOR_SERVICE = Symbol('VENDOR_SERVICE');

export interface VendorListFilterDto {
  readonly status?: string;
  readonly type?: string;
  readonly tier?: string;
  readonly isVerified?: boolean;
  readonly isFeatured?: boolean;
  readonly minRating?: number;
  readonly search?: string;
}

export interface VendorListOptionsDto {
  readonly page: number;
  readonly limit: number;
  readonly sortBy?: 'createdAt' | 'updatedAt' | 'totalSales' | 'rating' | 'name';
  readonly sortDir?: 'asc' | 'desc';
  readonly filter?: VendorListFilterDto;
}

export interface IVendorService {
  register(dto: RegisterVendorRequestDto, actorId?: string): Promise<VendorResponseDto>;
  update(dto: UpdateVendorRequestDto, actorId?: string): Promise<VendorResponseDto>;
  updateProfile(dto: UpdateVendorProfileRequestDto, actorId?: string): Promise<VendorResponseDto>;
  updateBusiness(dto: UpdateVendorBusinessRequestDto, actorId?: string): Promise<VendorResponseDto>;

  activate(dto: ActivateVendorRequestDto, actorId?: string): Promise<VendorResponseDto>;
  deactivate(dto: DeactivateVendorRequestDto, actorId?: string): Promise<VendorResponseDto>;
  suspend(dto: SuspendVendorRequestDto, actorId?: string): Promise<VendorResponseDto>;
  reinstate(dto: ReinstateVendorRequestDto, actorId?: string): Promise<VendorResponseDto>;
  approve(dto: ApproveVendorRequestDto, actorId?: string): Promise<VendorResponseDto>;
  reject(dto: RejectVendorRequestDto, actorId?: string): Promise<VendorResponseDto>;
  softDelete(dto: DeleteVendorRequestDto, actorId?: string): Promise<void>;

  getById(vendorId: string): Promise<VendorResponseDto>;
  getPublic(vendorId: string): Promise<VendorPublicDto>;
  getBySlug(slug: string): Promise<VendorPublicDto>;
  getSummary(vendorId: string): Promise<VendorSummaryDto>;
  list(options: VendorListOptionsDto): Promise<VendorListResponseDto>;
  getStats(vendorId: string): Promise<VendorStatsResponseDto>;
}

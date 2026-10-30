/**
 * IVendorService — contract
 * @module vendor-service/application/services/interfaces
 *
 * Pattern:
 *  - Symbol-based DI token (interface is abstract)
 *  - Full method contract (command + query)
 *  - Filter/Options types for list endpoints
 */
import type {
  RegisterVendorCommandDTO,
  UpdateVendorCommandDTO,
  DeleteVendorRequestDTO,
  UpdateProfileRequestDTO,
  UpdateBusinessRequestDTO,
} from '../../dtos/requests/vendor/index.js';
import type {
  VendorResponseDTO,
  VendorPublicResponseDTO,
  VendorSummaryResponseDTO,
  VendorListResponseDTO,
  VendorStatsResponseDTO,
  VendorInitiateResponseDTO,
} from '../../dtos/responses/vendor-response.dto.js';
import type { VendorDetailResponseDTO } from '../../dtos/responses/vendor-detail-response.dto.js';

// ─── DI Token (Payment pattern) ───────────
export const VENDOR_SERVICE = Symbol('VENDOR_SERVICE');

// ─── Filter / Options ─────────────────────
export interface VendorListFilterDTO {
  readonly status?: string | readonly string[];
  readonly type?: string | readonly string[];
  readonly businessType?: string | readonly string[];
  readonly tier?: string | readonly string[];
  readonly isVerified?: boolean;
  readonly isFeatured?: boolean;
  readonly minRating?: number;
  readonly minSales?: number;
  readonly search?: string;
  readonly createdFrom?: string;
  readonly createdTo?: string;
}

export interface VendorListOptionsDTO {
  readonly page: number;
  readonly limit: number;
  readonly sortBy?: 'createdAt' | 'updatedAt' | 'name' | 'rating' | 'totalSales' | 'totalOrders';
  readonly sortDir?: 'asc' | 'desc';
  readonly filter?: VendorListFilterDTO;
  readonly includeDeleted?: boolean;
}

// ─── Main Interface ───────────────────────
export interface IVendorService {
  // ─── Commands ───
  register(dto: RegisterVendorCommandDTO, userId: string, actorId?: string): Promise<VendorInitiateResponseDTO>;
  update(dto: UpdateVendorCommandDTO, actorId?: string): Promise<VendorResponseDTO>;
  delete(dto: DeleteVendorRequestDTO): Promise<{ readonly success: true; readonly vendorId: string }>;
  updateProfile(dto: UpdateProfileRequestDTO, actorId?: string): Promise<VendorResponseDTO>;
  updateBusiness(dto: UpdateBusinessRequestDTO, actorId?: string): Promise<VendorResponseDTO>;
  approve(vendorId: string, actorId: string, notes?: string): Promise<VendorResponseDTO>;
  reject(vendorId: string, actorId: string, reason: string, notes?: string): Promise<VendorResponseDTO>;

  // ─── Queries ───
  getById(id: string): Promise<VendorResponseDTO>;
  getBySlug(slug: string): Promise<VendorResponseDTO>;
  getPublic(id: string): Promise<VendorPublicResponseDTO>;
  getDetail(id: string): Promise<VendorDetailResponseDTO>;
  getMyVendor(userId: string): Promise<VendorResponseDTO>;
  list(options: VendorListOptionsDTO): Promise<VendorListResponseDTO>;
  search(term: string, limit?: number): Promise<readonly VendorSummaryResponseDTO[]>;
  getFeatured(limit?: number): Promise<readonly VendorSummaryResponseDTO[]>;
  getTopRated(limit?: number): Promise<readonly VendorSummaryResponseDTO[]>;
  getStats(filter?: VendorListFilterDTO): Promise<VendorStatsResponseDTO>;
}

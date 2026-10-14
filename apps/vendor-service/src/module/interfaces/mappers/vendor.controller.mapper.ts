/**
 * VendorControllerMapper — HTTP ↔ Application DTO
 * @module vendor-service/interfaces/mappers
 */
import type {
  RegisterVendorHttpDTO,
  UpdateVendorHttpDTO,
  ListVendorsHttpQueryDTO,
  VendorStatsHttpQueryDTO,
} from '../dtos/requests/vendor.request.dto.js';
import type {
  RegisterVendorCommandDTO,
  UpdateVendorCommandDTO,
} from '../../application/dtos/requests/vendor/index.js';
import type {
  VendorListOptionsDTO,
  VendorListFilterDTO,
} from '../../application/services/interfaces/vendor.service.interface.js';
import type {
  VendorResponseDTO,
  VendorPublicResponseDTO,
  VendorSummaryResponseDTO,
  VendorListResponseDTO,
  VendorStatsResponseDTO,
} from '../../application/dtos/responses/vendor-response.dto.js';
import {
  VendorHttpResponseDTO,
  VendorPublicHttpResponseDTO,
  VendorSummaryHttpResponseDTO,
  VendorListHttpResponseDTO,
  VendorStatsHttpResponseDTO,
} from '../dtos/responses/vendor.response.dto.js';

export class VendorControllerMapper {
  // ═══ HTTP → App ═══
  static toRegisterAppDto(dto: RegisterVendorHttpDTO): RegisterVendorCommandDTO {
    return {
      userId: dto.userId,
      name: dto.name,
      displayName: dto.displayName,
      slug: dto.slug,
      description: dto.description,
      type: dto.type as never,
      businessType: dto.businessType as never,
      email: dto.email,
      phone: dto.phone,
      address: undefined as never,
      acceptTerms: true,
    };
  }

  static toUpdateAppDto(dto: UpdateVendorHttpDTO): UpdateVendorCommandDTO['patch'] {
    return {
      name: dto.name,
      displayName: dto.displayName,
      description: dto.description,
      logoUrl: dto.logoUrl,
      bannerUrl: dto.bannerUrl,
      website: dto.website,
    };
  }

  static toListOptions(q: ListVendorsHttpQueryDTO): VendorListOptionsDTO {
    const filter: VendorListFilterDTO = {
      status: q.status,
      type: q.type,
      tier: q.tier,
      isVerified: q.isVerified,
      isFeatured: q.isFeatured,
      search: q.search,
    };
    return {
      page: q.page ?? 1,
      limit: q.limit ?? 20,
      filter,
    };
  }

  static toStatsFilter(q: VendorStatsHttpQueryDTO): VendorListFilterDTO {
    return { status: q.status, type: q.type };
  }

  // ═══ App → HTTP ═══
  static toHttpResponse(app: VendorResponseDTO): VendorHttpResponseDTO {
    return { ...app };
  }

  static toPublicHttp(app: VendorPublicResponseDTO): VendorPublicHttpResponseDTO {
    return { ...app };
  }

  static toSummaryHttp(app: VendorSummaryResponseDTO): VendorSummaryHttpResponseDTO {
    return { ...app };
  }

  static toListHttp(app: VendorListResponseDTO): VendorListHttpResponseDTO {
    return {
      items: app.items.map((i) => this.toSummaryHttp(i)),
      total: app.total,
      page: app.page,
      limit: app.limit,
      totalPages: app.totalPages,
      hasNext: app.hasNext,
      hasPrev: app.hasPrev,
    };
  }

  static toStatsHttp(app: VendorStatsResponseDTO): VendorStatsHttpResponseDTO {
    return { ...app };
  }
}

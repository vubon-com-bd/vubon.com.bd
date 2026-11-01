/**
 * ReviewControllerMapper — HTTP DTO ↔ App DTO
 * @module product-service/interfaces/mappers
 */
import type {
  SubmitReviewHttpDTO,
  UpdateReviewHttpDTO,
  ListReviewsHttpQueryDTO,
} from '../dtos/requests/review.request.dto.js';

import type { SubmitReviewCommandDTO } from '../../application/dtos/requests/review/index.js';
import type {
  ReviewListOptionsDTO,
  ReviewListFilterDTO,
} from '../../application/services/interfaces/product-review.service.interface.js';

import type {
  ReviewResponseDTO,
  ReviewPublicResponseDTO,
  ReviewSummaryResponseDTO,
  ReviewListResponseDTO,
  ReviewStatsResponseDTO,
} from '../../application/dtos/responses/review-response.dto.js';

import {
  ReviewHttpResponseDTO,
  ReviewPublicHttpResponseDTO,
  ReviewSummaryHttpResponseDTO,
  ReviewListHttpResponseDTO,
  ReviewStatsHttpResponseDTO,
} from '../dtos/responses/review.response.dto.js';

export class ReviewControllerMapper {
  static toSubmitAppDto(dto: SubmitReviewHttpDTO, userId: string): SubmitReviewCommandDTO {
    return {
      productId: dto.productId,
      userId,
      orderId: dto.orderId,
      rating: dto.rating,
      title: dto.title,
      comment: dto.comment,
      images: dto.images,
    } as SubmitReviewCommandDTO;
  }

  static toUpdatePatch(dto: UpdateReviewHttpDTO): {
    readonly rating?: number;
    readonly title?: string;
    readonly comment?: string;
    readonly images?: readonly string[];
  } {
    return {
      rating: dto.rating,
      title: dto.title,
      comment: dto.comment,
      images: dto.images,
    };
  }

  static toListOptions(q: ListReviewsHttpQueryDTO): ReviewListOptionsDTO {
    const filter: ReviewListFilterDTO = {
      productId: q.productId,
      status: q.status,
      minRating: q.minRating,
      maxRating: q.maxRating,
    };
    return {
      page: q.page ?? 1,
      limit: q.limit ?? 20,
      filter,
    };
  }

  static toHttpResponse(app: ReviewResponseDTO): ReviewHttpResponseDTO {
    return app as unknown as ReviewHttpResponseDTO;
  }

  static toPublicHttpResponse(app: ReviewPublicResponseDTO): ReviewPublicHttpResponseDTO {
    return app as unknown as ReviewPublicHttpResponseDTO;
  }

  static toSummaryHttp(app: ReviewSummaryResponseDTO): ReviewSummaryHttpResponseDTO {
    return app as unknown as ReviewSummaryHttpResponseDTO;
  }

  static toListHttp(app: ReviewListResponseDTO): ReviewListHttpResponseDTO {
    return app as unknown as ReviewListHttpResponseDTO;
  }

  static toStatsHttp(app: ReviewStatsResponseDTO): ReviewStatsHttpResponseDTO {
    return app as unknown as ReviewStatsHttpResponseDTO;
  }
}

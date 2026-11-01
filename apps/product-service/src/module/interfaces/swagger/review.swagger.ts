/**
 * Review Swagger metadata helpers
 * @module product-service/interfaces/swagger
 */
import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { HTTP_STATUS } from '@vubon/shared-constants/common';
import {
  ReviewHttpResponseDTO,
  ReviewListHttpResponseDTO,
  ReviewStatsHttpResponseDTO,
} from '../dtos/responses/review.response.dto.js';

export const ApiReviewTag = (): MethodDecorator & ClassDecorator =>
  ApiTags('product-reviews');

export function ApiSubmitReview(): MethodDecorator {
  return applyDecorators(
    ApiOperation({ summary: 'Submit a review' }),
    ApiResponse({
      status: HTTP_STATUS.CREATED,
      description: 'Review submitted',
      type: ReviewHttpResponseDTO,
    }),
    ApiResponse({ status: HTTP_STATUS.CONFLICT, description: 'Duplicate review' }),
  );
}

export function ApiUpdateReview(): MethodDecorator {
  return applyDecorators(
    ApiOperation({ summary: 'Update a review' }),
    ApiResponse({
      status: HTTP_STATUS.OK,
      description: 'Review updated',
      type: ReviewHttpResponseDTO,
    }),
  );
}

export function ApiApproveReview(): MethodDecorator {
  return applyDecorators(
    ApiOperation({ summary: 'Approve review (moderator)' }),
    ApiResponse({
      status: HTTP_STATUS.OK,
      description: 'Review approved',
      type: ReviewHttpResponseDTO,
    }),
  );
}

export function ApiRejectReview(): MethodDecorator {
  return applyDecorators(
    ApiOperation({ summary: 'Reject review (moderator)' }),
    ApiResponse({
      status: HTTP_STATUS.OK,
      description: 'Review rejected',
      type: ReviewHttpResponseDTO,
    }),
  );
}

export function ApiListReviews(): MethodDecorator {
  return applyDecorators(
    ApiOperation({ summary: 'List reviews (paginated)' }),
    ApiResponse({
      status: HTTP_STATUS.OK,
      description: 'Reviews listed',
      type: ReviewListHttpResponseDTO,
    }),
  );
}

export function ApiGetReviewStats(): MethodDecorator {
  return applyDecorators(
    ApiOperation({ summary: 'Get review stats for product' }),
    ApiResponse({
      status: HTTP_STATUS.OK,
      description: 'Stats loaded',
      type: ReviewStatsHttpResponseDTO,
    }),
  );
}

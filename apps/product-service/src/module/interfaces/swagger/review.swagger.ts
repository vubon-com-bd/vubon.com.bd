import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ReviewHttpResponseDto } from '../dtos/responses/review.response.dto';

export const ReviewSwagger = {
  Tag: () => ApiTags('Product Reviews'),

  List: () =>
    applyDecorators(
      ApiOperation({ summary: 'List reviews for a product' }),
      ApiResponse({ status: 200, type: [ReviewHttpResponseDto] }),
    ),

  Submit: () =>
    applyDecorators(
      ApiOperation({ summary: 'Submit a review' }),
      ApiResponse({ status: 201, type: ReviewHttpResponseDto }),
    ),
};

import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { RecommendationResponseDTO } from '../dtos/responses/recommendation.response.dto';

export const RecommendationSwagger = {
  Generate: () =>
    applyDecorators(
      ApiOperation({ summary: 'Generate product recommendations' }),
      ApiResponse({ status: 200, type: RecommendationResponseDTO }),
      ApiResponse({ status: 429, description: 'Rate limit exceeded' }),
    ),
};

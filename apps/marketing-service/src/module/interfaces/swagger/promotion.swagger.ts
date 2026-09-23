import { applyDecorators } from '@nestjs/common';
import {
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreatePromotionRequestDTO } from '../dtos/requests/promotion.request.dto';

export const PromotionSwagger = {
  Tag: () => ApiTags('Promotions'),

  Create: () =>
    applyDecorators(
      ApiOperation({ summary: 'Create a promotion' }),
      ApiBody({ type: CreatePromotionRequestDTO }),
      ApiResponse({ status: 201, description: 'Promotion created' }),
    ),

  Apply: () =>
    applyDecorators(
      ApiOperation({ summary: 'Apply a promotion code' }),
      ApiResponse({ status: 200, description: 'Promotion applied' }),
    ),
};

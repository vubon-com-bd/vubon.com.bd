import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CommissionResponseDto } from '../dtos/responses/commission.response.dto';

export const CommissionSwagger = {
  Tag: () => ApiTags('Commission'),

  Calculate: () =>
    applyDecorators(
      ApiOperation({ summary: 'Calculate commission for order' }),
      ApiResponse({ status: 200, type: CommissionResponseDto }),
    ),
};

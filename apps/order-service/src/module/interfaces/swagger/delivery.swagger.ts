import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { DeliveryResponseDto } from '../dtos/responses/delivery.response.dto';

export const DeliverySwagger = {
  Tag: () => ApiTags('Delivery'),

  Schedule: () =>
    applyDecorators(
      ApiOperation({ summary: 'Schedule delivery' }),
      ApiResponse({ status: 201, type: DeliveryResponseDto }),
    ),

  Get: () =>
    applyDecorators(
      ApiOperation({ summary: 'Get delivery' }),
      ApiResponse({ status: 200, type: DeliveryResponseDto }),
    ),
};

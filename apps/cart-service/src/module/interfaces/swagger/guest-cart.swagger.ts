import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GuestCartResponseDto } from '../dtos/responses/guest-cart.response.dto';

export const GuestCartSwagger = {
  Tag: () => ApiTags('Guest Cart'),

  Create: () =>
    applyDecorators(
      ApiOperation({ summary: 'Create a guest cart' }),
      ApiResponse({ status: 201, type: GuestCartResponseDto }),
    ),

  Merge: () =>
    applyDecorators(
      ApiOperation({ summary: 'Merge guest cart into user cart' }),
      ApiResponse({ status: 200, description: 'Cart merged' }),
    ),
};

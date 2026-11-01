/**
 * GuestCart Swagger metadata helpers
 * @module cart-service/interfaces/swagger
 */
import { applyDecorators } from '@nestjs/common';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { HTTP_STATUS } from '@vubon/shared-constants/common';
import {
  GuestCartHttpResponseDTO,
  GuestCartInitiateHttpResponseDTO,
  MergeHttpResponseDTO,
  MergeSummaryHttpResponseDTO,
} from '../dtos/responses/guest-cart.response.dto.js';
import {
  CreateGuestCartHttpDTO,
  MergeGuestCartHttpDTO,
} from '../dtos/requests/guest.request.dto.js';

export const ApiGuestCartTag = (): MethodDecorator & ClassDecorator =>
  ApiTags('guest-carts');

export function ApiCreateGuestCart(): MethodDecorator {
  return applyDecorators(
    ApiOperation({ summary: 'Create a guest cart' }),
    ApiBody({ type: CreateGuestCartHttpDTO }),
    ApiResponse({
      status: HTTP_STATUS.CREATED,
      description: 'Guest cart created',
      type: GuestCartInitiateHttpResponseDTO,
    }),
  );
}

export function ApiMergeGuestCart(): MethodDecorator {
  return applyDecorators(
    ApiOperation({
      summary: 'Merge a guest cart into a user cart',
      description: 'Transfers items from guest cart to user cart using a merge strategy',
    }),
    ApiBody({ type: MergeGuestCartHttpDTO }),
    ApiResponse({
      status: HTTP_STATUS.OK,
      description: 'Merge result',
      type: MergeHttpResponseDTO,
    }),
  );
}

export function ApiGetGuestCart(): MethodDecorator {
  return applyDecorators(
    ApiOperation({ summary: 'Get guest cart by ID' }),
    ApiParam({ name: 'id', description: 'Guest cart UUID' }),
    ApiResponse({
      status: HTTP_STATUS.OK,
      description: 'Guest cart found',
      type: GuestCartHttpResponseDTO,
    }),
  );
}

export function ApiExpireGuestCart(): MethodDecorator {
  return applyDecorators(
    ApiOperation({ summary: 'Expire a guest cart' }),
    ApiParam({ name: 'id', description: 'Guest cart UUID' }),
    ApiResponse({
      status: HTTP_STATUS.OK,
      description: 'Guest cart expired',
      type: GuestCartHttpResponseDTO,
    }),
  );
}

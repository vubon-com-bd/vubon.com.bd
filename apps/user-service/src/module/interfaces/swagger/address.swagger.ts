/**
 * Address Swagger helpers
 */
import { applyDecorators } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import {
  AddressResponseDto,
  AddressListResponseDto,
} from '../dtos/responses/address.response.dto.js';

export function ApiListAddresses() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiOperation({ summary: 'List addresses for current user' }),
    ApiResponse({ status: 200, type: AddressListResponseDto })
  );
}

export function ApiAddAddress() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiOperation({ summary: 'Add new address' }),
    ApiResponse({ status: 201, type: AddressResponseDto })
  );
}

export function ApiUpdateAddress() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiOperation({ summary: 'Update address' }),
    ApiResponse({ status: 200, type: AddressResponseDto })
  );
}

export function ApiDeleteAddress() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiOperation({ summary: 'Delete address' }),
    ApiResponse({ status: 204 })
  );
}

export function ApiSetDefaultAddress() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiOperation({ summary: 'Set default address' }),
    ApiResponse({ status: 200, type: AddressResponseDto })
  );
}

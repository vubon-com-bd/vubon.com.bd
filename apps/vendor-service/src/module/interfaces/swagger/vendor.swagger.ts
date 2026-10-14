/**
 * Vendor Swagger metadata helpers
 * @module vendor-service/interfaces/swagger
 */
import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { HTTP_STATUS } from '@vubon/shared-constants/common';
import {
  VendorHttpResponseDTO,
  VendorInitiateHttpResponseDTO,
} from '../dtos/responses/vendor.response.dto.js';

export const ApiVendorTag = (): MethodDecorator & ClassDecorator =>
  ApiTags('vendors');

export function ApiRegisterVendor(): MethodDecorator {
  return applyDecorators(
    ApiOperation({ summary: 'Register a new vendor' }),
    ApiResponse({
      status: HTTP_STATUS.CREATED,
      description: 'Vendor registered',
      type: VendorInitiateHttpResponseDTO,
    }),
    ApiResponse({ status: HTTP_STATUS.BAD_REQUEST, description: 'Invalid input' }),
    ApiResponse({ status: HTTP_STATUS.UNAUTHORIZED, description: 'Unauthorized' }),
    ApiResponse({ status: HTTP_STATUS.CONFLICT, description: 'Slug/email exists' }),
  );
}

export function ApiGetVendor(): MethodDecorator {
  return applyDecorators(
    ApiOperation({ summary: 'Get vendor by ID' }),
    ApiResponse({
      status: HTTP_STATUS.OK,
      description: 'Vendor found',
      type: VendorHttpResponseDTO,
    }),
    ApiResponse({ status: HTTP_STATUS.NOT_FOUND, description: 'Vendor not found' }),
  );
}

export function ApiUpdateVendor(): MethodDecorator {
  return applyDecorators(
    ApiOperation({ summary: 'Update vendor profile' }),
    ApiResponse({
      status: HTTP_STATUS.OK,
      description: 'Vendor updated',
      type: VendorHttpResponseDTO,
    }),
    ApiResponse({ status: HTTP_STATUS.FORBIDDEN, description: 'Not owner' }),
  );
}

export function ApiListVendors(): MethodDecorator {
  return applyDecorators(
    ApiOperation({ summary: 'List vendors (paginated)' }),
    ApiResponse({ status: HTTP_STATUS.OK, description: 'Vendor list' }),
  );
}

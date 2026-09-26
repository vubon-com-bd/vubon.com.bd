import { applyDecorators } from '@nestjs/common';
import {
  ApiOperation,
  ApiBody,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { RegisterVendorRequestDto } from '../dtos/requests/vendor.request.dto';
import { VendorResponseDto } from '../dtos/responses/vendor.response.dto';

export const VendorSwagger = {
  Tag: () => ApiTags('Vendors'),

  Register: () =>
    applyDecorators(
      ApiOperation({ summary: 'Register a new vendor' }),
      ApiBody({ type: RegisterVendorRequestDto }),
      ApiResponse({ status: 201, type: VendorResponseDto }),
      ApiResponse({ status: 409, description: 'Vendor already exists' }),
    ),

  Get: () =>
    applyDecorators(
      ApiOperation({ summary: 'Get vendor by ID' }),
      ApiResponse({ status: 200, type: VendorResponseDto }),
      ApiResponse({ status: 404, description: 'Vendor not found' }),
    ),

  List: () =>
    applyDecorators(
      ApiOperation({ summary: 'List vendors' }),
      ApiResponse({ status: 200, type: [VendorResponseDto] }),
    ),
};

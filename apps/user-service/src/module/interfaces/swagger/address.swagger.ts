import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AddressResponseDto } from '../dtos/responses/address.response.dto';

export const AddressSwagger = {
  Tag: () => ApiTags('Addresses'),

  List: () =>
    applyDecorators(
      ApiOperation({ summary: 'List user addresses' }),
      ApiResponse({ status: 200, type: [AddressResponseDto] }),
    ),

  Create: () =>
    applyDecorators(
      ApiOperation({ summary: 'Add new address' }),
      ApiResponse({ status: 201, type: AddressResponseDto }),
    ),
};

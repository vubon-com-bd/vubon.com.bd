import { applyDecorators, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { AddressHttpResponseDTO } from '../dtos/responses/address.response.dto.js';

export const ApiAddressTag = (): MethodDecorator & ClassDecorator => ApiTags('address');

export function ApiAddAddress(): MethodDecorator {
  return applyDecorators(
    ApiBearerAuth('bearer'),
    ApiOperation({ summary: 'Add address' }),
    ApiResponse({ status: HttpStatus.CREATED, type: AddressHttpResponseDTO }),
  );
}

export function ApiListAddresses(): MethodDecorator {
  return applyDecorators(
    ApiBearerAuth('bearer'),
    ApiOperation({ summary: 'List addresses' }),
    ApiResponse({ status: HttpStatus.OK, type: [AddressHttpResponseDTO] }),
  );
}

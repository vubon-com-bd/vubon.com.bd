import { applyDecorators, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { KycHttpResponseDTO } from '../dtos/responses/kyc.response.dto.js';

export const ApiKycTag2 = (): MethodDecorator & ClassDecorator => ApiTags('kyc');

export function ApiGetKyc(): MethodDecorator {
  return applyDecorators(
    ApiBearerAuth('bearer'),
    ApiOperation({ summary: 'Get KYC status' }),
    ApiResponse({ status: HttpStatus.OK, type: KycHttpResponseDTO }),
  );
}

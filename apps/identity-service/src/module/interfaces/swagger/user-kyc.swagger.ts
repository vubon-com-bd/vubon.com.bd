/**
 * User KYC Swagger Metadata Helpers
 * @module identity-service/interfaces/swagger
 */
import { applyDecorators, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { UserKycHttpResponseDTO } from '../dtos/responses/user-kyc/user-kyc.response.dto.js';

export const ApiKycTag = (): MethodDecorator & ClassDecorator => ApiTags('user-kyc');

export function ApiSubmitKyc(): MethodDecorator {
  return applyDecorators(
    ApiBearerAuth('bearer'),
    ApiOperation({ summary: 'Submit KYC documents' }),
    ApiResponse({
      status: HttpStatus.CREATED,
      type: UserKycHttpResponseDTO,
      description: 'KYC submitted',
    }),
    ApiResponse({
      status: HttpStatus.CONFLICT,
      description: 'KYC already submitted',
    }),
  );
}

export function ApiVerifyKyc(): MethodDecorator {
  return applyDecorators(
    ApiBearerAuth('bearer'),
    ApiOperation({ summary: 'Verify KYC (admin)' }),
    ApiResponse({
      status: HttpStatus.OK,
      type: UserKycHttpResponseDTO,
      description: 'KYC verified',
    }),
    ApiResponse({
      status: HttpStatus.FORBIDDEN,
      description: 'Insufficient permissions',
    }),
  );
}

export function ApiRejectKyc(): MethodDecorator {
  return applyDecorators(
    ApiBearerAuth('bearer'),
    ApiOperation({ summary: 'Reject KYC (admin)' }),
    ApiResponse({
      status: HttpStatus.OK,
      type: UserKycHttpResponseDTO,
      description: 'KYC rejected',
    }),
  );
}

export function ApiGetKycStatus(): MethodDecorator {
  return applyDecorators(
    ApiBearerAuth('bearer'),
    ApiOperation({ summary: 'Get KYC status' }),
    ApiResponse({
      status: HttpStatus.OK,
      type: UserKycHttpResponseDTO,
      description: 'KYC status retrieved',
    }),
    ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'KYC not found' }),
  );
}

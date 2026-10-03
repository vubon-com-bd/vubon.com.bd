/**
 * KYC Swagger helpers
 */
import { applyDecorators } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import {
  KycResponseDto,
  KycListResponseDto,
} from '../dtos/responses/kyc.response.dto.js';

export function ApiGetKycStatus() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiOperation({ summary: 'Get KYC status for current user' }),
    ApiResponse({ status: 200, type: KycResponseDto })
  );
}

export function ApiListKycDocuments() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiOperation({ summary: 'List all KYC submissions' }),
    ApiResponse({ status: 200, type: KycListResponseDto })
  );
}

export function ApiSubmitKyc() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiOperation({ summary: 'Submit KYC documents' }),
    ApiResponse({ status: 201, type: KycResponseDto })
  );
}

export function ApiVerifyKyc() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiOperation({ summary: 'Approve KYC (admin only)' }),
    ApiResponse({ status: 200, type: KycResponseDto })
  );
}

export function ApiRejectKyc() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiOperation({ summary: 'Reject KYC (admin only)' }),
    ApiResponse({ status: 200, type: KycResponseDto })
  );
}

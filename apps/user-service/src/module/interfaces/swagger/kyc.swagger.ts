import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { KycResponseDto } from '../dtos/responses/kyc.response.dto';

export const KycSwagger = {
  Tag: () => ApiTags('KYC'),

  Status: () =>
    applyDecorators(
      ApiOperation({ summary: 'Get KYC status' }),
      ApiResponse({ status: 200, type: KycResponseDto }),
    ),

  Submit: () =>
    applyDecorators(
      ApiOperation({ summary: 'Submit KYC documents' }),
      ApiResponse({ status: 201, type: KycResponseDto }),
    ),
};

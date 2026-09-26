/**
 * MfaSwagger
 * @module auth-service/interfaces/swagger
 */
import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { MfaResponseDTO } from '../dtos/responses/mfa.response.dto';

export const MfaSwagger = {
  Enable: () =>
    applyDecorators(
      ApiOperation({ summary: 'Begin MFA enrollment' }),
      ApiBearerAuth(),
      ApiResponse({
        status: 200,
        description: 'Returns secret, QR url, recovery codes',
      }),
    ),

  Disable: () =>
    applyDecorators(
      ApiOperation({ summary: 'Disable MFA' }),
      ApiBearerAuth(),
      ApiResponse({ status: 204 }),
    ),

  Verify: () =>
    applyDecorators(
      ApiOperation({ summary: 'Verify MFA code' }),
      ApiBearerAuth(),
      ApiResponse({ status: 200, description: 'Verified' }),
      ApiResponse({ status: 401, description: 'Invalid code' }),
    ),

  Status: () =>
    applyDecorators(
      ApiOperation({ summary: 'Get MFA status' }),
      ApiBearerAuth(),
      ApiResponse({ status: 200, type: MfaResponseDTO }),
    ),
};

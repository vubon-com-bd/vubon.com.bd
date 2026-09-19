import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { MfaSetupResponseDTO } from '../dtos/responses/mfa.response.dto';

export const MfaSwagger = {
  Tag: () => ApiTags('MFA'),

  Setup: () =>
    applyDecorators(
      ApiOperation({ summary: 'Setup MFA for current user' }),
      ApiResponse({ status: 200, type: MfaSetupResponseDTO }),
    ),

  Verify: () =>
    applyDecorators(
      ApiOperation({ summary: 'Verify MFA code' }),
      ApiResponse({ status: 200, description: 'MFA verified' }),
      ApiResponse({ status: 400, description: 'Invalid code' }),
    ),

  Disable: () =>
    applyDecorators(
      ApiOperation({ summary: 'Disable MFA' }),
      ApiResponse({ status: 204, description: 'MFA disabled' }),
    ),
};

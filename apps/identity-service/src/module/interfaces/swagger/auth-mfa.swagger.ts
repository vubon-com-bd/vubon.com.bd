/**
 * Auth MFA Swagger Metadata Helpers
 * @module identity-service/interfaces/swagger
 */
import { applyDecorators, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { MfaSetupHttpResponseDTO } from '../dtos/responses/mfa/mfa-setup.response.dto.js';
import { MfaVerifyHttpResponseDTO } from '../dtos/responses/mfa/mfa-verify.response.dto.js';
import { MfaChallengeHttpResponseDTO } from '../dtos/responses/mfa/mfa-challenge.response.dto.js';

export const ApiMfaTag = (): MethodDecorator & ClassDecorator => ApiTags('auth-mfa');

export function ApiSetupMfa(): MethodDecorator {
  return applyDecorators(
    ApiBearerAuth('bearer'),
    ApiOperation({ summary: 'Setup MFA — generate secret + QR code' }),
    ApiResponse({
      status: HttpStatus.OK,
      type: MfaSetupHttpResponseDTO,
      description: 'MFA setup initiated',
    }),
    ApiResponse({ status: HttpStatus.CONFLICT, description: 'MFA already enabled' }),
  );
}

export function ApiVerifyMfa(): MethodDecorator {
  return applyDecorators(
    ApiBearerAuth('bearer'),
    ApiOperation({ summary: 'Verify MFA code' }),
    ApiResponse({
      status: HttpStatus.OK,
      type: MfaVerifyHttpResponseDTO,
      description: 'MFA verified',
    }),
    ApiResponse({
      status: HttpStatus.UNAUTHORIZED,
      description: 'Invalid or expired MFA code',
    }),
  );
}

export function ApiEnableMfa(): MethodDecorator {
  return applyDecorators(
    ApiBearerAuth('bearer'),
    ApiOperation({ summary: 'Enable MFA' }),
    ApiResponse({ status: HttpStatus.OK, description: 'MFA enabled' }),
    ApiResponse({
      status: HttpStatus.CONFLICT,
      description: 'MFA already enabled',
    }),
  );
}

export function ApiDisableMfa(): MethodDecorator {
  return applyDecorators(
    ApiBearerAuth('bearer'),
    ApiOperation({ summary: 'Disable MFA' }),
    ApiResponse({ status: HttpStatus.OK, description: 'MFA disabled' }),
    ApiResponse({
      status: HttpStatus.BAD_REQUEST,
      description: 'MFA not enabled',
    }),
  );
}

export function ApiGetMfaChallenge(): MethodDecorator {
  return applyDecorators(
    ApiBearerAuth('bearer'),
    ApiOperation({ summary: 'Get MFA challenge' }),
    ApiResponse({
      status: HttpStatus.OK,
      type: MfaChallengeHttpResponseDTO,
      description: 'Challenge created',
    }),
  );
}

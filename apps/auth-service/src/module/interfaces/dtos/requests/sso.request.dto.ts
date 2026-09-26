/**
 * SsoRequestDTO
 * @module auth-service/interfaces/dtos/requests
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

const SSO_PROVIDERS = ['saml', 'oidc', 'azure_ad', 'okta', 'keycloak', 'auth0', 'google_workspace', 'custom'];

export class SsoLoginRequestDTO {
  @ApiProperty({ enum: SSO_PROVIDERS })
  provider!: string;

  @ApiProperty({ minLength: 1, maxLength: 255 })
  tenantId!: string;

  @ApiPropertyOptional({ format: 'url' })
  redirectUri?: string;
}

export class SsoCallbackRequestDTO {
  @ApiProperty({ enum: SSO_PROVIDERS })
  provider!: string;

  @ApiProperty({ minLength: 1, maxLength: 255 })
  tenantId!: string;

  @ApiPropertyOptional()
  samlResponse?: string;

  @ApiPropertyOptional()
  code?: string;

  @ApiPropertyOptional()
  state?: string;
}

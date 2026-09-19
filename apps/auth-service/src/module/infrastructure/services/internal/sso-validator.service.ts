import { Injectable } from '@nestjs/common';
import axios from 'axios';
import type {
  SsoValidatorPort,
  SsoProfile,
} from '../../../application/ports/sso-validator.port';

@Injectable()
export class SsoValidatorService implements SsoValidatorPort {
  async verify(provider: string, token: string): Promise<SsoProfile> {
    switch (provider) {
      case 'google_workspace':
      case 'azure_ad':
      case 'okta': {
        // OIDC userinfo — token biasanya JWT
        const { data } = await axios.get(
          `https://${provider}.example.com/oauth2/userinfo`,
          { headers: { Authorization: `Bearer ${token}` } },
        );
        return {
          externalId: data.sub,
          email: data.email,
          name: data.name,
          attributes: data,
        };
      }
      default:
        throw new Error(`Unsupported SSO provider: ${provider}`);
    }
  }
}

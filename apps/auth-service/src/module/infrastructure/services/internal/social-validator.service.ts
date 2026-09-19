import { Injectable } from '@nestjs/common';
import axios from 'axios';
import type {
  SocialValidatorPort,
  SocialProfile,
} from '../../../application/ports/social-validator.port';

@Injectable()
export class SocialValidatorService implements SocialValidatorPort {
  async verify(provider: string, accessToken: string): Promise<SocialProfile> {
    switch (provider) {
      case 'google': {
        const { data } = await axios.get(
          'https://www.googleapis.com/oauth2/v3/userinfo',
          { headers: { Authorization: `Bearer ${accessToken}` } },
        );
        return {
          providerUserId: data.sub,
          email: data.email,
          name: data.name,
          avatarUrl: data.picture,
        };
      }
      case 'facebook': {
        const { data } = await axios.get(
          `https://graph.facebook.com/me?fields=id,name,email&access_token=${accessToken}`,
        );
        return {
          providerUserId: data.id,
          email: data.email,
          name: data.name,
        };
      }
      case 'github': {
        const { data } = await axios.get('https://api.github.com/user', {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        return {
          providerUserId: String(data.id),
          email: data.email ?? undefined,
          name: data.name ?? data.login,
          avatarUrl: data.avatar_url,
        };
      }
      default:
        throw new Error(`Unsupported social provider: ${provider}`);
    }
  }
}

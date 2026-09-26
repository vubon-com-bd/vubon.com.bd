/**
 * SocialValidatorService — Validates social providers + linked data
 * @module auth-service/infrastructure/services/internal
 */
import { Injectable } from '@nestjs/common';
import { SocialProviderVO } from '../../../domain/value-objects/primitives/social-provider.vo';
import { SocialProviderAppError } from '../../../application/errors/social.errors';

const SUPPORTED = new Set<string>([
  'google', 'facebook', 'apple', 'twitter',
  'github', 'linkedin', 'tiktok', 'instagram',
]);

@Injectable()
export class SocialValidatorService {
  readonly name = 'SocialValidatorService';

  assertSupported(provider: string): SocialProviderVO {
    const lower = provider.trim().toLowerCase();
    if (!SUPPORTED.has(lower)) {
      throw new SocialProviderAppError(provider, 'Unsupported provider');
    }
    return SocialProviderVO.of(lower);
  }

  isSupported(provider: string): boolean {
    return SUPPORTED.has(provider.trim().toLowerCase());
  }
}

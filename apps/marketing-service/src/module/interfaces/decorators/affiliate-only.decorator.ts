import { SetMetadata } from '@nestjs/common';

export const AFFILIATE_ONLY_KEY = 'affiliateOnly';
export const AffiliateOnly = (): MethodDecorator & ClassDecorator =>
  SetMetadata(AFFILIATE_ONLY_KEY, true);

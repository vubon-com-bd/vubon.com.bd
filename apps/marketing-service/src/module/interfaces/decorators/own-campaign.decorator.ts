import { SetMetadata } from '@nestjs/common';

export const OWN_CAMPAIGN_KEY = 'ownCampaign';
export const OwnCampaign = (): MethodDecorator & ClassDecorator =>
  SetMetadata(OWN_CAMPAIGN_KEY, true);

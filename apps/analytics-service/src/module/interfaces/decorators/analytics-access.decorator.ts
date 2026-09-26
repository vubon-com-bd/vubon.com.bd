import { SetMetadata } from '@nestjs/common';
import { ANALYTICS_ACCESS_KEY } from '../guards/analytics-access.guard';

export const AnalyticsAccess = (): MethodDecorator & ClassDecorator =>
  SetMetadata(ANALYTICS_ACCESS_KEY, true);

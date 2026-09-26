import { SetMetadata } from '@nestjs/common';

export const FEATURE_FLAG_KEY = 'feature_flag';
export const FeatureFlag = (name: string): MethodDecorator & ClassDecorator =>
  SetMetadata(FEATURE_FLAG_KEY, name);

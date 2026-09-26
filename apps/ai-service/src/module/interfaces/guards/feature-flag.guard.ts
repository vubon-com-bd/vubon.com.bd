import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { BaseGuard } from '@vubon/shared-kernel/interfaces';
import { FEATURE_FLAG_KEY } from '../decorators/feature-flag.decorator';

const FEATURE_FLAGS: Readonly<Record<string, boolean>> = Object.freeze({
  aiRecommendation: true,
  aiPersonalization: true,
  aiSemanticSearch: true,
  aiVector: true,
  aiPrompt: true,
  aiTraining: false,
  aiForecast: true,
  aiInsight: true,
});

@Injectable()
export class FeatureFlagGuard extends BaseGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext): boolean {
    const flagName = this.reflector.getAllAndOverride<string>(FEATURE_FLAG_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!flagName) return true;

    const enabled = FEATURE_FLAGS[flagName] === true;
    if (!enabled) {
      throw new ForbiddenException(`Feature '${flagName}' is disabled`);
    }

    return true;
  }
}

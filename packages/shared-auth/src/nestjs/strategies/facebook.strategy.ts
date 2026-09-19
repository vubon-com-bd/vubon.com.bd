import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, type Profile } from 'passport-facebook';

export interface FacebookStrategyConfig {
  readonly clientID: string;
  readonly clientSecret: string;
  readonly callbackURL: string;
  readonly scope?: readonly string[];
  readonly profileFields?: readonly string[];
}

/**
 * Facebook OAuth strategy.
 * ⚠️ Install `passport-facebook` + `@types/passport-facebook`.
 */
@Injectable()
export abstract class FacebookStrategyBase extends PassportStrategy(Strategy, 'facebook') {
  constructor(config: FacebookStrategyConfig) {
    super({
      clientID: config.clientID,
      clientSecret: config.clientSecret,
      callbackURL: config.callbackURL,
      scope: config.scope ? [...config.scope] : ['email'],
      profileFields: config.profileFields ? [...config.profileFields] : ['id', 'emails', 'name'],
    });
  }

  abstract validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: (err: unknown, user?: unknown) => void
  ): Promise<void>;
}

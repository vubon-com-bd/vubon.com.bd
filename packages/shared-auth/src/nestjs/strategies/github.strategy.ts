import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, type Profile } from 'passport-github2';

export interface GithubStrategyConfig {
  readonly clientID: string;
  readonly clientSecret: string;
  readonly callbackURL: string;
  readonly scope?: readonly string[];
}

/**
 * GitHub OAuth strategy.
 * ⚠️ Install `passport-github2` + `@types/passport-github2`.
 */
@Injectable()
export abstract class GithubStrategyBase extends PassportStrategy(Strategy, 'github') {
  constructor(config: GithubStrategyConfig) {
    super({
      clientID: config.clientID,
      clientSecret: config.clientSecret,
      callbackURL: config.callbackURL,
      scope: config.scope ? [...config.scope] : ['user:email'],
    });
  }

  abstract validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: (err: unknown, user?: unknown) => void
  ): Promise<void>;
}

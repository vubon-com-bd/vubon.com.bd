import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, type Profile, type VerifyCallback } from 'passport-google-oauth20';

export interface GoogleStrategyConfig {
  readonly clientID: string;
  readonly clientSecret: string;
  readonly callbackURL: string;
  readonly scope?: readonly string[];
}

/**
 * Google OAuth 2.0 strategy for NestJS.
 * ⚠️ Install `passport-google-oauth20` + `@types/passport-google-oauth20`.
 */
@Injectable()
export abstract class GoogleStrategyBase extends PassportStrategy(Strategy, 'google') {
  constructor(config: GoogleStrategyConfig) {
    super({
      clientID: config.clientID,
      clientSecret: config.clientSecret,
      callbackURL: config.callbackURL,
      scope: config.scope ? [...config.scope] : ['email', 'profile'],
    });
  }

  abstract validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: VerifyCallback
  ): Promise<void>;
}

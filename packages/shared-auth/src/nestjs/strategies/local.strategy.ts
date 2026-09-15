import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { InvalidCredentialsError } from '../../common/errors/invalid-credentials-error';

export interface LocalValidator {
  validate(
    identifier: string,
    password: string
  ): Promise<{ userId: string; roles: readonly string[] } | null>;
}

/**
 * Local (username/password) strategy.
 * The validator MUST be provided by the backend app.
 */
@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(private readonly validator: LocalValidator) {
    super({ usernameField: 'identifier', passwordField: 'password' });
  }

  async validate(
    identifier: string,
    password: string
  ): Promise<{ userId: string; roles: readonly string[] }> {
    const user = await this.validator.validate(identifier, password);
    if (!user) throw new InvalidCredentialsError();
    return user;
  }
}

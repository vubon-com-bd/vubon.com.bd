import { Injectable, Inject } from '@nestjs/common';
import { BaseService } from '@vubon/shared-kernel/application/services/base.service';
import type { AuthOAuthServiceInterface, IssueOAuthTokenInput, OAuthTokenResponse } from '../interfaces/auth-oauth.service.interface.js';
import type { OAuthClientRepository } from '../../../domain/repositories/oauth-client.repository.interface.js';
import { OAUTH_CLIENT_REPOSITORY } from '../../../domain/repositories/oauth-client.repository.interface.js';
import { OAuthFlowService } from '../../../domain/services/oauth-flow.service.js';

@Injectable()
export class AuthOAuthService extends BaseService implements AuthOAuthServiceInterface {
  readonly name = 'AuthOAuthService';
  constructor(@Inject(OAUTH_CLIENT_REPOSITORY) private readonly repo: OAuthClientRepository) { super(); }

  async authorize(_input: unknown): Promise<{ code: string; state: string }> {
    return { code: 'oauth_code_' + Math.random().toString(36).slice(2), state: '' };
  }
  async issueToken(_input: IssueOAuthTokenInput): Promise<OAuthTokenResponse> {
    return { accessToken: 'oauth.access', tokenType: 'Bearer', expiresIn: 3600 };
  }
  async revokeToken(_token: string): Promise<void> {}
}

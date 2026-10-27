/**
 * Auth Social Service — Real OAuth2 Implementation
 * @module identity-service/application/services/impl
 *
 * Handles:
 * - Google OAuth2 login/callback
 * - Social account linking
 * - Social account unlink
 */
import { Injectable, Inject, Logger } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { BaseService } from '@vubon/shared-kernel/application/services/base.service';

import type {
  AuthSocialServiceInterface,
  LinkSocialInput,
  SocialAuthorizationUrlResponseDTO,
} from '../interfaces/auth-social.service.interface.js';
import type { SocialLoginResponseDTO } from '../../dtos/responses/social-login-response.dto.js';
import type { SocialLoginRequestDTO } from '../../dtos/requests/auth/social-login.dto.js';
import type { SocialAccountRepository } from '../../../domain/repositories/social-account.repository.interface.js';
import { SOCIAL_ACCOUNT_REPOSITORY } from '../../../domain/repositories/social-account.repository.interface.js';
import type { SocialAccountEntity } from '../../../domain/entities/social-account.entity.js';
import { SocialAccountLinkerService } from '../../../domain/services/social-account-linker.service.js';
import { SocialProviderVO } from '../../../domain/value-objects/primitives/social-provider.vo.js';

import { GoogleOAuthClient } from '../../../infrastructure/external/oauth/google-oauth.client.js';
import { FacebookOAuthClient } from '../../../infrastructure/external/oauth/facebook-oauth.client.js';
import { GithubOAuthClient } from '../../../infrastructure/external/oauth/github-oauth.client.js';
import { LinkedinOAuthClient } from '../../../infrastructure/external/oauth/linkedin-oauth.client.js';
import { TwitterOAuthClient } from '../../../infrastructure/external/oauth/twitter-oauth.client.js';
import { MicrosoftOAuthClient } from '../../../infrastructure/external/oauth/microsoft-oauth.client.js';
import { AppleOAuthClient } from '../../../infrastructure/external/oauth/apple-oauth.client.js';
import { OAuthStateService } from '../../../infrastructure/services/internal/oauth-state.service.js';
import { GOOGLE_OAUTH_CONFIG } from '../../../infrastructure/config/google.config.js';
import { FACEBOOK_OAUTH_CONFIG } from '../../../infrastructure/config/facebook.config.js';
import { GITHUB_OAUTH_CONFIG } from '../../../infrastructure/config/github.config.js';
import { LINKEDIN_OAUTH_CONFIG } from '../../../infrastructure/config/linkedin.config.js';
import { TWITTER_OAUTH_CONFIG } from '../../../infrastructure/config/twitter.config.js';
import { MICROSOFT_OAUTH_CONFIG } from '../../../infrastructure/config/microsoft.config.js';
import { APPLE_OAUTH_CONFIG } from '../../../infrastructure/config/apple.config.js';

// These are injected for user/session creation — using interface contracts
export interface ISocialUserResolver {
  findOrCreateByEmail(input: {
    email: string;
    emailVerified: boolean;
    provider: string;
    providerUserId: string;
    displayName?: string;
    avatarUrl?: string;
  }): Promise<{
    user: {
      id: string;
      email: string;
      status: string;
      type: string;
      roles: readonly string[];
      emailVerified: boolean;
      createdAt: string;
    };
    isNewUser: boolean;
  }>;
}

export interface ISocialSessionIssuer {
  issueForUser(input: {
    userId: string;
    deviceId?: string;
    provider: string;
  }): Promise<{
    session: {
      id: string;
      userId: string;
      status: string;
      createdAt: string;
      lastAccessedAt: string;
      expiresAt: string;
      isCurrent: boolean;
    };
    tokens: {
      accessToken: string;
      refreshToken: string;
      tokenType: string;
      expiresIn: number;
      expiresAt: number;
    };
  }>;
}

export const SOCIAL_USER_RESOLVER = Symbol('SOCIAL_USER_RESOLVER');
export const SOCIAL_SESSION_ISSUER = Symbol('SOCIAL_SESSION_ISSUER');

@Injectable()
export class AuthSocialService extends BaseService implements AuthSocialServiceInterface {
  readonly name = 'AuthSocialService';
  private readonly logger = new Logger(AuthSocialService.name);

  constructor(
    @Inject(SOCIAL_ACCOUNT_REPOSITORY)
    private readonly repo: SocialAccountRepository,
    @Inject(SOCIAL_USER_RESOLVER)
    private readonly userResolver: ISocialUserResolver,
    @Inject(SOCIAL_SESSION_ISSUER)
    private readonly sessionIssuer: ISocialSessionIssuer,
    private readonly googleClient: GoogleOAuthClient,
    private readonly facebookClient: FacebookOAuthClient,
    private readonly githubClient: GithubOAuthClient,
    private readonly linkedinClient: LinkedinOAuthClient,
    private readonly twitterClient: TwitterOAuthClient,
    private readonly microsoftClient: MicrosoftOAuthClient,
    private readonly appleClient: AppleOAuthClient,
    private readonly stateService: OAuthStateService,
  ) {
    super();
  }

  /**
   * Step 1 — Initiate OAuth flow
   * Returns URL to redirect user to Google
   */
  async initiateAuthorization(params: {
    provider: string;
    redirectUri?: string;
  }): Promise<SocialAuthorizationUrlResponseDTO> {
    SocialAccountLinkerService.assertSupported(params.provider);

    if (params.provider === 'google') {
      const { state, codeChallenge } = await this.stateService.create({
        provider: 'google',
        redirectUri: params.redirectUri ?? GOOGLE_OAUTH_CONFIG.redirectUri,
        usePkce: true,
      });

      const authorizationUrl = this.googleClient.buildAuthorizationUrl({
        state,
        codeChallenge,
      });

      this.logger.log(`Google OAuth initiated — state=${state.slice(0, 8)}...`);
      return { authorizationUrl, state, provider: 'google' };
    }

    if (params.provider === 'facebook') {
      const { state } = await this.stateService.create({
        provider: 'facebook',
        redirectUri: params.redirectUri ?? FACEBOOK_OAUTH_CONFIG.redirectUri,
        usePkce: false,
      });

      const authorizationUrl = this.facebookClient.buildAuthorizationUrl({ state });

      this.logger.log(`Facebook OAuth initiated — state=${state.slice(0, 8)}...`);
      return { authorizationUrl, state, provider: 'facebook' };
    }

    if (params.provider === 'github') {
      const { state } = await this.stateService.create({
        provider: 'github',
        redirectUri: params.redirectUri ?? GITHUB_OAUTH_CONFIG.redirectUri,
        usePkce: false,
      });

      const authorizationUrl = this.githubClient.buildAuthorizationUrl({ state });

      this.logger.log(`GitHub OAuth initiated — state=${state.slice(0, 8)}...`);
      return { authorizationUrl, state, provider: 'github' };
    }

    if (params.provider === 'linkedin') {
      const { state } = await this.stateService.create({
        provider: 'linkedin',
        redirectUri: params.redirectUri ?? LINKEDIN_OAUTH_CONFIG.redirectUri,
        usePkce: false,
      });

      const authorizationUrl = this.linkedinClient.buildAuthorizationUrl({ state });
      this.logger.log(`LinkedIn OAuth initiated — state=${state.slice(0, 8)}...`);
      return { authorizationUrl, state, provider: 'linkedin' };
    }

    if (params.provider === 'twitter') {
      const { state, codeChallenge } = await this.stateService.create({
        provider: 'twitter',
        redirectUri: params.redirectUri ?? TWITTER_OAUTH_CONFIG.redirectUri,
        usePkce: true,
      });

      const authorizationUrl = this.twitterClient.buildAuthorizationUrl({
        state,
        codeChallenge: codeChallenge ?? '',
      });
      this.logger.log(`Twitter OAuth initiated — state=${state.slice(0, 8)}...`);
      return { authorizationUrl, state, provider: 'twitter' };
    }

    if (params.provider === 'microsoft') {
      const { state, codeChallenge } = await this.stateService.create({
        provider: 'microsoft',
        redirectUri: params.redirectUri ?? MICROSOFT_OAUTH_CONFIG.redirectUri,
        usePkce: true,
      });

      const authorizationUrl = this.microsoftClient.buildAuthorizationUrl({
        state,
        codeChallenge: codeChallenge ?? '',
      });
      this.logger.log(`Microsoft OAuth initiated — state=${state.slice(0, 8)}...`);
      return { authorizationUrl, state, provider: 'microsoft' };
    }

    if (params.provider === 'apple') {
      const { state, codeChallenge } = await this.stateService.create({
        provider: 'apple',
        redirectUri: params.redirectUri ?? APPLE_OAUTH_CONFIG.redirectUri,
        usePkce: true,
      });

      const authorizationUrl = this.appleClient.buildAuthorizationUrl({
        state,
        codeChallenge: codeChallenge ?? '',
      });
      this.logger.log(`Apple OAuth initiated — state=${state.slice(0, 8)}...`);
      return { authorizationUrl, state, provider: 'apple' };
    }

    throw new Error(`Provider ${params.provider} not yet implemented`);
  }

  /**
   * Step 2 — Exchange callback code for tokens + user
   */
  async login(input: SocialLoginRequestDTO): Promise<SocialLoginResponseDTO> {
    SocialAccountLinkerService.assertSupported(input.provider);

    if (input.provider === 'google') {
      return this.loginWithGoogle(input);
    }

    if (input.provider === 'facebook') {
      return this.loginWithFacebook(input);
    }

    if (input.provider === 'github') {
      return this.loginWithGithub(input);
    }

    if (input.provider === 'linkedin') {
      return this.loginWithLinkedin(input);
    }

    if (input.provider === 'twitter') {
      return this.loginWithTwitter(input);
    }

    if (input.provider === 'microsoft') {
      return this.loginWithMicrosoft(input);
    }

    if (input.provider === 'apple') {
      return this.loginWithApple(input);
    }

    throw new Error(`Provider ${input.provider} not yet implemented`);
  }

  private async loginWithGoogle(input: SocialLoginRequestDTO): Promise<SocialLoginResponseDTO> {
    // 1. Verify state
    const stateData = input.state
      ? await this.stateService.consume(input.state)
      : null;
    if (input.state && !stateData) {
      throw new Error('Invalid or expired OAuth state (CSRF protection)');
    }

    // 2. Exchange code for Google token
    this.logger.log(`Exchanging Google code...`);
    const tokens = await this.googleClient.exchangeCode({
      code: input.code,
      codeVerifier: stateData?.codeVerifier,
    });

    // 3. Fetch Google profile
    this.logger.log(`Fetching Google profile...`);
    const profile = await this.googleClient.fetchProfile(tokens.access_token);

    // 4. Find or create user
    const { user, isNewUser } = await this.userResolver.findOrCreateByEmail({
      email: profile.email,
      emailVerified: profile.email_verified,
      provider: 'google',
      providerUserId: profile.id,
      displayName: profile.name,
      avatarUrl: profile.picture,
    });

    // 5. Link social account (if not already linked)
    const existing = await this.repo.findByProviderAndProviderUserId(
      'google',
      profile.id,
    );
    if (!existing) {
      try {
        await this.repo.save({
          id: randomUUID(),
          userId: user.id,
          provider: 'google',
          providerUserId: profile.id,
          email: profile.email,
          displayName: profile.name,
          avatarUrl: profile.picture,
          linkedAt: new Date().toISOString(),
        } as never);
        this.logger.log(`Linked Google account for user ${user.id}`);
      } catch (err) {
        this.logger.warn(`Failed to link social account: ${err}`);
      }
    }

    // 6. Issue session + tokens
    const { session, tokens: jwtTokens } = await this.sessionIssuer.issueForUser({
      userId: user.id,
      deviceId: input.deviceId,
      provider: 'google',
    });

    this.logger.log(
      `✅ Google login success: userId=${user.id} email=${profile.email} new=${isNewUser}`,
    );

    return {
      success: true,
      user,
      session,
      tokens: {
        accessToken: jwtTokens.accessToken,
        refreshToken: jwtTokens.refreshToken,
        tokenType: 'Bearer' as const,
        expiresIn: jwtTokens.expiresIn,
        expiresAt: jwtTokens.expiresAt,
      },
      isNewUser,
      provider: 'google',
    };
  }

  private async loginWithFacebook(input: SocialLoginRequestDTO): Promise<SocialLoginResponseDTO> {
    const stateData = input.state
      ? await this.stateService.consume(input.state)
      : null;
    if (input.state && !stateData) {
      throw new Error('Invalid or expired OAuth state (CSRF protection)');
    }

    this.logger.log(`Exchanging Facebook code...`);
    const tokens = await this.facebookClient.exchangeCode(input.code);

    this.logger.log(`Fetching Facebook profile...`);
    const profile = await this.facebookClient.fetchProfile(tokens.access_token);

    if (!profile.email) {
      throw new Error('Facebook account has no email — cannot register');
    }

    const { user, isNewUser } = await this.userResolver.findOrCreateByEmail({
      email: profile.email,
      emailVerified: true,
      provider: 'facebook',
      providerUserId: profile.id,
      displayName: profile.name,
      avatarUrl: profile.picture?.data?.url,
    });

    const existing = await this.repo.findByProviderAndProviderUserId(
      'facebook',
      profile.id,
    );
    if (!existing) {
      try {
        await this.repo.save({
          id: randomUUID(),
          userId: user.id,
          provider: 'facebook',
          providerUserId: profile.id,
          email: profile.email,
          displayName: profile.name,
          avatarUrl: profile.picture?.data?.url,
          linkedAt: new Date().toISOString(),
        } as never);
        this.logger.log(`Linked Facebook account for user ${user.id}`);
      } catch (err) {
        this.logger.warn(`Failed to link Facebook account: ${err}`);
      }
    }

    const { session, tokens: jwtTokens } = await this.sessionIssuer.issueForUser({
      userId: user.id,
      deviceId: input.deviceId,
      provider: 'facebook',
    });

    this.logger.log(
      `✅ Facebook login success: userId=${user.id} new=${isNewUser}`,
    );

    return {
      success: true,
      user,
      session,
      tokens: {
        accessToken: jwtTokens.accessToken,
        refreshToken: jwtTokens.refreshToken,
        tokenType: 'Bearer' as const,
        expiresIn: jwtTokens.expiresIn,
        expiresAt: jwtTokens.expiresAt,
      },
      isNewUser,
      provider: 'facebook',
    };
  }

  private async loginWithGithub(input: SocialLoginRequestDTO): Promise<SocialLoginResponseDTO> {
    const stateData = input.state
      ? await this.stateService.consume(input.state)
      : null;
    if (input.state && !stateData) {
      throw new Error('Invalid or expired OAuth state (CSRF protection)');
    }

    this.logger.log(`Exchanging GitHub code...`);
    const tokens = await this.githubClient.exchangeCode(input.code);

    this.logger.log(`Fetching GitHub profile...`);
    const profile = await this.githubClient.fetchProfile(tokens.access_token);

    if (!profile.email) {
      throw new Error('GitHub account has no verified email — cannot register');
    }

    const displayName = profile.name ?? profile.login;

    const { user, isNewUser } = await this.userResolver.findOrCreateByEmail({
      email: profile.email,
      emailVerified: true,
      provider: 'github',
      providerUserId: String(profile.id),
      displayName,
      avatarUrl: profile.avatar_url,
    });

    const existing = await this.repo.findByProviderAndProviderUserId(
      'github',
      String(profile.id),
    );
    if (!existing) {
      try {
        await this.repo.save({
          id: randomUUID(),
          userId: user.id,
          provider: 'github',
          providerUserId: String(profile.id),
          email: profile.email,
          displayName,
          avatarUrl: profile.avatar_url,
          linkedAt: new Date().toISOString(),
        } as never);
        this.logger.log(`Linked GitHub account for user ${user.id}`);
      } catch (err) {
        this.logger.warn(`Failed to link GitHub account: ${err}`);
      }
    }

    const { session, tokens: jwtTokens } = await this.sessionIssuer.issueForUser({
      userId: user.id,
      deviceId: input.deviceId,
      provider: 'github',
    });

    this.logger.log(`✅ GitHub login success: userId=${user.id} new=${isNewUser}`);

    return {
      success: true,
      user,
      session,
      tokens: {
        accessToken: jwtTokens.accessToken,
        refreshToken: jwtTokens.refreshToken,
        tokenType: 'Bearer' as const,
        expiresIn: jwtTokens.expiresIn,
        expiresAt: jwtTokens.expiresAt,
      },
      isNewUser,
      provider: 'github',
    };
  }

  private async loginWithLinkedin(input: SocialLoginRequestDTO): Promise<SocialLoginResponseDTO> {
    const stateData = input.state ? await this.stateService.consume(input.state) : null;
    if (input.state && !stateData) {
      throw new Error('Invalid or expired OAuth state (CSRF protection)');
    }

    this.logger.log(`Exchanging LinkedIn code...`);
    const tokens = await this.linkedinClient.exchangeCode(input.code);

    this.logger.log(`Fetching LinkedIn profile...`);
    const profile = await this.linkedinClient.fetchProfile(tokens.access_token);

    if (!profile.email) {
      throw new Error('LinkedIn account has no email — cannot register');
    }

    const displayName = profile.name ?? `${profile.given_name ?? ''} ${profile.family_name ?? ''}`.trim();
    const { user, isNewUser } = await this.userResolver.findOrCreateByEmail({
      email: profile.email,
      emailVerified: profile.email_verified ?? true,
      provider: 'linkedin',
      providerUserId: profile.sub,
      displayName,
      avatarUrl: profile.picture,
    });

    const existing = await this.repo.findByProviderAndProviderUserId('linkedin', profile.sub);
    if (!existing) {
      try {
        await this.repo.save({
          id: randomUUID(),
          userId: user.id,
          provider: 'linkedin',
          providerUserId: profile.sub,
          email: profile.email,
          displayName,
          avatarUrl: profile.picture,
          linkedAt: new Date().toISOString(),
        } as never);
        this.logger.log(`Linked LinkedIn account for user ${user.id}`);
      } catch (err) {
        this.logger.warn(`Failed to link LinkedIn: ${err}`);
      }
    }

    const { session, tokens: jwtTokens } = await this.sessionIssuer.issueForUser({
      userId: user.id,
      deviceId: input.deviceId,
      provider: 'linkedin',
    });

    this.logger.log(`✅ LinkedIn login success: userId=${user.id} new=${isNewUser}`);

    return {
      success: true,
      user,
      session,
      tokens: {
        accessToken: jwtTokens.accessToken,
        refreshToken: jwtTokens.refreshToken,
        tokenType: 'Bearer' as const,
        expiresIn: jwtTokens.expiresIn,
        expiresAt: jwtTokens.expiresAt,
      },
      isNewUser,
      provider: 'linkedin',
    };
  }

  private async loginWithTwitter(input: SocialLoginRequestDTO): Promise<SocialLoginResponseDTO> {
    const stateData = input.state ? await this.stateService.consume(input.state) : null;
    if (input.state && !stateData) {
      throw new Error('Invalid or expired OAuth state (CSRF protection)');
    }

    this.logger.log(`Exchanging Twitter code...`);
    const tokens = await this.twitterClient.exchangeCode({
      code: input.code,
      codeVerifier: stateData?.codeVerifier ?? '',
    });

    this.logger.log(`Fetching Twitter profile...`);
    const profileResponse = await this.twitterClient.fetchProfile(tokens.access_token);
    const profile = profileResponse.data;

    // Twitter doesn't return email — use synthesized placeholder
    // User should link email later via separate flow
    const synthesizedEmail = `${profile.username}@twitter.oauth.local`;

    const { user, isNewUser } = await this.userResolver.findOrCreateByEmail({
      email: synthesizedEmail,
      emailVerified: false,
      provider: 'twitter',
      providerUserId: profile.id,
      displayName: profile.name ?? profile.username,
      avatarUrl: profile.profile_image_url,
    });

    const existing = await this.repo.findByProviderAndProviderUserId('twitter', profile.id);
    if (!existing) {
      try {
        await this.repo.save({
          id: randomUUID(),
          userId: user.id,
          provider: 'twitter',
          providerUserId: profile.id,
          email: synthesizedEmail,
          displayName: profile.name ?? profile.username,
          avatarUrl: profile.profile_image_url,
          linkedAt: new Date().toISOString(),
        } as never);
        this.logger.log(`Linked Twitter account for user ${user.id}`);
      } catch (err) {
        this.logger.warn(`Failed to link Twitter: ${err}`);
      }
    }

    const { session, tokens: jwtTokens } = await this.sessionIssuer.issueForUser({
      userId: user.id,
      deviceId: input.deviceId,
      provider: 'twitter',
    });

    this.logger.log(`✅ Twitter login success: userId=${user.id} new=${isNewUser}`);

    return {
      success: true,
      user,
      session,
      tokens: {
        accessToken: jwtTokens.accessToken,
        refreshToken: jwtTokens.refreshToken,
        tokenType: 'Bearer' as const,
        expiresIn: jwtTokens.expiresIn,
        expiresAt: jwtTokens.expiresAt,
      },
      isNewUser,
      provider: 'twitter',
    };
  }

  private async loginWithMicrosoft(input: SocialLoginRequestDTO): Promise<SocialLoginResponseDTO> {
    const stateData = input.state ? await this.stateService.consume(input.state) : null;
    if (input.state && !stateData) {
      throw new Error('Invalid or expired OAuth state (CSRF protection)');
    }

    this.logger.log(`Exchanging Microsoft code...`);
    const tokens = await this.microsoftClient.exchangeCode({
      code: input.code,
      codeVerifier: stateData?.codeVerifier ?? '',
    });

    this.logger.log(`Fetching Microsoft profile...`);
    const profile = await this.microsoftClient.fetchProfile(tokens.access_token);

    const email = profile.mail ?? profile.userPrincipalName;
    if (!email) {
      throw new Error('Microsoft account has no email — cannot register');
    }

    const displayName = profile.displayName
      ?? `${profile.givenName ?? ''} ${profile.surname ?? ''}`.trim()
      ?? email;

    const { user, isNewUser } = await this.userResolver.findOrCreateByEmail({
      email,
      emailVerified: true,
      provider: 'microsoft',
      providerUserId: profile.id,
      displayName,
    });

    const existing = await this.repo.findByProviderAndProviderUserId('microsoft', profile.id);
    if (!existing) {
      try {
        await this.repo.save({
          id: randomUUID(),
          userId: user.id,
          provider: 'microsoft',
          providerUserId: profile.id,
          email,
          displayName,
          linkedAt: new Date().toISOString(),
        } as never);
        this.logger.log(`Linked Microsoft account for user ${user.id}`);
      } catch (err) {
        this.logger.warn(`Failed to link Microsoft: ${err}`);
      }
    }

    const { session, tokens: jwtTokens } = await this.sessionIssuer.issueForUser({
      userId: user.id,
      deviceId: input.deviceId,
      provider: 'microsoft',
    });

    this.logger.log(`✅ Microsoft login success: userId=${user.id} new=${isNewUser}`);

    return {
      success: true,
      user,
      session,
      tokens: {
        accessToken: jwtTokens.accessToken,
        refreshToken: jwtTokens.refreshToken,
        tokenType: 'Bearer' as const,
        expiresIn: jwtTokens.expiresIn,
        expiresAt: jwtTokens.expiresAt,
      },
      isNewUser,
      provider: 'microsoft',
    };
  }

  private async loginWithApple(input: SocialLoginRequestDTO): Promise<SocialLoginResponseDTO> {
    const stateData = input.state ? await this.stateService.consume(input.state) : null;
    if (input.state && !stateData) {
      throw new Error('Invalid or expired OAuth state (CSRF protection)');
    }

    this.logger.log(`Exchanging Apple code...`);
    const tokens = await this.appleClient.exchangeCode({
      code: input.code,
      codeVerifier: stateData?.codeVerifier ?? '',
    });

    this.logger.log(`Decoding Apple id_token...`);
    const payload = this.appleClient.decodeIdToken(tokens.id_token);

    const email = payload.email;
    if (!email) {
      // Apple only returns email on first login
      // Subsequent logins must use `sub` to find existing user
      const existingBySub = await this.repo.findByProviderAndProviderUserId(
        'apple',
        payload.sub,
      );
      if (!existingBySub) {
        throw new Error(
          'Apple did not return email. Please sign in again with a fresh Apple ID, or link email manually.',
        );
      }
      // Existing user — synthesize from linked account
      const linkedUserId = (existingBySub as unknown as { userId?: string }).userId ?? '';
      const { session, tokens: jwtTokens } = await this.sessionIssuer.issueForUser({
        userId: linkedUserId,
        deviceId: input.deviceId,
        provider: 'apple',
      });

      this.logger.log(`✅ Apple re-login: userId=${linkedUserId}`);

      return {
        success: true,
        user: {
          id: linkedUserId,
          email: (existingBySub as unknown as { email?: string }).email ?? '',
          status: 'active',
          type: 'individual',
          roles: ['customer'],
          emailVerified: true,
          createdAt: new Date().toISOString(),
        },
        session,
        tokens: {
          accessToken: jwtTokens.accessToken,
          refreshToken: jwtTokens.refreshToken,
          tokenType: 'Bearer' as const,
          expiresIn: jwtTokens.expiresIn,
          expiresAt: jwtTokens.expiresAt,
        },
        isNewUser: false,
        provider: 'apple',
      };
    }

    const { user, isNewUser } = await this.userResolver.findOrCreateByEmail({
      email,
      emailVerified: payload.email_verified === true || payload.email_verified === 'true',
      provider: 'apple',
      providerUserId: payload.sub,
      displayName: email.split('@')[0],
    });

    const existing = await this.repo.findByProviderAndProviderUserId('apple', payload.sub);
    if (!existing) {
      try {
        await this.repo.save({
          id: randomUUID(),
          userId: user.id,
          provider: 'apple',
          providerUserId: payload.sub,
          email,
          displayName: email.split('@')[0],
          linkedAt: new Date().toISOString(),
        } as never);
        this.logger.log(`Linked Apple account for user ${user.id}`);
      } catch (err) {
        this.logger.warn(`Failed to link Apple: ${err}`);
      }
    }

    const { session, tokens: jwtTokens } = await this.sessionIssuer.issueForUser({
      userId: user.id,
      deviceId: input.deviceId,
      provider: 'apple',
    });

    this.logger.log(`✅ Apple login success: userId=${user.id} new=${isNewUser}`);

    return {
      success: true,
      user,
      session,
      tokens: {
        accessToken: jwtTokens.accessToken,
        refreshToken: jwtTokens.refreshToken,
        tokenType: 'Bearer' as const,
        expiresIn: jwtTokens.expiresIn,
        expiresAt: jwtTokens.expiresAt,
      },
      isNewUser,
      provider: 'apple',
    };
  }

  async link(input: LinkSocialInput): Promise<SocialAccountEntity> {
    SocialAccountLinkerService.assertSupported(input.provider);
    throw new Error('Link flow not yet implemented');
  }

  async unlink(authId: string, provider: string): Promise<void> {
    SocialAccountLinkerService.assertSupported(provider);
    const { UserIdVO } = await import('../../../domain/value-objects/primitives/user-id.vo.js');
    const userIdVO = UserIdVO.create(authId);
    const account = await this.repo.findByUserIdAndProvider(userIdVO, provider);
    if (!account) {
      throw new Error(`No ${provider} account linked to user ${authId}`);
    }
    await this.repo.delete(account.id);
    this.logger.log(`Unlinked ${provider} from user ${authId}`);
  }

  async listForUser(userId: string): Promise<readonly SocialAccountEntity[]> {
    return this.repo.findByUserId({ value: userId } as never);
  }
}

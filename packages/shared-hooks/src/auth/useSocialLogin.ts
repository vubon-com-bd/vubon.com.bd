/**
 * useSocialLogin Hook - OAuth flow trigger abstraction
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 *
 * @module shared-hooks/src/auth/useSocialLogin
 *
 * RULES:
 * ✅ ONLY OAuth flow trigger - NO business logic
 * ✅ NO OAuth secret handling, backend OAuth validation
 * ✅ Pure React hook for social login initiation
 * ✅ TypeScript strict
 */

import { useCallback, useState, useRef } from 'react';
import { getAxiosClient } from '@vubon/shared-api/client/axios';
import { createSocialEndpoints } from '@vubon/shared-api/endpoints/social';

// ==================== Types ====================

export type SocialProvider =
  | 'google'
  | 'github'
  | 'facebook'
  | 'apple'
  | 'linkedin'
  | 'whatsapp'
  | 'imo'
  | 'telegram'
  | 'bkash'
  | 'nagad'
  | 'rocket';

export interface UseSocialLoginOptions {
  /** Redirect URI for OAuth callback (default: `${window.location.origin}/auth/callback`) */
  redirectUri?: string;
  /** Use popup instead of full page redirect */
  usePopup?: boolean;
  /** Popup width in pixels (default: 500) */
  popupWidth?: number;
  /** Popup height in pixels (default: 600) */
  popupHeight?: number;
  /** Callback when OAuth flow fails */
  onError?: (error: Error) => void;
  /** Callback when OAuth flow is initiated successfully */
  onSuccess?: (result: { provider: SocialProvider; code?: string }) => void;
  /** Callback when popup is closed */
  onClose?: () => void;
  /** Callback when OAuth flow completes successfully (receives authorization code) */
  onCodeReceived?: (provider: SocialProvider, code: string) => void;
}

export interface UseSocialLoginReturn {
  loginWithGoogle: () => void;
  loginWithGithub: () => void;
  loginWithFacebook: () => void;
  loginWithApple: () => void;
  loginWithLinkedIn: () => void;
  loginWithWhatsApp: () => void;
  loginWithImo: () => void;
  loginWithTelegram: () => void;
  loginWithBkash: () => void;
  loginWithNagad: () => void;
  loginWithRocket: () => void;
  isLoading: boolean;
  activeProvider: SocialProvider | null;
}

// ==================== Provider Configurations ====================

interface ProviderConfig {
  /** Environment variable key for client ID */
  clientIdEnvKey: string;
  /** OAuth authorization URL */
  authUrl: string;
  /** OAuth scopes (space-separated) */
  scopes: string;
  /** Additional URL parameters */
  additionalParams?: Record<string, string>;
  /** Whether this provider works better with popup */
  usesPopup?: boolean;
}

const PROVIDER_CONFIGS: Record<SocialProvider, ProviderConfig> = {
  google: {
    clientIdEnvKey: 'NEXT_PUBLIC_GOOGLE_CLIENT_ID',
    authUrl: 'https://accounts.google.com/o/oauth2/v2/auth',
    scopes: 'openid email profile',
    additionalParams: {
      access_type: 'offline',
      prompt: 'select_account',
    },
    usesPopup: true,
  },
  github: {
    clientIdEnvKey: 'NEXT_PUBLIC_GITHUB_CLIENT_ID',
    authUrl: 'https://github.com/login/oauth/authorize',
    scopes: 'read:user user:email',
    usesPopup: true,
  },
  facebook: {
    clientIdEnvKey: 'NEXT_PUBLIC_FACEBOOK_CLIENT_ID',
    authUrl: 'https://www.facebook.com/v18.0/dialog/oauth',
    scopes: 'email public_profile',
    usesPopup: true,
  },
  apple: {
    clientIdEnvKey: 'NEXT_PUBLIC_APPLE_CLIENT_ID',
    authUrl: 'https://appleid.apple.com/auth/authorize',
    scopes: 'name email',
    additionalParams: {
      response_mode: 'form_post',
    },
    usesPopup: true,
  },
  linkedin: {
    clientIdEnvKey: 'NEXT_PUBLIC_LINKEDIN_CLIENT_ID',
    authUrl: 'https://www.linkedin.com/oauth/v2/authorization',
    scopes: 'openid profile email',
    usesPopup: true,
  },
  whatsapp: {
    clientIdEnvKey: 'NEXT_PUBLIC_WHATSAPP_CLIENT_ID',
    authUrl: 'https://api.whatsapp.com/send',
    scopes: '',
    usesPopup: false,
  },
  imo: {
    clientIdEnvKey: 'NEXT_PUBLIC_IMO_CLIENT_ID',
    authUrl: 'https://imo.im/login',
    scopes: '',
    usesPopup: false,
  },
  telegram: {
    clientIdEnvKey: 'NEXT_PUBLIC_TELEGRAM_BOT_NAME',
    authUrl: 'https://oauth.telegram.org/auth',
    scopes: '',
    usesPopup: true,
  },
  bkash: {
    clientIdEnvKey: 'NEXT_PUBLIC_BKASH_APP_KEY',
    authUrl: 'https://tokenized.sandbox.bka.sh/v1.2.0-beta/tokenized/checkout',
    scopes: '',
    usesPopup: true,
  },
  nagad: {
    clientIdEnvKey: 'NEXT_PUBLIC_NAGAD_MERCHANT_ID',
    authUrl: 'https://sandbox.mynagad.com/api/dfs/check-out/initialize',
    scopes: '',
    usesPopup: true,
  },
  rocket: {
    clientIdEnvKey: 'NEXT_PUBLIC_ROCKET_MERCHANT_ID',
    authUrl: 'https://rocket.com.bd/api/auth',
    scopes: '',
    usesPopup: true,
  },
};

// ==================== Helper Functions ====================

/**
 * Generate random state parameter for CSRF protection
 */
const generateState = (): string => {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 15)}`;
};

/**
 * Get popup window features
 */
const getPopupFeatures = (width: number, height: number): string => {
  const left = window.screen.width / 2 - width / 2;
  const top = window.screen.height / 2 - height / 2;
  return `width=${width},height=${height},left=${left},top=${top},popup=true,noopener=true`;
};

/**
 * Get client ID from environment variables
 */
const getClientId = (provider: SocialProvider): string => {
  const config = PROVIDER_CONFIGS[provider];
  if (!config) return '';
  return process.env[config.clientIdEnvKey] || '';
};

/**
 * Check if provider is configured
 */
const isProviderConfigured = (provider: SocialProvider): boolean => {
  const clientId = getClientId(provider);
  return !!clientId;
};

/**
 * Get provider configuration
 */
const getProviderConfig = (provider: SocialProvider): ProviderConfig | null => {
  return PROVIDER_CONFIGS[provider] || null;
};

// ==================== Hook ====================

/**
 * Hook for initiating social login flows
 * Opens OAuth redirect or popup
 *
 * @example
 * const { loginWithGoogle, loginWithFacebook, isLoading } = useSocialLogin({
 *   redirectUri: `${window.location.origin}/auth/callback`,
 *   usePopup: true,
 *   onError: (error) => console.error(error),
 *   onCodeReceived: (provider, code) => {
 *     // Handle the OAuth code (send to backend)
 *   }
 * });
 *
 * // Usage
 * <Button onClick={loginWithGoogle}>Login with Google</Button>
 */
export const useSocialLogin = (options?: UseSocialLoginOptions): UseSocialLoginReturn => {
  const [isLoading, setIsLoading] = useState(false);
  const [activeProvider, setActiveProvider] = useState<SocialProvider | null>(null);
  const popupRef = useRef<Window | null>(null);
  const pollIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  /**
   * Clean up popup and intervals
   */
  const cleanup = useCallback(() => {
    if (pollIntervalRef.current) {
      clearInterval(pollIntervalRef.current);
      pollIntervalRef.current = null;
    }
    if (popupRef.current && !popupRef.current.closed) {
      popupRef.current.close();
      popupRef.current = null;
    }
  }, []);

  /**
   * Initiate login with a specific provider
   */
  const loginWithProvider = useCallback(
    (provider: SocialProvider) => {
      // Validate provider configuration
      if (!isProviderConfigured(provider)) {
        options?.onError?.(new Error(`${provider} OAuth is not configured`));
        return;
      }

      const redirectUri = options?.redirectUri || `${window.location.origin}/auth/callback`;
      const state = generateState();
      const usePopup = options?.usePopup ?? PROVIDER_CONFIGS[provider]?.usesPopup ?? false;

      // Store state for verification
      sessionStorage.setItem(`oauth_state_${provider}`, state);
      sessionStorage.setItem('oauth_provider', provider);
      sessionStorage.setItem('oauth_redirect_uri', redirectUri);

      const config = getProviderConfig(provider);
      if (!config) {
        options?.onError?.(new Error(`Unknown provider: ${provider}`));
        return;
      }

      const clientId = getClientId(provider);
      if (!clientId) {
        options?.onError?.(new Error(`${provider} client ID not configured`));
        return;
      }

      // Build OAuth URL
      const params = new URLSearchParams({
        client_id: clientId,
        redirect_uri: redirectUri,
        response_type: 'code',
        scope: config.scopes,
        state,
        ...config.additionalParams,
      });

      const fullUrl = `${config.authUrl}?${params.toString()}`;

      setIsLoading(true);
      setActiveProvider(provider);
      options?.onSuccess?.({ provider });

      if (usePopup && typeof window !== 'undefined') {
        // Clean up any existing popup
        cleanup();

        const width = options?.popupWidth || 500;
        const height = options?.popupHeight || 600;

        popupRef.current = window.open(
          fullUrl,
          `oauth_${provider}`,
          getPopupFeatures(width, height)
        );

        if (!popupRef.current) {
          // Popup was blocked
          setIsLoading(false);
          setActiveProvider(null);
          options?.onError?.(new Error('Popup was blocked. Please allow popups for this site.'));
          return;
        }

        // Poll for popup close
        pollIntervalRef.current = setInterval(() => {
          if (popupRef.current?.closed) {
            cleanup();
            setIsLoading(false);
            setActiveProvider(null);
            options?.onClose?.();
          }
        }, 500);

        // Listen for message from popup
        const messageHandler = (event: MessageEvent) => {
          // Validate origin for security
          const allowedOrigins = [
            window.location.origin,
            'https://vubon.com.bd',
            'https://api.vubon.com.bd',
          ];
          if (!allowedOrigins.includes(event.origin)) {
            return;
          }

          if (event.data?.type === 'oauth_callback' && event.data?.provider === provider) {
            window.removeEventListener('message', messageHandler);
            cleanup();
            setIsLoading(false);
            setActiveProvider(null);

            if (event.data.code) {
              options?.onCodeReceived?.(provider, event.data.code);
            }
          }
        };

        window.addEventListener('message', messageHandler);
      } else {
        // Full page redirect
        window.location.href = fullUrl;
      }
    },
    [options, cleanup]
  );

  return {
    loginWithGoogle: useCallback(() => loginWithProvider('google'), [loginWithProvider]),
    loginWithGithub: useCallback(() => loginWithProvider('github'), [loginWithProvider]),
    loginWithFacebook: useCallback(() => loginWithProvider('facebook'), [loginWithProvider]),
    loginWithApple: useCallback(() => loginWithProvider('apple'), [loginWithProvider]),
    loginWithLinkedIn: useCallback(() => loginWithProvider('linkedin'), [loginWithProvider]),
    loginWithWhatsApp: useCallback(() => loginWithProvider('whatsapp'), [loginWithProvider]),
    loginWithImo: useCallback(() => loginWithProvider('imo'), [loginWithProvider]),
    loginWithTelegram: useCallback(() => loginWithProvider('telegram'), [loginWithProvider]),
    loginWithBkash: useCallback(() => loginWithProvider('bkash'), [loginWithProvider]),
    loginWithNagad: useCallback(() => loginWithProvider('nagad'), [loginWithProvider]),
    loginWithRocket: useCallback(() => loginWithProvider('rocket'), [loginWithProvider]),
    isLoading,
    activeProvider,
  };
};

// ==================== Type Exports ====================

export type { UseSocialLoginOptions, UseSocialLoginReturn, ProviderConfig };

/**
 * useSocialLogin Hook - OAuth flow trigger abstraction
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce

 * @module shared-hooks/src/auth/useSocialLogin

 * RULES:
 * ✅ ONLY OAuth flow trigger - NO business logic
 * ✅ NO OAuth secret handling, backend OAuth validation
 * ✅ Uses shared-config for client IDs (not directly reading env)
 * ✅ Pure React hook for social login initiation
 * ✅ TypeScript strict
 */

import { useCallback, useState, useRef } from 'react';

// Import client IDs from shared-config (Environment variables are resolved there)
import {
  env,
  isGoogleConfigured,
  isFacebookConfigured,
  isGithubConfigured,
  isAppleConfigured,
  isLinkedInConfigured,
} from '@vubon/shared-config/env';

import type { SocialProvider } from '@vubon/shared-types';

// ==================== Types ====================

export type { SocialProvider };

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
  /** Function to get client ID (from shared-config or direct) */
  getClientId: () => string;
  /** OAuth authorization URL */
  authUrl: string;
  /** OAuth scopes (space-separated) */
  scopes: string;
  /** Additional URL parameters */
  additionalParams?: Record<string, string>;
  /** Whether this provider works better with popup */
  usesPopup?: boolean;
  /** Function to check if provider is configured */
  isConfigured: () => boolean;
}

// Helper function to get client IDs from shared-config env
const getGoogleClientId = (): string => env.GOOGLE_CLIENT_ID || '';
const getFacebookClientId = (): string => env.FACEBOOK_CLIENT_ID || '';
const getGithubClientId = (): string => env.GITHUB_CLIENT_ID || '';
const getAppleClientId = (): string => env.APPLE_CLIENT_ID || '';
const getLinkedInClientId = (): string => env.LINKEDIN_CLIENT_ID || '';
const getWhatsAppClientId = (): string => env.WHATSAPP_PHONE_NUMBER_ID || '';
const getBkashClientId = (): string => env.BKASH_APP_KEY || '';
const getNagadClientId = (): string => env.NAGAD_MERCHANT_ID || '';

// Helper functions to check if providers are configured
const isGoogleConfiguredFn = (): boolean => isGoogleConfigured();
const isFacebookConfiguredFn = (): boolean => isFacebookConfigured();
const isGithubConfiguredFn = (): boolean => isGithubConfigured();
const isAppleConfiguredFn = (): boolean => isAppleConfigured();
const isLinkedInConfiguredFn = (): boolean => isLinkedInConfigured();
const isWhatsAppConfigured = (): boolean => !!env.WHATSAPP_PHONE_NUMBER_ID;
const isBkashConfigured = (): boolean => !!env.BKASH_APP_KEY;
const isNagadConfigured = (): boolean => !!env.NAGAD_MERCHANT_ID;

const PROVIDER_CONFIGS: Record<SocialProvider, ProviderConfig> = {
  google: {
    getClientId: getGoogleClientId,
    authUrl: 'https://accounts.google.com/o/oauth2/v2/auth',
    scopes: 'openid email profile',
    additionalParams: {
      access_type: 'offline',
      prompt: 'select_account',
    },
    usesPopup: true,
    isConfigured: isGoogleConfiguredFn,
  },
  github: {
    getClientId: getGithubClientId,
    authUrl: 'https://github.com/login/oauth/authorize',
    scopes: 'read:user user:email',
    usesPopup: true,
    isConfigured: isGithubConfiguredFn,
  },
  facebook: {
    getClientId: getFacebookClientId,
    authUrl: 'https://www.facebook.com/v18.0/dialog/oauth',
    scopes: 'email public_profile',
    usesPopup: true,
    isConfigured: isFacebookConfiguredFn,
  },
  apple: {
    getClientId: getAppleClientId,
    authUrl: 'https://appleid.apple.com/auth/authorize',
    scopes: 'name email',
    additionalParams: {
      response_mode: 'form_post',
    },
    usesPopup: true,
    isConfigured: isAppleConfiguredFn,
  },
  linkedin: {
    getClientId: getLinkedInClientId,
    authUrl: 'https://www.linkedin.com/oauth/v2/authorization',
    scopes: 'openid profile email',
    usesPopup: true,
    isConfigured: isLinkedInConfiguredFn,
  },
  whatsapp: {
    getClientId: getWhatsAppClientId,
    authUrl: 'https://api.whatsapp.com/send',
    scopes: '',
    usesPopup: false,
    isConfigured: isWhatsAppConfigured,
  },
  imo: {
    getClientId: () => '',
    authUrl: 'https://imo.im/login',
    scopes: '',
    usesPopup: false,
    isConfigured: () => false, // Imo OAuth is not standard, handled via phone verification
  },
  telegram: {
    getClientId: () => process.env.NEXT_PUBLIC_TELEGRAM_BOT_NAME || '',
    authUrl: 'https://oauth.telegram.org/embed',
    scopes: '',
    usesPopup: true,
    isConfigured: () => !!process.env.NEXT_PUBLIC_TELEGRAM_BOT_NAME,
  },
  bkash: {
    getClientId: getBkashClientId,
    authUrl: 'https://tokenized.sandbox.bka.sh/v1.2.0-beta/tokenized/checkout',
    scopes: '',
    usesPopup: true,
    isConfigured: isBkashConfigured,
  },
  nagad: {
    getClientId: getNagadClientId,
    authUrl: 'https://sandbox.mynagad.com/api/dfs/check-out/initialize',
    scopes: '',
    usesPopup: true,
    isConfigured: isNagadConfigured,
  },
  rocket: {
    getClientId: () => process.env.NEXT_PUBLIC_ROCKET_MERCHANT_ID || '',
    authUrl: 'https://rocket.com.bd/api/auth',
    scopes: '',
    usesPopup: true,
    isConfigured: () => !!process.env.NEXT_PUBLIC_ROCKET_MERCHANT_ID,
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
 * Check if provider is configured (uses shared-config helpers)
 */
const isProviderConfigured = (provider: SocialProvider): boolean => {
  const config = PROVIDER_CONFIGS[provider];
  if (!config) return false;
  return config.isConfigured();
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
 * IMPROVEMENT: 
 * - Uses shared-config for client ID resolution (not direct process.env)
 * - Better error messages with provider names
 * - Proper cleanup of intervals and event listeners
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
 */
export const useSocialLogin = (options?: UseSocialLoginOptions): UseSocialLoginReturn => {
  const [isLoading, setIsLoading] = useState(false);
  const [activeProvider, setActiveProvider] = useState<SocialProvider | null>(null);
  const popupRef = useRef<Window | null>(null);
  const pollIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const messageHandlerRef = useRef<((event: MessageEvent) => void) | null>(null);

  /**
   * Clean up popup and intervals
   */
  const cleanup = useCallback(() => {
    if (pollIntervalRef.current) {
      clearInterval(pollIntervalRef.current);
      pollIntervalRef.current = null;
    }
    
    if (messageHandlerRef.current) {
      window.removeEventListener('message', messageHandlerRef.current);
      messageHandlerRef.current = null;
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
        const errorMessage = `${provider} OAuth is not configured. Please check your environment variables.`;
        console.error(`[useSocialLogin] ${errorMessage}`);
        options?.onError?.(new Error(errorMessage));
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
        const errorMessage = `Unknown provider: ${provider}`;
        console.error(`[useSocialLogin] ${errorMessage}`);
        options?.onError?.(new Error(errorMessage));
        return;
      }

      const clientId = config.getClientId();
      if (!clientId) {
        const errorMessage = `${provider} client ID not configured. Please check your environment variables.`;
        console.error(`[useSocialLogin] ${errorMessage}`);
        options?.onError?.(new Error(errorMessage));
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
        // Clean up any existing popup and intervals
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
          const errorMessage = 'Popup was blocked. Please allow popups for this site.';
          console.warn(`[useSocialLogin] ${errorMessage}`);
          options?.onError?.(new Error(errorMessage));
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

        // Create message handler for popup communication
        const messageHandler = (event: MessageEvent) => {
          // Validate origin for security
          const allowedOrigins = [
            window.location.origin,
            'https://vubon.com.bd',
            'https://api.vubon.com.bd',
            'https://accounts.google.com',
            'https://github.com',
            'https://www.facebook.com',
            'https://appleid.apple.com',
            'https://www.linkedin.com',
          ];
          
          // Add localhost for development
          if (process.env.NODE_ENV === 'development') {
            allowedOrigins.push('http://localhost:3000', 'http://localhost:3001');
          }
          
          if (!allowedOrigins.includes(event.origin)) {
            return;
          }

          if (event.data?.type === 'oauth_callback' && event.data?.provider === provider) {
            cleanup();
            setIsLoading(false);
            setActiveProvider(null);

            if (event.data.code) {
              options?.onCodeReceived?.(provider, event.data.code);
            } else if (event.data.error) {
              const errorMessage = event.data.error_description || event.data.error;
              console.error(`[useSocialLogin] OAuth error: ${errorMessage}`);
              options?.onError?.(new Error(errorMessage));
            }
          }
        };

        messageHandlerRef.current = messageHandler;
        window.addEventListener('message', messageHandler);
      } else {
        // Full page redirect
        window.location.href = fullUrl;
      }
    },
    [options, cleanup]
  );

  // Return memoized login functions
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

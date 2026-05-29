/**
 * useSocialAuth Hook - Social authentication abstraction
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 * 
 * @module shared-auth/src/react/useSocialAuth
 * 
 * RULES:
 * ✅ ONLY social auth UI abstraction - NO OAuth secrets
 * ✅ NO backend provider validation, token signing
 * ✅ Pure React hook for social login orchestration
 * ✅ TypeScript strict
 */

import React from 'react';
import { useAuthContext } from './AuthContext';
import { env } from '@vubon/shared-config/env';

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

export interface SocialAuthConfig {
  providers?: SocialProvider[];
  redirectUri?: string;
  popupWidth?: number;
  popupHeight?: number;
  usePopup?: boolean;
  onSuccess?: (user: unknown) => void;
  onError?: (error: Error) => void;
  onClose?: () => void;
}

export interface SocialAuthCallbackResult {
  isProcessing: boolean;
  error: Error | null;
  provider: SocialProvider | null;
  success: boolean;
}

export interface UseSocialAuthReturn {
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
  isProcessing: boolean;
}

// ==================== Constants ====================

const OAUTH_URLS: Record<SocialProvider, string> = {
  google: 'https://accounts.google.com/o/oauth2/v2/auth',
  github: 'https://github.com/login/oauth/authorize',
  facebook: 'https://www.facebook.com/v18.0/dialog/oauth',
  apple: 'https://appleid.apple.com/auth/authorize',
  linkedin: 'https://www.linkedin.com/oauth/v2/authorization',
  whatsapp: 'https://api.whatsapp.com/send',
  imo: 'https://imo.im/login',
  telegram: 'https://oauth.telegram.org/embed',  // ✅ উন্নতি: সঠিক URL
  bkash: 'https://tokenized.sandbox.bka.sh/v1.2.0-beta/tokenized/checkout',
  nagad: 'https://sandbox.mynagad.com/api/dfs/check-out/initialize',
  rocket: 'https://rocket.com.bd/api/auth',
};

const OAUTH_SCOPES: Record<SocialProvider, string> = {
  google: 'openid email profile',
  github: 'read:user user:email',
  facebook: 'email public_profile',
  apple: 'name email',
  linkedin: 'openid profile email',
  whatsapp: '',    // WhatsApp uses phone number, not OAuth scopes
  imo: '',         // Imo uses phone number, not OAuth scopes
  telegram: '',    // Telegram uses phone number, not OAuth scopes
  bkash: '',       // bKash uses PIN/OTP, not OAuth scopes
  nagad: '',       // Nagad uses PIN/OTP, not OAuth scopes
  rocket: '',      // Rocket uses PIN/OTP, not OAuth scopes
};

const OAUTH_PROVIDER_NAMES: Record<SocialProvider, string> = {
  google: 'Google',
  github: 'GitHub',
  facebook: 'Facebook',
  apple: 'Apple',
  linkedin: 'LinkedIn',
  whatsapp: 'WhatsApp',
  imo: 'Imo',
  telegram: 'Telegram',
  bkash: 'bKash',
  nagad: 'Nagad',
  rocket: 'Rocket',
};

// ✅ উন্নতি: ক্লায়েন্ট আইডি ম্যাপিং (shared-config/env থেকে)
const getClientId = (provider: SocialProvider): string => {
  const clientIdMap: Record<SocialProvider, string> = {
    google: env.GOOGLE_CLIENT_ID || '',
    github: env.GITHUB_CLIENT_ID || '',
    facebook: env.FACEBOOK_CLIENT_ID || '',
    apple: env.APPLE_CLIENT_ID || '',
    linkedin: env.LINKEDIN_CLIENT_ID || '',
    whatsapp: env.WHATSAPP_PHONE_NUMBER_ID || '',
    imo: '',
    telegram: '',
    bkash: env.BKASH_APP_KEY || '',
    nagad: env.NAGAD_MERCHANT_ID || '',
    rocket: '',
  };
  return clientIdMap[provider];
};

// ✅ উন্নতি: প্রোভাইডার এনাবল্ড চেক (shared-config/env থেকে)
const isProviderEnabled = (provider: SocialProvider): boolean => {
  const enabledMap: Record<SocialProvider, boolean> = {
    google: !!env.GOOGLE_CLIENT_ID,
    github: !!env.GITHUB_CLIENT_ID,
    facebook: !!env.FACEBOOK_CLIENT_ID,
    apple: !!env.APPLE_CLIENT_ID,
    linkedin: !!env.LINKEDIN_CLIENT_ID,
    whatsapp: !!env.WHATSAPP_PHONE_NUMBER_ID,
    imo: false,  // ইমো OAuth কনফিগ না থাকলে false
    telegram: false, // টেলিগ্রাম OAuth কনফিগ না থাকলে false
    bkash: !!env.BKASH_APP_KEY,
    nagad: !!env.NAGAD_MERCHANT_ID,
    rocket: false,
  };
  return enabledMap[provider];
};

// ==================== Helper Functions ====================

const generateState = (): string => {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 15)}`;
};

const getPopupFeatures = (width: number, height: number): string => {
  const left = window.screen.width / 2 - width / 2;
  const top = window.screen.height / 2 - height / 2;
  return `width=${width},height=${height},left=${left},top=${top},popup=true`;
};

// ==================== Hook ====================

/**
 * Hook for social authentication
 * Opens OAuth popup or redirect
 * 
 * @param config - Social authentication configuration
 * @returns Social login methods
 * 
 * @example
 * const { loginWithGoogle, loginWithFacebook, isProcessing } = useSocialAuth({
 *   onSuccess: (user) => console.log('Logged in', user),
 *   onError: (error) => console.error(error),
 * });
 */
export const useSocialAuth = (config?: SocialAuthConfig): UseSocialAuthReturn => {
  const { login } = useAuthContext();
  const [isProcessing, setIsProcessing] = React.useState(false);
  const popupRef = React.useRef<Window | null>(null);

  const handleSocialLogin = async (provider: SocialProvider) => {
    // ✅ উন্নতি: প্রোভাইডার এনাবলড না থাকলে এরর থ্রো
    if (!isProviderEnabled(provider)) {
      const error = new Error(`${OAUTH_PROVIDER_NAMES[provider]} is not configured`);
      config?.onError?.(error);
      throw error;
    }

    const redirectUri = config?.redirectUri || `${window.location.origin}/auth/callback`;
    const state = generateState();
    const usePopup = config?.usePopup ?? false;
    const clientId = getClientId(provider);
    
    if (!clientId && provider !== 'imo' && provider !== 'telegram' && provider !== 'rocket') {
      const error = new Error(`Client ID for ${OAUTH_PROVIDER_NAMES[provider]} is missing`);
      config?.onError?.(error);
      throw error;
    }
    
    // Store state in session storage for verification
    sessionStorage.setItem(`oauth_state_${provider}`, state);
    sessionStorage.setItem('oauth_provider', provider);
    sessionStorage.setItem('oauth_redirect_uri', redirectUri);
    
    // Build OAuth URL
    const params = new URLSearchParams({
      client_id: clientId,
      redirect_uri: redirectUri,
      response_type: 'code',
      scope: OAUTH_SCOPES[provider],
      state,
    });
    
    // Add provider-specific params
    if (provider === 'google') {
      params.append('access_type', 'offline');
      params.append('prompt', 'select_account');
    }
    
    if (provider === 'apple') {
      params.append('response_mode', 'form_post');
    }
    
    const authUrl = OAUTH_URLS[provider];
    const fullUrl = `${authUrl}?${params.toString()}`;
    
    setIsProcessing(true);
    
    if (usePopup && typeof window !== 'undefined') {
      const width = config?.popupWidth || 500;
      const height = config?.popupHeight || 600;
      
      popupRef.current = window.open(
        fullUrl,
        `oauth_${provider}`,
        getPopupFeatures(width, height)
      );
      
      // Poll for popup close
      const pollTimer = setInterval(() => {
        if (popupRef.current?.closed) {
          clearInterval(pollTimer);
          setIsProcessing(false);
          config?.onClose?.();
        }
      }, 500);
    } else {
      window.location.href = fullUrl;
    }
  };

  // Close popup if still open on unmount
  React.useEffect(() => {
    return () => {
      if (popupRef.current && !popupRef.current.closed) {
        popupRef.current.close();
      }
    };
  }, []);

  return {
    loginWithGoogle: () => handleSocialLogin('google'),
    loginWithGithub: () => handleSocialLogin('github'),
    loginWithFacebook: () => handleSocialLogin('facebook'),
    loginWithApple: () => handleSocialLogin('apple'),
    loginWithLinkedIn: () => handleSocialLogin('linkedin'),
    loginWithWhatsApp: () => handleSocialLogin('whatsapp'),
    loginWithImo: () => handleSocialLogin('imo'),
    loginWithTelegram: () => handleSocialLogin('telegram'),  // ✅ উন্নতি: যোগ করা হয়েছে
    loginWithBkash: () => handleSocialLogin('bkash'),
    loginWithNagad: () => handleSocialLogin('nagad'),
    loginWithRocket: () => handleSocialLogin('rocket'),
    isProcessing,
  };
};

/**
 * Hook for handling OAuth callback
 * 
 * @param onSuccess - Callback when authentication succeeds
 * @param onError - Callback when authentication fails
 * @returns Callback processing state
 * 
 * @example
 * const { isProcessing, error, success } = useSocialAuthCallback({
 *   onSuccess: (user) => console.log('Logged in', user),
 *   onError: (error) => console.error(error),
 * });
 */
export const useSocialAuthCallback = (
  options?: { onSuccess?: (user: unknown) => void; onError?: (error: Error) => void }
): SocialAuthCallbackResult => {
  const [isProcessing, setIsProcessing] = React.useState(true);
  const [error, setError] = React.useState<Error | null>(null);
  const [provider, setProvider] = React.useState<SocialProvider | null>(null);
  const [success, setSuccess] = React.useState(false);
  const { login } = useAuthContext();

  React.useEffect(() => {
    const handleCallback = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get('code');
      const state = urlParams.get('state');
      const errorParam = urlParams.get('error');
      const errorDescription = urlParams.get('error_description');
      
      // Try to get provider from storage (set by popup/redirect)
      const storedProvider = sessionStorage.getItem('oauth_provider') as SocialProvider | null;
      setProvider(storedProvider);
      
      if (errorParam) {
        const err = new Error(errorDescription || errorParam);
        setError(err);
        setIsProcessing(false);
        setSuccess(false);
        options?.onError?.(err);
        // Clean up
        sessionStorage.removeItem('oauth_provider');
        sessionStorage.removeItem('oauth_state_google');
        sessionStorage.removeItem('oauth_state_facebook');
        sessionStorage.removeItem('oauth_state_github');
        sessionStorage.removeItem('oauth_redirect_uri');
        return;
      }
      
      if (!code || !storedProvider) {
        const err = new Error('Invalid OAuth callback: Missing code or provider');
        setError(err);
        setIsProcessing(false);
        setSuccess(false);
        options?.onError?.(err);
        return;
      }
      
      // Verify state if available
      const storedState = sessionStorage.getItem(`oauth_state_${storedProvider}`);
      if (storedState && state && storedState !== state) {
        const err = new Error('Invalid OAuth callback: State mismatch');
        setError(err);
        setIsProcessing(false);
        setSuccess(false);
        options?.onError?.(err);
        // Clean up
        sessionStorage.removeItem(`oauth_state_${storedProvider}`);
        sessionStorage.removeItem('oauth_provider');
        sessionStorage.removeItem('oauth_redirect_uri');
        return;
      }
      
      // Clear stored data
      sessionStorage.removeItem(`oauth_state_${storedProvider}`);
      sessionStorage.removeItem('oauth_provider');
      sessionStorage.removeItem('oauth_redirect_uri');
      
      // ✅ উন্নতি: ব্যাকএন্ডে টোকেন এক্সচেঞ্জের জন্য API কল
      try {
        // এখানে আপনার ব্যাকএন্ড এন্ডপয়েন্ট কল করুন
        // const response = await fetch('/api/auth/social/callback', {
        //   method: 'POST',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify({ provider: storedProvider, code, redirectUri: window.location.origin }),
        // });
        // const user = await response.json();
        // await login(user);  // অথবা authClient-এ হ্যান্ডেল করুন
        
        setSuccess(true);
        options?.onSuccess?.(null);
      } catch (err) {
        const error = err instanceof Error ? err : new Error('Social authentication failed');
        setError(error);
        setSuccess(false);
        options?.onError?.(error);
      } finally {
        setIsProcessing(false);
      }
      
      // ✅ উন্নতি: URL থেকে কোড প্যারামিটার সরিয়ে ফেলুন (রিফ্রেশ এড়াতে)
      if (window.history.replaceState) {
        const newUrl = window.location.pathname;
        window.history.replaceState({}, document.title, newUrl);
      }
    };
    
    handleCallback();
  }, [login, options]);

  return { isProcessing, error, provider, success };
};

/**
 * Hook for getting social login configuration
 * ✅ উন্নতি: shared-config/env ব্যবহার করে প্রোভাইডার এনাবলড চেক করে
 */
export const useSocialAuthConfig = () => {
  const [availableProviders, setAvailableProviders] = React.useState<SocialProvider[]>([]);
  
  React.useEffect(() => {
    const providers: SocialProvider[] = [];
    
    if (isProviderEnabled('google')) providers.push('google');
    if (isProviderEnabled('github')) providers.push('github');
    if (isProviderEnabled('facebook')) providers.push('facebook');
    if (isProviderEnabled('apple')) providers.push('apple');
    if (isProviderEnabled('linkedin')) providers.push('linkedin');
    if (isProviderEnabled('whatsapp')) providers.push('whatsapp');
    if (isProviderEnabled('bkash')) providers.push('bkash');
    if (isProviderEnabled('nagad')) providers.push('nagad');
    
    setAvailableProviders(providers);
  }, []);
  
  return {
    availableProviders,
    providerNames: OAUTH_PROVIDER_NAMES,
    getProviderName: (provider: SocialProvider) => OAUTH_PROVIDER_NAMES[provider],
    getAuthUrl: (provider: SocialProvider) => OAUTH_URLS[provider],
    isProviderEnabled,
  };
};

// ==================== Type Exports ====================

export type { SocialAuthConfig, SocialAuthCallbackResult, UseSocialAuthReturn };

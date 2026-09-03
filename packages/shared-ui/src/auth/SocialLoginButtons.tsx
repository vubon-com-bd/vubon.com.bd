/**
 * Auth SocialLoginButtons Component
 * প্রমীকরণ সোশ্যাল লগইন বাটন কম্পোনেন্ট
 */

import React from 'react';
import { useSocialAuth } from '@vubon/shared-auth';
import { AuthSocialEndpoints } from '@vubon/shared-api';
import { Button } from '../common/components/Button';

export interface AuthSocialLoginButtonsProps {
  onSuccess?: (data: any) => void;
  onError?: (error: Error) => void;
  providers?: string[];
  className?: string;
}

export const AuthSocialLoginButtons: React.FC<AuthSocialLoginButtonsProps> = ({
  onSuccess,
  onError,
  providers = ['google', 'facebook', 'github'],
  className = '',
}) => {
  const socialEndpoints = new AuthSocialEndpoints({} as any);
  const { loginWithSocial, getLoginUrl } = useSocialAuth(socialEndpoints);

  const handleSocialLogin = async (provider: string) => {
    try {
      const url = await getLoginUrl(provider);
      window.location.href = url;
    } catch (error) {
      onError?.(error as Error);
    }
  };

  const providerIcons: Record<string, React.ReactNode> = {
    google: (
      <svg className="h-4 w-4" viewBox="0 0 24 24">
        <path fill="#EA4335" d="M5.3 10.4A7.5 7.5 0 0 1 12 4.5c1.8 0 3.4.6 4.7 1.8l3.6-3.6A11.5 11.5 0 0 0 12 0C7.2 0 3.1 2.8 1.2 6.9l4.1 3.5z"/>
        <path fill="#34A853" d="M22.5 12.3c0-.8-.1-1.6-.2-2.4H12v4.6h5.9c-.3 1.5-1 2.8-2.1 3.6l3.5 2.9c2-1.8 3.2-4.5 3.2-8.7z"/>
        <path fill="#FBBC05" d="M5.3 10.4l-4.1-3.5C.4 8.7 0 10.3 0 12s.4 3.3 1.2 4.7l4.1-3.5z"/>
        <path fill="#4285F4" d="M12 24c3.1 0 5.8-1 7.7-2.8l-3.5-2.9c-1 .7-2.3 1.1-4.2 1.1-3.2 0-5.9-2.1-6.9-5l-4.1 3.5C3.1 21.2 7.2 24 12 24z"/>
      </svg>
    ),
    facebook: (
      <svg className="h-4 w-4" fill="#1877F2" viewBox="0 0 24 24">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
      </svg>
    ),
    github: (
      <svg className="h-4 w-4" fill="#181717" viewBox="0 0 24 24">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.15 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.62.24 2.85.12 3.15.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
      </svg>
    ),
  };

  const providerColors: Record<string, string> = {
    google: 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50',
    facebook: 'bg-[#1877F2] text-white hover:bg-[#1664D9]',
    github: 'bg-[#181717] text-white hover:bg-[#24292E]',
  };

  return (
    <div className={`space-y-2 ${className}`}>
      {providers.map((provider) => (
        <Button
          key={provider}
          variant="outline"
          fullWidth
          onClick={() => handleSocialLogin(provider)}
          className={`${providerColors[provider] || ''}`}
          leftIcon={providerIcons[provider]}
        >
          Continue with {provider.charAt(0).toUpperCase() + provider.slice(1)}
        </Button>
      ))}
    </div>
  );
};

/**
 * Auth SSOLoginButtons Component
 * প্রমীকরণ SSO লগইন বাটন কম্পোনেন্ট
 */

import React, { useEffect } from 'react';
import { useSSO } from '@vubon/shared-auth';
import { AuthSSOEndpoints } from '@vubon/shared-api';
import { AuthSSOProvider } from '@vubon/shared-types';
import { Button } from '../common/components/Button';

export interface AuthSSOLoginButtonsProps {
  onSuccess?: (data: any) => void;
  onError?: (error: Error) => void;
  providers?: AuthSSOProvider[];
  className?: string;
}

export const AuthSSOLoginButtons: React.FC<AuthSSOLoginButtonsProps> = ({
  onSuccess,
  onError,
  providers = ['google_workspace', 'azure_ad', 'okta', 'bd_gov_sso'] as AuthSSOProvider[],
  className = '',
}) => {
  const ssoEndpoints = new AuthSSOEndpoints({} as any);
  const { initiateLogin, providers: availableProviders, refreshProviders } = useSSO(ssoEndpoints);

  useEffect(() => {
    refreshProviders();
  }, []);

  const handleSSOLogin = async (providerId: AuthSSOProvider) => {
    try {
      const result = await initiateLogin(providerId);
      window.location.href = result.url;
    } catch (error) {
      onError?.(error as Error);
    }
  };

  const providerLabels: Record<AuthSSOProvider, string> = {
    google_workspace: 'Google Workspace',
    azure_ad: 'Azure AD',
    okta: 'Okta',
    bd_gov_sso: 'Bangladesh Government SSO',
    auth0: 'Auth0',
    aws_cognito: 'AWS Cognito',
    microsoft_365: 'Microsoft 365',
    duo: 'Duo',
    ping_identity: 'Ping Identity',
    one_login: 'One Login',
    bd_gov_digital: 'Bangladesh Digital',
    bd_gov_nid: 'Bangladesh NID',
    bd_gov_etc: 'Bangladesh ETC',
    bank_asia: 'Bank Asia',
    dbbl_sso: 'DBBL SSO',
    brac_sso: 'BRAC SSO',
    bkash_sso: 'bKash SSO',
    nagad_sso: 'Nagad SSO',
    rocket_sso: 'Rocket SSO',
  };

  const providerColors: Record<AuthSSOProvider, string> = {
    google_workspace: 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50',
    azure_ad: 'bg-[#0078D4] text-white hover:bg-[#106EBE]',
    okta: 'bg-[#007DC1] text-white hover:bg-[#006DAB]',
    bd_gov_sso: 'bg-[#006A4E] text-white hover:bg-[#005A42]',
    auth0: 'bg-[#EB5424] text-white hover:bg-[#D14A1E]',
    aws_cognito: 'bg-[#FF9900] text-white hover:bg-[#E88A00]',
    microsoft_365: 'bg-[#00A4EF] text-white hover:bg-[#0092D6]',
    duo: 'bg-[#2B2D42] text-white hover:bg-[#1E1F2E]',
    ping_identity: 'bg-[#00A9E0] text-white hover:bg-[#0097C4]',
    one_login: 'bg-[#8B5CF6] text-white hover:bg-[#7C3AED]',
    bd_gov_digital: 'bg-[#004225] text-white hover:bg-[#003519]',
    bd_gov_nid: 'bg-[#1A5C9E] text-white hover:bg-[#154B80]',
    bd_gov_etc: 'bg-[#E31E24] text-white hover:bg-[#C4191E]',
    bank_asia: 'bg-[#1A3C6E] text-white hover:bg-[#142F56]',
    dbbl_sso: 'bg-[#005F8D] text-white hover:bg-[#004B72]',
    brac_sso: 'bg-[#006B4D] text-white hover:bg-[#00553D]',
    bkash_sso: 'bg-[#E21E31] text-white hover:bg-[#C4192A]',
    nagad_sso: 'bg-[#FF6200] text-white hover:bg-[#E65800]',
    rocket_sso: 'bg-[#00A651] text-white hover:bg-[#008F43]',
  };

  // Available providers from API
  const availableProviderIds = availableProviders.map(p => p.id as AuthSSOProvider);

  // Filter providers to show only those that are requested and available
  const filteredProviders = providers.filter(p => availableProviderIds.includes(p));

  // If no providers match, show all requested providers (fallback)
  const displayProviders = filteredProviders.length > 0 ? filteredProviders : providers;

  return (
    <div className={`space-y-2 ${className}`}>
      {displayProviders.map((providerId) => (
        <Button
          key={providerId}
          variant="outline"
          fullWidth
          onClick={() => handleSSOLogin(providerId)}
          className={providerColors[providerId] || ''}
        >
          {providerLabels[providerId] || providerId}
        </Button>
      ))}
    </div>
  );
};

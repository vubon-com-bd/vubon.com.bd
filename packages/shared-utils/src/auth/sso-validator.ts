/**
 * Auth SSO Validator
 * প্রমীকরণ SSO ভ্যালিডেটর
 */

import { AUTH_SSO } from '@vubon/shared-constants';

type SSOProvider = (typeof AUTH_SSO.PROVIDERS)[keyof typeof AUTH_SSO.PROVIDERS];
type SSOProtocol = (typeof AUTH_SSO.PROTOCOLS)[keyof typeof AUTH_SSO.PROTOCOLS];

interface SSOProviderConfig {
  entityId: string;
  ssoEndpoint: string;
  sloEndpoint?: string;
  certificate?: string;
  protocol: string;
}

export const AuthSSOValidator = {
  /**
   * Validate SSO provider
   * SSO প্রোভাইডার ভ্যালিডেট করা
   */
  validateProvider: (provider: string): provider is SSOProvider => {
    const validProviders = Object.values(AUTH_SSO.PROVIDERS);
    return validProviders.includes(provider as SSOProvider);
  },

  /**
   * Validate SSO protocol
   * SSO প্রোটোকল ভ্যালিডেট করা
   */
  validateProtocol: (protocol: string): protocol is SSOProtocol => {
    const validProtocols = Object.values(AUTH_SSO.PROTOCOLS);
    return validProtocols.includes(protocol as SSOProtocol);
  },

  /**
   * Validate SAML request
   * SAML রিকোয়েস্ট ভ্যালিডেট করা
   */
  validateSAMLRequest: (samlRequest: string): { valid: boolean; errors: string[] } => {
    const errors: string[] = [];

    if (!samlRequest || samlRequest.length === 0) {
      errors.push('SAML request is required');
      return { valid: false, errors };
    }

    // In real implementation, we would validate SAML XML structure
    // This is a simplified check
    try {
      const decoded = atob(samlRequest);
      if (!decoded.includes('<samlp:AuthnRequest')) {
        errors.push('Invalid SAML AuthnRequest format');
      }
    } catch (error) {
      errors.push(
        `Invalid SAML request encoding: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    }

    return {
      valid: errors.length === 0,
      errors,
    };
  },

  /**
   * Validate SAML response
   * SAML রেসপন্স ভ্যালিডেট করা
   */
  validateSAMLResponse: (samlResponse: string): { valid: boolean; errors: string[] } => {
    const errors: string[] = [];

    if (!samlResponse || samlResponse.length === 0) {
      errors.push('SAML response is required');
      return { valid: false, errors };
    }

    try {
      const decoded = atob(samlResponse);
      if (!decoded.includes('<samlp:Response')) {
        errors.push('Invalid SAML Response format');
      }
    } catch (error) {
      errors.push(
        `Invalid SAML response encoding: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    }

    return {
      valid: errors.length === 0,
      errors,
    };
  },

  /**
   * Validate SSO state
   * SSO স্টেট ভ্যালিডেট করা
   */
  validateState: (state: string, storedState: string): { valid: boolean; errors: string[] } => {
    const errors: string[] = [];

    if (!state) {
      errors.push('State parameter is required');
    }

    if (!storedState) {
      errors.push('Stored state not found');
    }

    if (state && storedState && state !== storedState) {
      errors.push('State mismatch - possible CSRF attack');
    }

    return {
      valid: errors.length === 0,
      errors,
    };
  },

  /**
   * Get SSO provider configuration
   * SSO প্রোভাইডার কনফিগারেশন পাওয়া
   */
  getProviderConfig: (provider: string): SSOProviderConfig | null => {
    const configs: Record<string, SSOProviderConfig> = {
      okta: {
        entityId: 'urn:okta:auth',
        ssoEndpoint: 'https://{domain}/sso/saml',
        sloEndpoint: 'https://{domain}/sso/slo',
        protocol: 'saml',
      },
      azure_ad: {
        entityId: 'urn:azure:ad',
        ssoEndpoint: 'https://login.microsoftonline.com/{tenant}/saml2',
        sloEndpoint: 'https://login.microsoftonline.com/{tenant}/saml2/logout',
        protocol: 'saml',
      },
      auth0: {
        entityId: 'urn:auth0:auth',
        ssoEndpoint: 'https://{domain}/samlp/{connection}',
        protocol: 'saml',
      },
      google_workspace: {
        entityId: 'urn:google:apps',
        ssoEndpoint: 'https://accounts.google.com/o/saml2/idp',
        sloEndpoint: 'https://accounts.google.com/logout',
        protocol: 'saml',
      },
      microsoft_365: {
        entityId: 'urn:microsoft:365',
        ssoEndpoint: 'https://login.microsoftonline.com/{tenant}/saml2',
        sloEndpoint: 'https://login.microsoftonline.com/{tenant}/saml2/logout',
        protocol: 'saml',
      },
      duo: {
        entityId: 'urn:duo:auth',
        ssoEndpoint: 'https://api-duo.com/sso/saml',
        sloEndpoint: 'https://api-duo.com/sso/slo',
        protocol: 'saml',
      },
      ping_identity: {
        entityId: 'urn:ping:identity',
        ssoEndpoint: 'https://sso.pingidentity.com/saml',
        sloEndpoint: 'https://sso.pingidentity.com/slo',
        protocol: 'saml',
      },
      one_login: {
        entityId: 'urn:onelogin:auth',
        ssoEndpoint: 'https://onelogin.com/saml',
        sloEndpoint: 'https://onelogin.com/slo',
        protocol: 'saml',
      },
      bd_gov_sso: {
        entityId: 'urn:bd:gov:sso',
        ssoEndpoint: 'https://sso.gov.bd/saml',
        sloEndpoint: 'https://sso.gov.bd/slo',
        protocol: 'saml',
      },
      bd_gov_digital: {
        entityId: 'urn:bd:gov:digital',
        ssoEndpoint: 'https://digital.gov.bd/sso/saml',
        sloEndpoint: 'https://digital.gov.bd/sso/slo',
        protocol: 'saml',
      },
      bd_gov_nid: {
        entityId: 'urn:bd:gov:nid',
        ssoEndpoint: 'https://nid.gov.bd/sso/saml',
        sloEndpoint: 'https://nid.gov.bd/sso/slo',
        protocol: 'saml',
      },
      bd_gov_etc: {
        entityId: 'urn:bd:gov:etc',
        ssoEndpoint: 'https://etc.gov.bd/sso/saml',
        sloEndpoint: 'https://etc.gov.bd/sso/slo',
        protocol: 'saml',
      },
      bank_asia: {
        entityId: 'urn:bank:asia',
        ssoEndpoint: 'https://bankasia.com/sso/saml',
        sloEndpoint: 'https://bankasia.com/sso/slo',
        protocol: 'saml',
      },
      dbbl_sso: {
        entityId: 'urn:dbbl:sso',
        ssoEndpoint: 'https://dbbl.com/sso/saml',
        sloEndpoint: 'https://dbbl.com/sso/slo',
        protocol: 'saml',
      },
      brac_sso: {
        entityId: 'urn:brac:sso',
        ssoEndpoint: 'https://brac.com/sso/saml',
        sloEndpoint: 'https://brac.com/sso/slo',
        protocol: 'saml',
      },
      bkash_sso: {
        entityId: 'urn:bkash:sso',
        ssoEndpoint: 'https://bkash.com/sso/saml',
        sloEndpoint: 'https://bkash.com/sso/slo',
        protocol: 'saml',
      },
      nagad_sso: {
        entityId: 'urn:nagad:sso',
        ssoEndpoint: 'https://nagad.com/sso/saml',
        sloEndpoint: 'https://nagad.com/sso/slo',
        protocol: 'saml',
      },
      rocket_sso: {
        entityId: 'urn:rocket:sso',
        ssoEndpoint: 'https://rocket.com/sso/saml',
        sloEndpoint: 'https://rocket.com/sso/slo',
        protocol: 'saml',
      },
    };

    const normalizedProvider = provider.toLowerCase();
    return configs[normalizedProvider] || null;
  },

  /**
   * Validate SSO binding
   * SSO বাইন্ডিং ভ্যালিডেট করা
   */
  validateBinding: (binding: string): boolean => {
    const validBindings = Object.values(AUTH_SSO.SAML_BINDINGS);
    return validBindings.includes(binding as (typeof validBindings)[number]);
  },

  /**
   * Get supported SSO protocols
   * সাপোর্টেড SSO প্রোটোকল পাওয়া
   */
  getSupportedProtocols: (provider: string): string[] => {
    const protocols: Record<string, string[]> = {
      okta: ['saml', 'oidc'],
      azure_ad: ['saml', 'oidc', 'ws_federation'],
      auth0: ['saml', 'oidc'],
      google_workspace: ['saml', 'oidc'],
      microsoft_365: ['saml', 'oidc', 'ws_federation'],
      duo: ['saml', 'oidc'],
      ping_identity: ['saml', 'oidc'],
      one_login: ['saml', 'oidc'],
      bd_gov_sso: ['saml'],
      bd_gov_digital: ['saml', 'oidc'],
      bd_gov_nid: ['saml'],
      bd_gov_etc: ['saml'],
      bank_asia: ['saml'],
      dbbl_sso: ['saml'],
      brac_sso: ['saml'],
      bkash_sso: ['saml'],
      nagad_sso: ['saml'],
      rocket_sso: ['saml'],
    };

    return protocols[provider.toLowerCase()] || ['saml'];
  },
};

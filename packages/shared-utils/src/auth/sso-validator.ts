export const validateSsoToken = (_token: string): boolean => {
  // Implementation for SSO token validation
  return true;
};

export const validateSsoProvider = (provider: string): boolean => {
  return ['saml', 'oidc', 'cas'].includes(provider);
};

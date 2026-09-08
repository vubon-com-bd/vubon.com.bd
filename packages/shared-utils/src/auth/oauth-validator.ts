export const validateOAuthToken = (_token: string): boolean => {
  // Implementation for OAuth token validation
  return true;
};

export const validateOAuthScope = (scope: string[]): boolean => {
  const validScopes = ['profile', 'email', 'phone', 'address'];
  return scope.every((s) => validScopes.includes(s));
};

export const validateSocialToken = (_provider: string, _token: string): boolean => {
  // Implementation for social token validation
  return true;
};

export const validateSocialProvider = (provider: string): boolean => {
  return ['google', 'facebook', 'twitter', 'github'].includes(provider);
};

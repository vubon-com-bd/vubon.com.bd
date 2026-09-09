export const ssoConfig = {
  enabled: true,
  providers: {
    google: {
      enabled: true,
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
      redirectUri: process.env.GOOGLE_REDIRECT_URI || '/auth/google/callback',
      scope: ['email', 'profile'],
    },
    facebook: {
      enabled: true,
      clientId: process.env.FACEBOOK_CLIENT_ID || '',
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET || '',
      redirectUri: process.env.FACEBOOK_REDIRECT_URI || '/auth/facebook/callback',
      scope: ['email', 'public_profile'],
    },
    github: {
      enabled: true,
      clientId: process.env.GITHUB_CLIENT_ID || '',
      clientSecret: process.env.GITHUB_CLIENT_SECRET || '',
      redirectUri: process.env.GITHUB_REDIRECT_URI || '/auth/github/callback',
      scope: ['user:email'],
    },
  },
};

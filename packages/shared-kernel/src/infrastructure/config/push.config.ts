export interface PushConfig {
  provider: 'fcm' | 'apns' | 'webpush';
  apiKey: string;
  projectId?: string;
  privateKey?: string;
  clientEmail?: string;
  teamId?: string;
  keyId?: string;
  bundleId?: string;
  vapidPublicKey?: string;
  vapidPrivateKey?: string;
  sandbox: boolean;
}

export const getPushConfig = (): PushConfig => ({
  provider: (process.env.PUSH_PROVIDER as PushConfig['provider']) || 'fcm',
  apiKey: process.env.PUSH_API_KEY || '',
  projectId: process.env.PUSH_PROJECT_ID,
  privateKey: process.env.PUSH_PRIVATE_KEY,
  clientEmail: process.env.PUSH_CLIENT_EMAIL,
  teamId: process.env.PUSH_TEAM_ID,
  keyId: process.env.PUSH_KEY_ID,
  bundleId: process.env.PUSH_BUNDLE_ID,
  vapidPublicKey: process.env.PUSH_VAPID_PUBLIC_KEY,
  vapidPrivateKey: process.env.PUSH_VAPID_PRIVATE_KEY,
  sandbox: process.env.PUSH_SANDBOX === 'true',
});

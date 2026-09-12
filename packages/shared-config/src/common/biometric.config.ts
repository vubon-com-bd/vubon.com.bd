import { AUTH_BIOMETRIC } from '@vubon/shared-constants/src/auth/auth-biometric.constants';

export const biometricConfig = {
  enabled: true,
  methods: Object.values(AUTH_BIOMETRIC),
  fingerprint: { enabled: true, threshold: 0.8 },
  face: { enabled: true, threshold: 0.85 },
  voice: { enabled: false, threshold: 0.8 },
  iris: { enabled: false, threshold: 0.9 },
} as const;

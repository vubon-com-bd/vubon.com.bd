/**
 * Biometric Configuration
 * বায়োমেট্রিক কনফিগারেশন
 */
export interface BiometricConfig {
  enabled: boolean;
  methods: {
    fingerprint: boolean;
    faceId: boolean;
    voice: boolean;
    iris: boolean;
  };
  storage: {
    type: 'local' | 'secure_enclave' | 'trusted_execution';
    encryptData: boolean;
    saltRounds: number;
  };
  verification: {
    threshold: number;
    maxAttempts: number;
    lockoutDuration: number;
  };
  fallback: {
    enabled: boolean;
    methods: string[];
  };
}

export const createBiometricConfig = (): BiometricConfig => ({
  enabled: true,
  methods: {
    fingerprint: true,
    faceId: true,
    voice: false,
    iris: false,
  },
  storage: {
    type: 'secure_enclave',
    encryptData: true,
    saltRounds: 10,
  },
  verification: {
    threshold: 0.8,
    maxAttempts: 3,
    lockoutDuration: 30 * 60 * 1000, // 30 minutes
  },
  fallback: {
    enabled: true,
    methods: ['password', '2fa'],
  },
});

export const biometricConfig = {
  enabled: true,
  methods: ['fingerprint', 'face', 'voice', 'iris'],
  fingerprint: {
    enabled: true,
    threshold: 0.8,
  },
  face: {
    enabled: true,
    threshold: 0.85,
  },
  voice: {
    enabled: false,
    threshold: 0.8,
  },
  iris: {
    enabled: false,
    threshold: 0.9,
  },
};

export const validateBiometricData = (_data: unknown): boolean => {
  // Implementation for biometric data validation
  return true;
};

export const validateBiometricType = (type: string): boolean => {
  return ['fingerprint', 'face', 'voice', 'iris'].includes(type);
};

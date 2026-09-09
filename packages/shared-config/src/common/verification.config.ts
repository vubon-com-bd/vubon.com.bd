export const verificationConfig = {
  email: {
    enabled: true,
    codeLength: 6,
    expiryMinutes: 15,
    maxAttempts: 5,
  },
  phone: {
    enabled: true,
    codeLength: 6,
    expiryMinutes: 10,
    maxAttempts: 5,
  },
  document: {
    enabled: true,
    maxSize: 5 * 1024 * 1024, // 5 MB
    allowedTypes: ['pdf', 'jpg', 'jpeg', 'png'],
  },
};

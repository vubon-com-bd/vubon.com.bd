/**
 * Test Fixtures — static test data
 * @module identity-service/test/helpers
 */

export const FIXTURES = {
  validUser: {
    password: 'SecureP@ss123',
    firstName: 'Test',
    lastName: 'User',
    acceptTerms: true,
  },

  invalidEmail: 'not-an-email',
  shortPassword: 'weak',
  weakPassword: '12345678',

  validAddress: {
    type: 'home',
    fullName: 'Test User',
    phone: '+8801712345678',
    addressLine1: 'House 12, Road 5, Dhanmondi',
    city: 'Dhaka',
    state: 'Dhaka',
    division: 'dhaka',
    district: 'dhaka',
    postalCode: '1205',
    country: 'BD',
  },

  validContact: {
    type: 'email',
    value: 'secondary@example.com',
    isPrimary: false,
  },

  validProfileUpdate: {
    firstName: 'Updated',
    lastName: 'Name',
    bio: 'This is a test bio.',
  },

  validSettingsUpdate: {
    theme: 'dark',
    language: 'en',
    timezone: 'Asia/Dhaka',
  },
} as const;

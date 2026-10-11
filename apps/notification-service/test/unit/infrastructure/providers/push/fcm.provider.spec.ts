/**
 * Unit tests for FcmPushProvider
 * @module notification-service/test/unit/infrastructure/providers/push
 */
import { describe, it, expect, beforeEach, afterEach } from '@jest/globals';
import { FcmPushProvider } from '../../../../../src/module/infrastructure/providers/push/fcm.provider.js';
import {
  setupFetchMock,
  teardownFetchMock,
  mockFetchOnce,
  getFetchCalls,
} from '../helpers/mock-fetch.js';

// Generate a valid RSA private key for tests (throwaway)
const TEST_RSA_KEY = `-----BEGIN PRIVATE KEY-----
MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDFakeFakeKeyForTest
-----END PRIVATE KEY-----`;

// Use a valid fake service account JSON — signing will be tested separately
const ENABLED_CONFIG = {
  enabled: true,
  projectId: 'test-project',
  clientEmail: 'test@test.iam.gserviceaccount.com',
  privateKey: '',
  serviceAccountJson: '',
  timeoutMs: 15000,
  maxRetries: 3,
};

describe('FcmPushProvider', () => {
  let provider: FcmPushProvider;

  beforeEach(() => {
    setupFetchMock();
  });

  afterEach(() => {
    teardownFetchMock();
  });

  describe('when disabled', () => {
    beforeEach(() => {
      provider = new FcmPushProvider({
        enabled: false,
        projectId: '',
        clientEmail: '',
        privateKey: '',
        serviceAccountJson: '',
      } as never);
    });

    it('isEnabled returns false', () => {
      expect(provider.isEnabled()).toBe(false);
    });

    it('health reports not configured', async () => {
      const health = await provider.health();
      expect(health.healthy).toBe(false);
      expect(health.enabled).toBe(false);
    });

    it('send returns PROVIDER_DISABLED', async () => {
      const result = await provider.send({
        token: 'token',
        title: 'x',
        body: 'y',
      });
      expect(result.errorCode).toBe('PROVIDER_DISABLED');
    });
  });

  describe('with malformed service account', () => {
    it('isEnabled returns false for invalid JSON', () => {
      const p = new FcmPushProvider({
        ...ENABLED_CONFIG,
        serviceAccountJson: 'not-valid-json',
      } as never);
      expect(p.isEnabled()).toBe(false);
    });
  });

  describe('with valid-looking service account', () => {
    it('has correct name and channel', () => {
      const p = new FcmPushProvider(ENABLED_CONFIG as never);
      expect(p.name).toBe('fcm');
      expect(p.channel).toBe('push');
    });

    it('isEnabled true when serviceAccountJson parses', () => {
      const p = new FcmPushProvider({
        ...ENABLED_CONFIG,
        serviceAccountJson: JSON.stringify({
          type: 'service_account',
          project_id: 'test',
          client_email: 'test@example.com',
          private_key: TEST_RSA_KEY,
          token_uri: 'https://oauth2.googleapis.com/token',
        }),
      } as never);
      // isEnabled checks it's a valid JSON parse — even if the key is fake
      expect(p.isEnabled()).toBe(true);
    });
  });
});

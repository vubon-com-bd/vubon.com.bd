/**
 * Infrastructure Config — combined Unit Test
 */
import { USER_CONFIG } from '@infrastructure/config/user.config';
import { PROFILE_CONFIG } from '@infrastructure/config/profile.config';
import { ADDRESS_CONFIG } from '@infrastructure/config/address.config';
import { CONTACT_CONFIG } from '@infrastructure/config/contact.config';
import { PREFERENCES_CONFIG } from '@infrastructure/config/preferences.config';
import { KYC_CONFIG } from '@infrastructure/config/kyc.config';
import { ACTIVITY_CONFIG } from '@infrastructure/config/activity.config';
import { AVATAR_CONFIG } from '@infrastructure/config/avatar.config';

describe('Infrastructure Configs', () => {
  it('USER_CONFIG has expected defaults', () => {
    expect(USER_CONFIG.maxProfiles).toBeGreaterThan(0);
    expect(USER_CONFIG.maxAddresses).toBeGreaterThan(0);
    expect(USER_CONFIG.maxContacts).toBeGreaterThan(0);
    expect(USER_CONFIG.profileCompletionThreshold).toBeGreaterThan(0);
    expect(typeof USER_CONFIG.defaultTimezone).toBe('string');
  });

  it('PROFILE_CONFIG has limits', () => {
    expect(PROFILE_CONFIG.bioMaxLength).toBeGreaterThan(0);
    expect(PROFILE_CONFIG.nameMaxLength).toBeGreaterThan(0);
  });

  it('ADDRESS_CONFIG has limits', () => {
    expect(ADDRESS_CONFIG.maxAddresses).toBeGreaterThan(0);
    expect(ADDRESS_CONFIG.postalCodeLength).toBe(4);
  });

  it('CONTACT_CONFIG has limits', () => {
    expect(CONTACT_CONFIG.maxContacts).toBeGreaterThan(0);
    expect(CONTACT_CONFIG.maxEmails).toBeGreaterThan(0);
  });

  it('PREFERENCES_CONFIG has defaults', () => {
    expect(PREFERENCES_CONFIG.defaultPageSize).toBeGreaterThan(0);
    expect(PREFERENCES_CONFIG.cacheTtl).toBeGreaterThan(0);
  });

  it('KYC_CONFIG has limits', () => {
    expect(KYC_CONFIG.maxDocuments).toBeGreaterThan(0);
    expect(KYC_CONFIG.expiryDays).toBeGreaterThan(0);
  });

  it('ACTIVITY_CONFIG has retention', () => {
    expect(ACTIVITY_CONFIG.retentionDays).toBeGreaterThan(0);
    expect(ACTIVITY_CONFIG.cleanupBatchSize).toBeGreaterThan(0);
  });

  it('AVATAR_CONFIG has limits', () => {
    expect(AVATAR_CONFIG.maxSizeMB).toBeGreaterThan(0);
    expect(AVATAR_CONFIG.allowedMimes.length).toBeGreaterThan(0);
    expect(AVATAR_CONFIG.maxWidthPx).toBeGreaterThan(0);
  });

  it('configs are frozen (immutable)', () => {
    expect(Object.isFrozen(USER_CONFIG)).toBe(true);
    expect(Object.isFrozen(PROFILE_CONFIG)).toBe(true);
    expect(Object.isFrozen(KYC_CONFIG)).toBe(true);
  });
});

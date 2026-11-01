/**
 * Coverage gap-fill — Command/Query handlers extra branches
 * @module identity-service/test/unit/application
 */
import { describe, it, expect, beforeEach } from '@jest/globals';

import { GetAuthSessionHandler } from '@application/queries/auth/get-auth-session.handler.js';
import { GetUserProfileHandler } from '@application/queries/user/get-user-profile.handler.js';
import { GetUserSettingsHandler } from '@application/queries/user/get-user-settings.handler.js';
import { GetUserPreferencesHandler } from '@application/queries/user/get-user-preferences.handler.js';
import { ListUserAddressesHandler } from '@application/queries/user/list-user-addresses.handler.js';
import { ListUserContactsHandler } from '@application/queries/user/list-user-contacts.handler.js';
import { GetUserKycStatusHandler } from '@application/queries/user/get-user-kyc-status.handler.js';
import { ListUserActivitiesHandler } from '@application/queries/user/list-user-activities.handler.js';
import { ListUserPermissionsHandler } from '@application/queries/user/list-user-permissions.handler.js';

import {
  makeAuthSessionServiceMock, makeUserProfileServiceMock, makeUserSettingsServiceMock,
  makeUserPreferencesServiceMock, makeUserAddressServiceMock, makeUserContactServiceMock,
  makeUserKycServiceMock, makeUserActivityServiceMock, makeUserPermissionServiceMock,
  makeGetAuthSessionQuery, makeGetUserProfileQuery, GetUserSettingsQuery, GetUserPreferencesQuery,
  ListUserAddressesQuery, ListUserContactsQuery, GetUserKycStatusQuery, ListUserActivitiesQuery,
  ListUserPermissionsQuery,
  TEST_IDS,
} from '@fixtures/index.js';

describe('Application Gap-Fill — Handlers', () => {
  it('GetAuthSessionHandler returns DTO when found', async () => {
    const s = makeAuthSessionServiceMock();
    s.findById.mockResolvedValue({ id: TEST_IDS.SESSION_ID, userId: TEST_IDS.USER_ID, status: 'active' } as never);
    const h = new GetAuthSessionHandler(s as never);
    const r = await h.execute(makeGetAuthSessionQuery());
    expect(r.id).toBe(TEST_IDS.SESSION_ID);
  });

  it('GetUserProfileHandler returns profile when found', async () => {
    const s = makeUserProfileServiceMock();
    s.findForUser.mockResolvedValue({ userId: TEST_IDS.USER_ID, bio: 'x' } as never);
    const h = new GetUserProfileHandler(s as never);
    const r = await h.execute(makeGetUserProfileQuery());
    expect(r?.userId).toBe(TEST_IDS.USER_ID);
  });

  it('GetUserSettingsHandler returns settings when found', async () => {
    const s = makeUserSettingsServiceMock();
    s.findForUser.mockResolvedValue({ userId: TEST_IDS.USER_ID, theme: 'dark' } as never);
    const h = new GetUserSettingsHandler(s as never);
    const r = await h.execute(new GetUserSettingsQuery(TEST_IDS.USER_ID));
    expect(r?.userId).toBe(TEST_IDS.USER_ID);
  });

  it('GetUserPreferencesHandler returns prefs when found', async () => {
    const s = makeUserPreferencesServiceMock();
    s.findForUser.mockResolvedValue({ userId: TEST_IDS.USER_ID, emailNotifications: true } as never);
    const h = new GetUserPreferencesHandler(s as never);
    const r = await h.execute(new GetUserPreferencesQuery(TEST_IDS.USER_ID));
    expect(r?.userId).toBe(TEST_IDS.USER_ID);
  });

  it('ListUserAddressesHandler returns items', async () => {
    const s = makeUserAddressServiceMock();
    s.listForUser.mockResolvedValue([{ id: TEST_IDS.ADDRESS_ID }] as never);
    const h = new ListUserAddressesHandler(s as never);
    const r = await h.execute(new ListUserAddressesQuery(TEST_IDS.USER_ID));
    expect(r.length).toBe(1);
  });

  it('ListUserContactsHandler returns items', async () => {
    const s = makeUserContactServiceMock();
    s.listForUser.mockResolvedValue([{ id: TEST_IDS.CONTACT_ID }] as never);
    const h = new ListUserContactsHandler(s as never);
    const r = await h.execute(new ListUserContactsQuery(TEST_IDS.USER_ID));
    expect(r.length).toBe(1);
  });

  it('GetUserKycStatusHandler returns kyc', async () => {
    const s = makeUserKycServiceMock();
    s.findForUser.mockResolvedValue({ id: TEST_IDS.KYC_ID, status: 'pending' } as never);
    const h = new GetUserKycStatusHandler(s as never);
    const r = await h.execute(new GetUserKycStatusQuery(TEST_IDS.USER_ID));
    expect(r?.id).toBe(TEST_IDS.KYC_ID);
  });

  it('ListUserActivitiesHandler returns items', async () => {
    const s = makeUserActivityServiceMock();
    s.listForUser.mockResolvedValue([{ id: 'a1' }] as never);
    const h = new ListUserActivitiesHandler(s as never);
    const r = await h.execute(new ListUserActivitiesQuery(TEST_IDS.USER_ID));
    expect(r.length).toBe(1);
  });

  it('ListUserPermissionsHandler returns items', async () => {
    const s = makeUserPermissionServiceMock();
    s.listForUser.mockResolvedValue([{ permission: 'x:y' }] as never);
    const h = new ListUserPermissionsHandler(s as never);
    const r = await h.execute(new ListUserPermissionsQuery(TEST_IDS.USER_ID));
    expect(r.length).toBe(1);
  });
});

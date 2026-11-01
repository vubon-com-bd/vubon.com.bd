/**
 * Query Fixtures for Application Layer tests
 * @module identity-service/test/fixtures/application
 */
import { GetUserQuery } from '@application/queries/user/get-user.query.js';
import { ListUsersQuery } from '@application/queries/user/list-users.query.js';
import { GetAuthSessionQuery } from '@application/queries/auth/get-auth-session.query.js';
import { ListAuthSessionsQuery } from '@application/queries/auth/list-auth-sessions.query.js';
import { ListAuthDevicesQuery } from '@application/queries/auth/list-auth-devices.query.js';
import { GetUserProfileQuery } from '@application/queries/user/get-user-profile.query.js';
import { ListUserRolesQuery } from '@application/queries/user/list-user-roles.query.js';
import { GetUserSettingsQuery } from '@application/queries/user/get-user-settings.query.js';
import { GetUserPreferencesQuery } from '@application/queries/user/get-user-preferences.query.js';
import { ListUserAddressesQuery } from '@application/queries/user/list-user-addresses.query.js';
import { ListUserContactsQuery } from '@application/queries/user/list-user-contacts.query.js';
import { GetUserKycStatusQuery } from '@application/queries/user/get-user-kyc-status.query.js';
import { ListUserActivitiesQuery } from '@application/queries/user/list-user-activities.query.js';
import { ListUserPermissionsQuery } from '@application/queries/user/list-user-permissions.query.js';
import { TEST_IDS } from '../ids.fixture.js';

export const makeGetUserQuery = (userId: string = TEST_IDS.USER_ID): GetUserQuery =>
  new GetUserQuery(userId);

export const makeListUsersQuery = (page = 1, limit = 20): ListUsersQuery =>
  new ListUsersQuery(page, limit);

export const makeGetAuthSessionQuery = (sessionId: string = TEST_IDS.SESSION_ID): GetAuthSessionQuery =>
  new GetAuthSessionQuery(sessionId);

export const makeListAuthSessionsQuery = (userId: string = TEST_IDS.USER_ID): ListAuthSessionsQuery =>
  new ListAuthSessionsQuery(userId);

export const makeListAuthDevicesQuery = (userId: string = TEST_IDS.USER_ID): ListAuthDevicesQuery =>
  new ListAuthDevicesQuery(userId);

export const makeGetUserProfileQuery = (userId: string = TEST_IDS.USER_ID): GetUserProfileQuery =>
  new GetUserProfileQuery(userId);

export const makeListUserRolesQuery = (userId: string = TEST_IDS.USER_ID): ListUserRolesQuery =>
  new ListUserRolesQuery(userId);

// ─── Re-exports for gap-fill specs ───
export {
  GetUserSettingsQuery,
  GetUserPreferencesQuery,
  ListUserAddressesQuery,
  ListUserContactsQuery,
  GetUserKycStatusQuery,
  ListUserActivitiesQuery,
  ListUserPermissionsQuery,
};

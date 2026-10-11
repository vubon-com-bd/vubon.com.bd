/**
 * Shared mock service builders
 */
import { jest } from '@jest/globals';

export function makeEventBridge() {
  return {
    publishInProcess: jest.fn(),
    publish: jest.fn().mockResolvedValue(undefined),
    publishBatch: jest.fn().mockResolvedValue(undefined),
    publishFromEntity: jest.fn().mockResolvedValue(undefined),
  };
}

export function makeNotificationRepo() {
  return {
    findById: jest.fn().mockResolvedValue(null),
    findByIdVO: jest.fn().mockResolvedValue(null),
    findAll: jest.fn().mockResolvedValue([]),
    findByUserId: jest.fn().mockResolvedValue([]),
    findByStatus: jest.fn().mockResolvedValue([]),
    findByChannel: jest.fn().mockResolvedValue([]),
    findByType: jest.fn().mockResolvedValue([]),
    findByCategory: jest.fn().mockResolvedValue([]),
    findByReadStatus: jest.fn().mockResolvedValue([]),
    findUnreadByUserId: jest.fn().mockResolvedValue([]),
    findByReference: jest.fn().mockResolvedValue([]),
    findPaginated: jest.fn().mockResolvedValue({
      items: [], total: 0, page: 1, limit: 20, totalPages: 0,
    }),
    countUnread: jest.fn().mockResolvedValue(0),
    getStats: jest.fn().mockResolvedValue({
      total: 0, unread: 0, byChannel: {}, byStatus: {}, byCategory: {},
    }),
    findStalePending: jest.fn().mockResolvedValue([]),
    findDueScheduled: jest.fn().mockResolvedValue([]),
    findRetryable: jest.fn().mockResolvedValue([]),
    findExpired: jest.fn().mockResolvedValue([]),
    save: jest.fn().mockImplementation(async (e: unknown) => e),
    delete: jest.fn().mockResolvedValue(undefined),
    softDelete: jest.fn().mockResolvedValue(undefined),
    exists: jest.fn().mockResolvedValue(false),
    markAllReadForUser: jest.fn().mockResolvedValue(0),
  };
}

export function makePreferenceRepo() {
  return {
    findById: jest.fn().mockResolvedValue(null),
    findByIdVO: jest.fn().mockResolvedValue(null),
    findAll: jest.fn().mockResolvedValue([]),
    findByUserId: jest.fn().mockResolvedValue(null),
    existsByUserId: jest.fn().mockResolvedValue(false),
    findUserIdsOptedOutOf: jest.fn().mockResolvedValue([]),
    save: jest.fn().mockImplementation(async (e: unknown) => e),
    delete: jest.fn().mockResolvedValue(undefined),
    exists: jest.fn().mockResolvedValue(false),
  };
}

export function makeTemplateRepo() {
  return {
    findById: jest.fn().mockResolvedValue(null),
    findByIdVO: jest.fn().mockResolvedValue(null),
    findAll: jest.fn().mockResolvedValue([]),
    findBySlug: jest.fn().mockResolvedValue(null),
    findBySlugAndLocale: jest.fn().mockResolvedValue(null),
    findByType: jest.fn().mockResolvedValue([]),
    findByStatus: jest.fn().mockResolvedValue([]),
    findByCategory: jest.fn().mockResolvedValue([]),
    findByLocale: jest.fn().mockResolvedValue([]),
    findActiveBySlug: jest.fn().mockResolvedValue(null),
    findPaginated: jest.fn().mockResolvedValue({
      items: [], total: 0, page: 1, limit: 20, totalPages: 0,
    }),
    existsBySlug: jest.fn().mockResolvedValue(false),
    save: jest.fn().mockImplementation(async (e: unknown) => e),
    delete: jest.fn().mockResolvedValue(undefined),
    exists: jest.fn().mockResolvedValue(false),
  };
}

export function makeScheduleRepo() {
  return {
    findById: jest.fn().mockResolvedValue(null),
    findByIdVO: jest.fn().mockResolvedValue(null),
    findAll: jest.fn().mockResolvedValue([]),
    findByUserId: jest.fn().mockResolvedValue([]),
    findByStatus: jest.fn().mockResolvedValue([]),
    findByType: jest.fn().mockResolvedValue([]),
    findPaginated: jest.fn().mockResolvedValue({
      items: [], total: 0, page: 1, limit: 20, totalPages: 0,
    }),
    findDue: jest.fn().mockResolvedValue([]),
    findUpcoming: jest.fn().mockResolvedValue([]),
    save: jest.fn().mockImplementation(async (e: unknown) => e),
    delete: jest.fn().mockResolvedValue(undefined),
    exists: jest.fn().mockResolvedValue(false),
  };
}

export function makeBroadcastRepo() {
  return {
    findById: jest.fn().mockResolvedValue(null),
    findByIdVO: jest.fn().mockResolvedValue(null),
    findAll: jest.fn().mockResolvedValue([]),
    findByStatus: jest.fn().mockResolvedValue([]),
    findByType: jest.fn().mockResolvedValue([]),
    findPaginated: jest.fn().mockResolvedValue({
      items: [], total: 0, page: 1, limit: 20, totalPages: 0,
    }),
    findDueScheduled: jest.fn().mockResolvedValue([]),
    findStaleSending: jest.fn().mockResolvedValue([]),
    save: jest.fn().mockImplementation(async (e: unknown) => e),
    delete: jest.fn().mockResolvedValue(undefined),
    exists: jest.fn().mockResolvedValue(false),
  };
}

export function makeDigestRepo() {
  return {
    findById: jest.fn().mockResolvedValue(null),
    findByIdVO: jest.fn().mockResolvedValue(null),
    findAll: jest.fn().mockResolvedValue([]),
    findByUserId: jest.fn().mockResolvedValue([]),
    findByStatus: jest.fn().mockResolvedValue([]),
    findByFrequency: jest.fn().mockResolvedValue([]),
    findLatestByUserId: jest.fn().mockResolvedValue(null),
    findPaginated: jest.fn().mockResolvedValue({
      items: [], total: 0, page: 1, limit: 20, totalPages: 0,
    }),
    findReadyToSend: jest.fn().mockResolvedValue([]),
    save: jest.fn().mockImplementation(async (e: unknown) => e),
    delete: jest.fn().mockResolvedValue(undefined),
    exists: jest.fn().mockResolvedValue(false),
  };
}

export function makeDeviceRepo() {
  return {
    findById: jest.fn().mockResolvedValue(null),
    findByIdVO: jest.fn().mockResolvedValue(null),
    findAll: jest.fn().mockResolvedValue([]),
    findByUserId: jest.fn().mockResolvedValue([]),
    findActiveByUserId: jest.fn().mockResolvedValue([]),
    findByStatus: jest.fn().mockResolvedValue([]),
    findByToken: jest.fn().mockResolvedValue(null),
    findPaginated: jest.fn().mockResolvedValue({
      items: [], total: 0, page: 1, limit: 20, totalPages: 0,
    }),
    countByUserId: jest.fn().mockResolvedValue(0),
    existsByToken: jest.fn().mockResolvedValue(false),
    findStale: jest.fn().mockResolvedValue([]),
    save: jest.fn().mockImplementation(async (e: unknown) => e),
    delete: jest.fn().mockResolvedValue(undefined),
    exists: jest.fn().mockResolvedValue(false),
  };
}

export function makeWebhookRepo() {
  return {
    findById: jest.fn().mockResolvedValue(null),
    findByIdVO: jest.fn().mockResolvedValue(null),
    findAll: jest.fn().mockResolvedValue([]),
    findByStatus: jest.fn().mockResolvedValue([]),
    findByEvent: jest.fn().mockResolvedValue([]),
    findPaginated: jest.fn().mockResolvedValue({
      items: [], total: 0, page: 1, limit: 20, totalPages: 0,
    }),
    findAllActive: jest.fn().mockResolvedValue([]),
    countActive: jest.fn().mockResolvedValue(0),
    findWithHighFailureCount: jest.fn().mockResolvedValue([]),
    save: jest.fn().mockImplementation(async (e: unknown) => e),
    delete: jest.fn().mockResolvedValue(undefined),
    exists: jest.fn().mockResolvedValue(false),
  };
}

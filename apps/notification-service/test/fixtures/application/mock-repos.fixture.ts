import { jest } from '@jest/globals';

function baseMock() {
  return {
    findById: jest.fn(),
    findAll: jest.fn(),
    save: jest.fn(),
    delete: jest.fn(),
    exists: jest.fn(),
  };
}

export function createMockNotificationRepo() {
  return {
    ...baseMock(),
    findByIdVO: jest.fn(),
    findByUser: jest.fn(),
    findByStatus: jest.fn(),
    findByChannel: jest.fn(),
    findPaginated: jest.fn(),
    findUnreadForUser: jest.fn(),
    findScheduledBefore: jest.fn(),
    findExpiredBefore: jest.fn(),
    findStale: jest.fn(),
    findRetryable: jest.fn(),
    countUnreadForUser: jest.fn(),
    getStats: jest.fn(),
    markAllAsRead: jest.fn(),
    softDelete: jest.fn(),
    purgeOlderThan: jest.fn(),
  };
}

export function createMockTemplateRepo() {
  return {
    ...baseMock(),
    findByIdVO: jest.fn(),
    findBySlug: jest.fn(),
    findByName: jest.fn(),
    findByType: jest.fn(),
    findByStatus: jest.fn(),
    findActiveByTypeAndLocale: jest.fn(),
    findPaginated: jest.fn(),
    findWithMissingSubject: jest.fn(),
    findByParent: jest.fn(),
    countBySlug: jest.fn(),
    getStats: jest.fn(),
    softDelete: jest.fn(),
  };
}

export function createMockScheduleRepo() {
  return {
    ...baseMock(),
    findByIdVO: jest.fn(),
    findByStatus: jest.fn(),
    findByCreator: jest.fn(),
    findPaginated: jest.fn(),
    findDue: jest.fn(),
    findPendingRuns: jest.fn(),
    countActive: jest.fn(),
    getStats: jest.fn(),
    softDelete: jest.fn(),
    purgeCompletedOlderThan: jest.fn(),
  };
}

export function createMockBroadcastRepo() {
  return {
    ...baseMock(),
    findByIdVO: jest.fn(),
    findByStatus: jest.fn(),
    findByCreator: jest.fn(),
    findPaginated: jest.fn(),
    findDue: jest.fn(),
    findInProgress: jest.fn(),
    findPendingApproval: jest.fn(),
    countInProgress: jest.fn(),
    getStats: jest.fn(),
    softDelete: jest.fn(),
    purgeCompletedOlderThan: jest.fn(),
  };
}

export function createMockDigestRepo() {
  return {
    ...baseMock(),
    findByIdVO: jest.fn(),
    findByUser: jest.fn(),
    findByStatus: jest.fn(),
    findByFrequency: jest.fn(),
    findPaginated: jest.fn(),
    findPending: jest.fn(),
    findGenerating: jest.fn(),
    findReadyToSend: jest.fn(),
    findByUserAndPeriod: jest.fn(),
    findLatestForUser: jest.fn(),
    countPending: jest.fn(),
    getStats: jest.fn(),
    softDelete: jest.fn(),
    purgeOlderThan: jest.fn(),
  };
}

export function createMockPreferenceRepo() {
  return {
    ...baseMock(),
    findByIdVO: jest.fn(),
    findByUser: jest.fn(),
    findLocked: jest.fn(),
    findByTimezone: jest.fn(),
    findPaginated: jest.fn(),
    findByQuietHoursActive: jest.fn(),
    countLocked: jest.fn(),
    getStats: jest.fn(),
    softDelete: jest.fn(),
  };
}

export function createMockDeviceRepo() {
  return {
    ...baseMock(),
    findByIdVO: jest.fn(),
    findByUser: jest.fn(),
    findByToken: jest.fn(),
    findByStatus: jest.fn(),
    findByPlatform: jest.fn(),
    findPaginated: jest.fn(),
    findStale: jest.fn(),
    findBlocked: jest.fn(),
    findActiveForUser: jest.fn(),
    countForUser: jest.fn(),
    countActiveForUser: jest.fn(),
    getStats: jest.fn(),
    softDelete: jest.fn(),
    purgeUnregisteredOlderThan: jest.fn(),
  };
}

export function createMockWebhookRepo() {
  return {
    ...baseMock(),
    findByIdVO: jest.fn(),
    findByUrl: jest.fn(),
    findByStatus: jest.fn(),
    findByEvent: jest.fn(),
    findActiveSubscribers: jest.fn(),
    findPaginated: jest.fn(),
    countActive: jest.fn(),
    getStats: jest.fn(),
    softDelete: jest.fn(),
    purgeDisabledOlderThan: jest.fn(),
  };
}

export function createMockEventBridge() {
  return {
    publishFromEntity: jest.fn().mockResolvedValue(undefined),
    publish: jest.fn().mockResolvedValue(undefined),
    publishBatch: jest.fn().mockResolvedValue(undefined),
  };
}

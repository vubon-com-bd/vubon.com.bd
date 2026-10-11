/**
 * Mock repositories — jest.Mock-based stubs for domain repositories
 * @module notification-service/test/helpers
 */
export function createMockRepository<T extends object>() {
  return {
    findById: jest.fn<Promise<T | null>, [string]>().mockResolvedValue(null),
    findAll: jest.fn<Promise<readonly T[]>, []>().mockResolvedValue([]),
    save: jest.fn<Promise<T>, [T]>().mockImplementation(async (e: T) => e),
    delete: jest.fn<Promise<void>, [string]>().mockResolvedValue(undefined),
    exists: jest.fn<Promise<boolean>, [string]>().mockResolvedValue(false),
  };
}

export function createMockNotificationRepository() {
  return {
    ...createMockRepository(),
    findByIdVO: jest.fn().mockResolvedValue(null),
    findByUserId: jest.fn().mockResolvedValue([]),
    findByStatus: jest.fn().mockResolvedValue([]),
    findByChannel: jest.fn().mockResolvedValue([]),
    findByType: jest.fn().mockResolvedValue([]),
    findByCategory: jest.fn().mockResolvedValue([]),
    findByReadStatus: jest.fn().mockResolvedValue([]),
    findUnreadByUserId: jest.fn().mockResolvedValue([]),
    findByReference: jest.fn().mockResolvedValue([]),
    findPaginated: jest.fn().mockResolvedValue({
      items: [],
      total: 0,
      page: 1,
      limit: 20,
      totalPages: 0,
    }),
    countUnread: jest.fn().mockResolvedValue(0),
    getStats: jest.fn().mockResolvedValue({
      total: 0,
      unread: 0,
      byChannel: {},
      byStatus: {},
      byCategory: {},
    }),
    findStalePending: jest.fn().mockResolvedValue([]),
    findDueScheduled: jest.fn().mockResolvedValue([]),
    findRetryable: jest.fn().mockResolvedValue([]),
    findExpired: jest.fn().mockResolvedValue([]),
    softDelete: jest.fn().mockResolvedValue(undefined),
    markAllReadForUser: jest.fn().mockResolvedValue(0),
  };
}

export function createMockTemplateRepository() {
  return {
    ...createMockRepository(),
    findByIdVO: jest.fn().mockResolvedValue(null),
    findBySlug: jest.fn().mockResolvedValue(null),
    findBySlugAndLocale: jest.fn().mockResolvedValue(null),
    findByType: jest.fn().mockResolvedValue([]),
    findByStatus: jest.fn().mockResolvedValue([]),
    findByCategory: jest.fn().mockResolvedValue([]),
    findByLocale: jest.fn().mockResolvedValue([]),
    findActiveBySlug: jest.fn().mockResolvedValue(null),
    findPaginated: jest.fn().mockResolvedValue({
      items: [],
      total: 0,
      page: 1,
      limit: 20,
      totalPages: 0,
    }),
    existsBySlug: jest.fn().mockResolvedValue(false),
  };
}

export function createMockPreferenceRepository() {
  return {
    ...createMockRepository(),
    findByIdVO: jest.fn().mockResolvedValue(null),
    findByUserId: jest.fn().mockResolvedValue(null),
    existsByUserId: jest.fn().mockResolvedValue(false),
    findUserIdsOptedOutOf: jest.fn().mockResolvedValue([]),
  };
}

export function createMockDeviceRepository() {
  return {
    ...createMockRepository(),
    findByIdVO: jest.fn().mockResolvedValue(null),
    findByUserId: jest.fn().mockResolvedValue([]),
    findActiveByUserId: jest.fn().mockResolvedValue([]),
    findByStatus: jest.fn().mockResolvedValue([]),
    findByToken: jest.fn().mockResolvedValue(null),
    findPaginated: jest.fn().mockResolvedValue({
      items: [],
      total: 0,
      page: 1,
      limit: 20,
      totalPages: 0,
    }),
    countByUserId: jest.fn().mockResolvedValue(0),
    existsByToken: jest.fn().mockResolvedValue(false),
    findStale: jest.fn().mockResolvedValue([]),
  };
}

export function createMockEventBridge() {
  return {
    publishInProcess: jest.fn(),
    publish: jest.fn().mockResolvedValue(undefined),
    publishBatch: jest.fn().mockResolvedValue(undefined),
    publishFromEntity: jest.fn().mockResolvedValue(undefined),
  };
}

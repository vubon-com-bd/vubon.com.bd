/**
 * User Repository Mock — for handler unit tests
 * @module user-service/test/helpers
 */
import { jest } from '@jest/globals';

import type { UserRepository } from '@domain/repositories/user.repository.interface';
import type { UserEntity } from '@domain/entities/user.entity';

export function createUserRepositoryMock(): jest.Mocked<UserRepository> {
  return {
    findById: jest.fn().mockResolvedValue(null),
    findAll: jest.fn().mockResolvedValue([]),
    save: jest.fn().mockImplementation(async (user: UserEntity) => user),
    delete: jest.fn().mockResolvedValue(undefined),
    exists: jest.fn().mockResolvedValue(false),
    findByEmail: jest.fn().mockResolvedValue(null),
    existsByEmail: jest.fn().mockResolvedValue(false),
    findByStatus: jest.fn().mockResolvedValue([]),
    findByType: jest.fn().mockResolvedValue([]),
    findPaginated: jest.fn().mockResolvedValue({ items: [], total: 0 }),
    countByStatus: jest.fn().mockResolvedValue(0),
    softDelete: jest.fn().mockResolvedValue(undefined),
  } as unknown as jest.Mocked<UserRepository>;
}

export function createUserProfileRepositoryMock() {
  return {
    findById: jest.fn().mockResolvedValue(null),
    findAll: jest.fn().mockResolvedValue([]),
    save: jest.fn().mockImplementation(async (e) => e),
    delete: jest.fn().mockResolvedValue(undefined),
    exists: jest.fn().mockResolvedValue(false),
    findByUserId: jest.fn().mockResolvedValue(null),
    existsByUserId: jest.fn().mockResolvedValue(false),
    deleteByUserId: jest.fn().mockResolvedValue(undefined),
  };
}

export function createUserAddressRepositoryMock() {
  return {
    findById: jest.fn().mockResolvedValue(null),
    findAll: jest.fn().mockResolvedValue([]),
    save: jest.fn().mockImplementation(async (e) => e),
    delete: jest.fn().mockResolvedValue(undefined),
    exists: jest.fn().mockResolvedValue(false),
    findByUserId: jest.fn().mockResolvedValue([]),
    findDefaultByUserId: jest.fn().mockResolvedValue(null),
    countByUserId: jest.fn().mockResolvedValue(0),
    clearDefaultForUser: jest.fn().mockResolvedValue(undefined),
    existsById: jest.fn().mockResolvedValue(false),
  };
}

export function createUserKycRepositoryMock() {
  return {
    findById: jest.fn().mockResolvedValue(null),
    findAll: jest.fn().mockResolvedValue([]),
    save: jest.fn().mockImplementation(async (e) => e),
    delete: jest.fn().mockResolvedValue(undefined),
    exists: jest.fn().mockResolvedValue(false),
    findByUserId: jest.fn().mockResolvedValue(null),
    findAllByUserId: jest.fn().mockResolvedValue([]),
    findByStatus: jest.fn().mockResolvedValue([]),
    existsById: jest.fn().mockResolvedValue(false),
    latestForUser: jest.fn().mockResolvedValue(null),
  };
}

export function createUserContactRepositoryMock() {
  return {
    findById: jest.fn().mockResolvedValue(null),
    findAll: jest.fn().mockResolvedValue([]),
    save: jest.fn().mockImplementation(async (e) => e),
    delete: jest.fn().mockResolvedValue(undefined),
    exists: jest.fn().mockResolvedValue(false),
    findByUserId: jest.fn().mockResolvedValue([]),
    findByType: jest.fn().mockResolvedValue([]),
    findPrimaryByUserId: jest.fn().mockResolvedValue(null),
    countByUserId: jest.fn().mockResolvedValue(0),
    clearPrimaryForUser: jest.fn().mockResolvedValue(undefined),
    existsById: jest.fn().mockResolvedValue(false),
  };
}

export function createUserSettingsRepositoryMock() {
  return {
    findById: jest.fn().mockResolvedValue(null),
    findAll: jest.fn().mockResolvedValue([]),
    save: jest.fn().mockImplementation(async (e) => e),
    delete: jest.fn().mockResolvedValue(undefined),
    exists: jest.fn().mockResolvedValue(false),
    findByUserId: jest.fn().mockResolvedValue(null),
    existsByUserId: jest.fn().mockResolvedValue(false),
  };
}

export function createUserPreferencesRepositoryMock() {
  return {
    findById: jest.fn().mockResolvedValue(null),
    findAll: jest.fn().mockResolvedValue([]),
    save: jest.fn().mockImplementation(async (e) => e),
    delete: jest.fn().mockResolvedValue(undefined),
    exists: jest.fn().mockResolvedValue(false),
    findByUserId: jest.fn().mockResolvedValue(null),
    existsByUserId: jest.fn().mockResolvedValue(false),
  };
}

export function createUserActivityRepositoryMock() {
  return {
    findById: jest.fn().mockResolvedValue(null),
    findAll: jest.fn().mockResolvedValue([]),
    save: jest.fn().mockImplementation(async (e) => e),
    delete: jest.fn().mockResolvedValue(undefined),
    exists: jest.fn().mockResolvedValue(false),
    findByUserId: jest.fn().mockResolvedValue([]),
    findPaginated: jest.fn().mockResolvedValue({ items: [], total: 0 }),
    countByUserId: jest.fn().mockResolvedValue(0),
    latestByUserId: jest.fn().mockResolvedValue([]),
    deleteOlderThan: jest.fn().mockResolvedValue(0),
  };
}

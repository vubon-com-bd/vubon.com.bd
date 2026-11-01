/**
 * TemplateOwnerGuard Tests
 * @module notification-service/test/unit/interfaces/guards
 */
import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import type { ExecutionContext } from '@nestjs/common';
import { TemplateOwnerGuard } from '@interfaces/guards/template-owner.guard.js';

function buildContext(
  params: Record<string, string>,
  user?: { userId?: string; roles?: readonly string[] },
): ExecutionContext {
  return {
    switchToHttp: () => ({
      getRequest: () => ({ params, user }),
      getResponse: () => ({}),
      getNext: () => ({}),
    }),
    getHandler: () => () => undefined,
    getClass: () => class {},
    getArgs: () => [],
    getArgByIndex: () => undefined,
    getType: () => 'http' as never,
    switchToRpc: () => ({ getContext: () => ({}), getData: () => ({}), getMetadata: () => ({}) }),
    switchToWs: () => ({ getClient: () => ({}), getData: () => ({}), getPattern: () => '' }),
  } as unknown as ExecutionContext;
}

describe('TemplateOwnerGuard', () => {
  let mockFindById: jest.Mock<() => Promise<unknown>>;
  let guard: TemplateOwnerGuard;

  beforeEach(() => {
    mockFindById = jest.fn<() => Promise<unknown>>();
    const mockRepo = { findByIdVO: mockFindById };
    guard = new TemplateOwnerGuard(mockRepo as never);
  });

  it('returns true when no templateId', async () => {
    expect(await guard.canActivate(buildContext({}))).toBe(true);
  });

  it('throws when user missing', async () => {
    await expect(guard.canActivate(buildContext({ templateId: '22222222-2222-4222-8222-222222222222' }))).rejects.toThrow(
      'Authentication required',
    );
  });

  it('admin bypass', async () => {
    expect(
      await guard.canActivate(buildContext({ templateId: '22222222-2222-4222-8222-222222222222' }, { userId: 'u', roles: ['admin'] })),
    ).toBe(true);
  });

  it('throws when template not found', async () => {
    mockFindById.mockResolvedValueOnce(null);
    await expect(
      guard.canActivate(buildContext({ templateId: '22222222-2222-4222-8222-222222222222' }, { userId: 'u' })),
    ).rejects.toThrow('Template not found');
  });

  it('returns true for active template', async () => {
    mockFindById.mockResolvedValueOnce({
      isUsable: () => true,
      isDraft: () => false,
      status: 'active',
    });
    expect(
      await guard.canActivate(buildContext({ templateId: '22222222-2222-4222-8222-222222222222' }, { userId: 'u' })),
    ).toBe(true);
  });

  it('returns true for draft template', async () => {
    mockFindById.mockResolvedValueOnce({
      isUsable: () => false,
      isDraft: () => true,
      status: 'draft',
    });
    expect(
      await guard.canActivate(buildContext({ templateId: '22222222-2222-4222-8222-222222222222' }, { userId: 'u' })),
    ).toBe(true);
  });

  it('throws for archived template', async () => {
    mockFindById.mockResolvedValueOnce({
      isUsable: () => false,
      isDraft: () => false,
      status: 'archived',
    });
    await expect(
      guard.canActivate(buildContext({ templateId: '22222222-2222-4222-8222-222222222222' }, { userId: 'u' })),
    ).rejects.toThrow('Template status "archived" cannot be modified');
  });
});

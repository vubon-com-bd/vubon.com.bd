/**
 * Template API E2E Tests (lightweight)
 * @module notification-service/test/e2e/interfaces
 */
import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import type { CommandBus, QueryBus } from '@nestjs/cqrs';

// Mock validator
const mockV = jest.fn<() => void>(() => undefined);
jest.mock('@application/validators/template.validator.js', () => ({
  TemplateValidator: {
    validateCreate: mockV,
    validateUpdate: mockV,
    validateTest: mockV,
  },
}));

import { TemplateController } from '@interfaces/controllers/rest/template.controller.js';

const USER = { userId: '00000000-0000-4000-8000-000000000001' };
const TID = '22222222-2222-4222-8222-222222222222';

describe('Template API (e2e)', () => {
  let controller: TemplateController;
  let commandBus: { execute: jest.Mock };
  let queryBus: { execute: jest.Mock };

  beforeEach(() => {
    jest.clearAllMocks();
    commandBus = { execute: jest.fn() };
    queryBus = { execute: jest.fn() };
    controller = new TemplateController(
      commandBus as unknown as CommandBus,
      queryBus as unknown as QueryBus,
    );
  });

  it('POST /templates → 201 payload', async () => {
    commandBus.execute.mockResolvedValueOnce({
      id: TID,
      name: 'Welcome',
      slug: 'welcome',
      type: 'email',
      status: 'draft',
      category: 'auth',
      locale: 'en',
      body: 'Hi',
      variables: [],
      version: 1,
      createdAt: 'c',
      updatedAt: 'u',
    });

    const res = await controller.create(
      {
        name: 'Welcome',
        slug: 'welcome',
        type: 'email',
        category: 'auth',
        body: 'Hi {{name}}',
      } as never,
      USER,
    );
    expect(res.id).toBe(TID);
  });

  it('GET /templates returns paginated', async () => {
    queryBus.execute.mockResolvedValueOnce({
      items: [],
      total: 0,
      page: 1,
      limit: 20,
      totalPages: 0,
    });
    const res = await controller.list({});
    expect(res.total).toBe(0);
  });
});

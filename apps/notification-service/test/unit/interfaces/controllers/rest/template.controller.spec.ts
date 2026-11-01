/**
 * TemplateController Tests
 * @module notification-service/test/unit/interfaces/controllers/rest
 */
import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import type { CommandBus, QueryBus } from '@nestjs/cqrs';

// ─── Mock app validator (validated separately in validators tests) ───
const mockValidateCreate = jest.fn<() => void>();
const mockValidateUpdate = jest.fn<() => void>();
const mockValidateTest = jest.fn<() => void>();

jest.mock('@application/validators/template.validator.js', () => ({
  TemplateValidator: {
    validateCreate: mockValidateCreate,
    validateUpdate: mockValidateUpdate,
    validateTest: mockValidateTest,
  },
}));

import { TemplateController } from '@interfaces/controllers/rest/template.controller.js';

const USER = { userId: '00000000-0000-4000-8000-000000000001' };
const TEMPLATE_ID = '22222222-2222-4222-8222-222222222222';

describe('TemplateController', () => {
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

  describe('create', () => {
    it('validates + dispatches CreateTemplateCommand', async () => {
      mockValidateCreate.mockImplementationOnce(() => undefined);
      commandBus.execute.mockResolvedValueOnce({
        id: 't-1',
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

      const dto = {
        name: 'Welcome',
        slug: 'welcome',
        type: 'email',
        category: 'auth',
        body: 'Hi {{name}}',
      };
      const result = await controller.create(dto as never, USER);
      expect(mockValidateCreate).toHaveBeenCalledWith(dto);
      expect(result.id).toBe('t-1');
    });
  });

  describe('update', () => {
    it('validates + dispatches UpdateTemplateCommand', async () => {
      mockValidateUpdate.mockImplementationOnce(() => undefined);
      commandBus.execute.mockResolvedValueOnce({
        id: 't-1',
        name: 'Updated',
        slug: 'welcome',
        type: 'email',
        status: 'draft',
        category: 'auth',
        locale: 'en',
        body: 'New',
        variables: [],
        version: 2,
        createdAt: 'c',
        updatedAt: 'u',
      });

      const result = await controller.update(
        TEMPLATE_ID,
        { name: 'Updated' },
        USER,
      );
      expect(mockValidateUpdate).toHaveBeenCalledWith({ name: 'Updated' });
      expect(result.name).toBe('Updated');
    });
  });

  describe('test', () => {
    it('validates + dispatches TestTemplateCommand', async () => {
      mockValidateTest.mockImplementationOnce(() => undefined);
      commandBus.execute.mockResolvedValueOnce({
        templateId: 't-1',
        body: 'Hi John',
        missingVariables: [],
        renderedAt: '2026-01-01',
        locale: 'en',
      });

      const result = await controller.test(
        TEMPLATE_ID,
        { variables: { name: 'John' }, email: 'x@y.z' },
        USER,
      );
      expect(mockValidateTest).toHaveBeenCalled();
      expect(result.body).toBe('Hi John');
    });
  });

  describe('list', () => {
    it('dispatches ListTemplatesQuery', async () => {
      queryBus.execute.mockResolvedValueOnce({
        items: [],
        total: 0,
        page: 1,
        limit: 20,
        totalPages: 0,
      });

      const result = await controller.list({});
      expect(result.total).toBe(0);
    });
  });

  describe('getById', () => {
    it('dispatches GetTemplateQuery', async () => {
      queryBus.execute.mockResolvedValueOnce({
        id: 't-1',
        name: 'N',
        slug: 'n',
        type: 'email',
        status: 'draft',
        category: 'auth',
        locale: 'en',
        body: 'b',
        variables: [],
        version: 1,
        createdAt: 'c',
        updatedAt: 'u',
      });

      const result = await controller.getById(TEMPLATE_ID);
      expect(result.id).toBe('t-1');
    });
  });
});

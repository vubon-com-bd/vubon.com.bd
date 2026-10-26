/**
 * TemplateControllerMapper Tests
 * @module notification-service/test/unit/interfaces/mappers
 */
import { describe, expect, it } from '@jest/globals';
import { TemplateControllerMapper } from '@interfaces/mappers/template.controller.mapper.js';

describe('TemplateControllerMapper', () => {
  describe('toCreateRequestDTO', () => {
    it('converts template create DTO', () => {
      const http = {
        name: 'Welcome',
        slug: 'welcome',
        type: 'email',
        category: 'auth',
        body: 'Hi {{name}}',
        locale: 'en',
        variables: [
          { name: 'name', type: 'string', required: true },
        ],
      };
      const app = TemplateControllerMapper.toCreateRequestDTO(http as never);
      expect(app.name).toBe('Welcome');
      expect(app.variables).toHaveLength(1);
      expect(app.locale).toBe('en');
    });

    it('defaults locale to en', () => {
      const http = { name: 'x', slug: 'x', type: 'email', category: 'auth', body: 'x' };
      const app = TemplateControllerMapper.toCreateRequestDTO(http as never);
      expect(app.locale).toBe('en');
    });
  });

  describe('toUpdateRequestDTO', () => {
    it('includes templateId + fields', () => {
      const app = TemplateControllerMapper.toUpdateRequestDTO('t-1', {
        name: 'New name',
        subject: 'New subject',
        body: 'New body',
      } as never);
      expect(app.templateId).toBe('t-1');
      expect(app.name).toBe('New name');
    });
  });

  describe('toTestRequestDTO', () => {
    it('preserves test fields', () => {
      const app = TemplateControllerMapper.toTestRequestDTO('t-1', {
        variables: { name: 'John' },
        email: 'x@y.z',
      } as never);
      expect(app.templateId).toBe('t-1');
      expect(app.variables).toEqual({ name: 'John' });
    });
  });

  describe('toListOptions', () => {
    it('defaults page/limit', () => {
      const opts = TemplateControllerMapper.toListOptions({} as never);
      expect(opts.page).toBe(1);
      expect(opts.limit).toBe(20);
    });

    it('preserves filters', () => {
      const opts = TemplateControllerMapper.toListOptions({
        page: 2,
        limit: 50,
        type: 'email',
        status: 'active',
        locale: 'en',
        search: 'welcome',
      } as never);
      expect(opts.filter?.type).toBe('email');
      expect(opts.filter?.search).toBe('welcome');
    });
  });

  describe('toHttpResponse', () => {
    it('passes through template', () => {
      const app = {
        id: 't-1', name: 'Welcome', slug: 'welcome',
        type: 'email', status: 'active', category: 'auth',
        locale: 'en', body: 'Hi', variables: [], version: 1,
        createdAt: 'c', updatedAt: 'u',
      };
      const http = TemplateControllerMapper.toHttpResponse(app as never);
      expect(http.id).toBe('t-1');
    });
  });

  describe('toListHttp', () => {
    it('maps items', () => {
      const app = {
        items: [{ id: 't-1', name: 'x', slug: 'x', type: 'email', status: 'active', locale: 'en', version: 1, createdAt: 'c' }],
        total: 1, page: 1, limit: 20, totalPages: 1,
      };
      const http = TemplateControllerMapper.toListHttp(app as never);
      expect(http.items).toHaveLength(1);
      expect(http.total).toBe(1);
    });
  });

  describe('toRenderHttp', () => {
    it('maps render output', () => {
      const app = {
        templateId: 't-1',
        body: 'Hi John',
        missingVariables: [],
        renderedAt: '2026-01-01',
        locale: 'en',
      };
      const http = TemplateControllerMapper.toRenderHttp(app as never);
      expect(http.body).toBe('Hi John');
    });
  });
});

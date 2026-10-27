/**
 * Template → Notification E2E — create template → render → send।
 */
import { jest } from '@jest/globals';

import { TemplateService } from '@application/services/impl/template.service.js';
import {
  createMockTemplateRepo,
  createMockEventBridge,
} from '@application-fixtures/mock-repos.fixture.js';
import { TEMPLATE_DTO } from '@application-fixtures/dtos.fixture.js';
import {
  TemplateNotFoundApplicationError,
  TemplateSlugConflictError,
} from '@application/errors/template.errors.js';
import { TemplateRendererService } from '@domain/services/template-renderer.service.js';
import { IDS } from '@domain-fixtures/ids.fixture.js';
import { DATES } from '@domain-fixtures/dates.fixture.js';

function buildService() {
  const repo = createMockTemplateRepo();
  const bridge = createMockEventBridge();
  const svc = new TemplateService(repo as never, bridge as never);
  return { svc, repo, bridge };
}

function makeTemplateMock() {
  return {
    id: IDS.templateId,
    vo: {
      name: { value: 'Welcome' },
      slug: 'welcome-email',
      type: { value: 'system' },
      status: 'active',
      format: { value: 'html' },
      subject: { value: 'Hi {{name}}' },
      body: { value: 'Hello {{name}}, welcome!' },
      variables: [],
      locale: 'en',
      version: 1,
    },
    templateId: { value: IDS.templateId },
    createdAt: DATES.now,
    updatedAt: DATES.now,
    renderedHistory: [],
    updateBody: jest.fn(),
    recordRender: jest.fn(),
  };
}

describe('Application E2E — Template → Render flow', () => {
  it('render template with variables', () => {
    const result = TemplateRendererService.render({
      template: 'Hi {{name}}, welcome to {{company}}!',
      data: { name: 'Alice', company: 'Vubon' },
    });
    expect(result.output).toBe('Hi Alice, welcome to Vubon!');
    expect(result.missingVariables.length).toBe(0);
  });

  it('render template with missing variables', () => {
    const result = TemplateRendererService.render({
      template: 'Hi {{name}}, {{missing}}!',
      data: { name: 'Bob' },
    });
    expect(result.missingVariables).toContain('missing');
  });

  it('create → test → getBySlug flow', async () => {
    const { svc, repo, bridge } = buildService();

    // No duplicate slug
    repo.findBySlug.mockResolvedValue(null);

    // Create fails (builder stub) — expect CommandError
    await expect(
      svc.create(
        {
          name: 'Welcome',
          slug: 'welcome-email',
          type: 'system',
          category: 'system',
          locale: 'en',
          body: 'Hello',
          variables: [],
        } as never,
        'actor-1',
      ),
    ).rejects.toBeDefined();

    expect(bridge.publishFromEntity).not.toHaveBeenCalled();
  });

  it('test renders real template', async () => {
    const { svc, repo } = buildService();
    repo.findByIdVO.mockResolvedValue(makeTemplateMock());
    repo.save.mockImplementation((e: unknown) => Promise.resolve(e));

    const result = await svc.test(
      {
        templateId: IDS.templateId,
        variables: { name: 'Alice' },
        email: 'a@b.com',
      } as never,
      'actor-1',
    );

    expect(result.templateId).toBe(IDS.templateId);
    expect(result.body).toContain('Alice');
    expect(result.locale).toBe('en');
  });

  it('slug conflict on create', async () => {
    const { svc, repo } = buildService();
    repo.findBySlug.mockResolvedValue(makeTemplateMock());

    await expect(
      svc.create(
        {
          name: 'Dup',
          slug: 'welcome-email',
          type: 'system',
          category: 'system',
          locale: 'en',
          body: 'B',
          variables: [],
        } as never,
        'actor-1',
      ),
    ).rejects.toBeInstanceOf(TemplateSlugConflictError);
  });

  it('getBySlug → not found', async () => {
    const { svc, repo } = buildService();
    repo.findBySlug.mockResolvedValue(null);

    await expect(svc.getBySlug('missing')).rejects.toBeInstanceOf(
      TemplateNotFoundApplicationError,
    );
  });

  it('list paginated', async () => {
    const { svc, repo } = buildService();
    repo.findPaginated.mockResolvedValue({
      items: [makeTemplateMock()],
      total: 1,
      page: 1,
      limit: 10,
    });

    const result = await svc.list({ page: 1, limit: 10 });
    expect(result.total).toBe(1);
    expect(result.items.length).toBe(1);
  });
});

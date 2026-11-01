import { TemplateService } from '@application/services/impl/template.service.js';
import { createMockTemplateRepo, createMockEventBridge } from '@application-fixtures/mock-repos.fixture.js';
import { TEMPLATE_DTO } from '@application-fixtures/dtos.fixture.js';
import {
  TemplateNotFoundApplicationError,
  TemplateSlugConflictError,
  TemplateCreationError,
} from '@application/errors/template.errors.js';
import { IDS } from '@domain-fixtures/ids.fixture.js';
import { DATES } from '@domain-fixtures/dates.fixture.js';
import { jest } from '@jest/globals';

function makeService() {
  const repo = createMockTemplateRepo();
  const bridge = createMockEventBridge();
  return { svc: new TemplateService(repo as never, bridge as never), repo, bridge };
}

const MOCK_TPL = {
  id: IDS.templateId,
  vo: {
    name: { value: 'T' }, slug: 'welcome-email', type: { value: 'system' }, status: 'draft',
    format: { value: 'html' }, subject: null, body: { value: 'b' }, variables: [], locale: 'en', version: 1,
  },
  templateId: { value: IDS.templateId },
  createdAt: DATES.now,
  updatedAt: DATES.now,
  renderedHistory: [],
  updateBody: jest.fn(),
  recordRender: jest.fn(),
};

describe('TemplateService', () => {
  it('create rejects duplicate slug', async () => {
    const { svc, repo } = makeService();
    repo.findBySlug.mockResolvedValue(MOCK_TPL);
    await expect(svc.create(TEMPLATE_DTO.create, 'a')).rejects.toBeInstanceOf(TemplateSlugConflictError);
  });

  it('create rejects invalid template', async () => {
    const { svc, repo } = makeService();
    repo.findBySlug.mockResolvedValue(null);
    await expect(svc.create({ ...TEMPLATE_DTO.create, body: '' }, 'a'))
      .rejects.toBeInstanceOf(Error);
  });

  it('create succeeds on valid template', async () => {
    const { svc, repo, bridge } = makeService();
    repo.findBySlug.mockResolvedValue(null);
    repo.save.mockImplementation(async (entity: unknown) => entity);

    const result = await svc.create(TEMPLATE_DTO.create, 'a');

    expect(result).toBeDefined();
    expect(result.slug).toBe(TEMPLATE_DTO.create.slug);
    expect(result.status).toBe('draft');
    expect(repo.save).toHaveBeenCalled();
    expect(bridge.publishFromEntity).toHaveBeenCalled();
  });

  it('getById throws NotFound', async () => {
    const { svc, repo } = makeService();
    repo.findByIdVO.mockResolvedValue(null);
    await expect(svc.getById(IDS.templateId)).rejects.toBeInstanceOf(TemplateNotFoundApplicationError);
  });

  it('getBySlug throws NotFound', async () => {
    const { svc, repo } = makeService();
    repo.findBySlug.mockResolvedValue(null);
    await expect(svc.getBySlug('nope')).rejects.toBeInstanceOf(TemplateNotFoundApplicationError);
  });

  it('getBySlug succeeds', async () => {
    const { svc, repo } = makeService();
    repo.findBySlug.mockResolvedValue(MOCK_TPL);
    const r = await svc.getBySlug('welcome-email');
    expect(r.id).toBe(IDS.templateId);
  });

  it('list delegates', async () => {
    const { svc, repo } = makeService();
    repo.findPaginated.mockResolvedValue({ items: [], total: 0, page: 1, limit: 10 });
    const r = await svc.list({ page: 1, limit: 10 });
    expect(r.total).toBe(0);
  });

  it('update delegates', async () => {
    const { svc, repo } = makeService();
    repo.findByIdVO.mockResolvedValue(MOCK_TPL);
    repo.save.mockResolvedValue(MOCK_TPL);
    const r = await svc.update(TEMPLATE_DTO.update, 'a');
    expect(r).toBeDefined();
  });

  it('test renders body', async () => {
    const { svc, repo } = makeService();
    repo.findByIdVO.mockResolvedValue(MOCK_TPL);
    repo.save.mockResolvedValue(MOCK_TPL);
    const r = await svc.test(TEMPLATE_DTO.test, 'a');
    expect(r.templateId).toBe(IDS.templateId);
  });
});

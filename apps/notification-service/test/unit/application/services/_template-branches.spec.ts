/**
 * Branch coverage booster — template.service.ts
 */
import { TemplateService } from '@application/services/impl/template.service.js';
import { createMockTemplateRepo, createMockEventBridge } from '@application-fixtures/mock-repos.fixture.js';
import { TEMPLATE_DTO } from '@application-fixtures/dtos.fixture.js';
import { TemplateUpdateError } from '@application/errors/template.errors.js';
import { IDS } from '@domain-fixtures/ids.fixture.js';
import { DATES } from '@domain-fixtures/dates.fixture.js';
import { jest } from '@jest/globals';

function makeService() {
  const repo = createMockTemplateRepo();
  return { svc: new TemplateService(repo as never, createMockEventBridge() as never), repo };
}

function makeTemplateMock(overrides = {}) {
  return {
    id: IDS.templateId,
    vo: {
      name: { value: 'T' }, slug: 'welcome', type: { value: 'system' }, status: 'active',
      format: { value: 'html' }, subject: { value: 'S' }, body: { value: 'Hi {{name}}' },
      variables: [], locale: 'en', version: 1,
    },
    templateId: { value: IDS.templateId },
    createdAt: DATES.now, updatedAt: DATES.now,
    renderedHistory: [],
    updateBody: jest.fn(),
    recordRender: jest.fn(),
    ...overrides,
  };
}

describe('TemplateService — branch coverage', () => {
  // ⚠️ MUST include body so updateBody is called
  it('update throws TemplateUpdateError when updateBody fails', async () => {
    const { svc, repo } = makeService();
    const mock = makeTemplateMock({
      updateBody: jest.fn(() => { throw new Error('body invalid'); }),
    });
    repo.findByIdVO.mockResolvedValue(mock);
    await expect(
      svc.update({
        templateId: IDS.templateId,
        body: 'invalid {{bad',
      } as never, 'a'),
    ).rejects.toBeInstanceOf(TemplateUpdateError);
  });

  it('update with subject only does not call updateBody', async () => {
    const { svc, repo } = makeService();
    const mock = makeTemplateMock();
    repo.findByIdVO.mockResolvedValue(mock);
    repo.save.mockResolvedValue(mock);
    await svc.update({ templateId: IDS.templateId, subject: 'New' } as never, 'a');
    expect(mock.updateBody).not.toHaveBeenCalled();
  });

  it('test with missing variables produces missing list', async () => {
    const { svc, repo } = makeService();
    const mock = makeTemplateMock();
    repo.findByIdVO.mockResolvedValue(mock);
    repo.save.mockResolvedValue(mock);
    const r = await svc.test(
      { templateId: IDS.templateId, variables: {}, email: 'a@b.com' } as never,
      'a',
    );
    expect(r.missingVariables.length).toBeGreaterThan(0);
  });

  it('test succeeds', async () => {
    const { svc, repo } = makeService();
    const mock = makeTemplateMock();
    repo.findByIdVO.mockResolvedValue(mock);
    repo.save.mockResolvedValue(mock);
    const r = await svc.test(TEMPLATE_DTO.test, 'a');
    expect(r.templateId).toBe(IDS.templateId);
  });

  it('getBySlug when repo throws', async () => {
    const { svc, repo } = makeService();
    repo.findBySlug.mockRejectedValue(new Error('db down'));
    await expect(svc.getBySlug('welcome')).rejects.toThrow();
  });
});

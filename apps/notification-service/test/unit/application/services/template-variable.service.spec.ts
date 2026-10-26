import { TemplateVariableService } from '@application/services/impl/template-variable.service.js';
import { IDS } from '@domain-fixtures/ids.fixture.js';
import { jest } from '@jest/globals';

const MOCK = {
  id: 'v-1',
  templateId: { value: IDS.templateId },
  variable: { name: 'name', type: 'string', required: true, defaultValue: undefined, description: undefined },
  usageCount: 2,
};

function makeService() {
  const repo = { findByTemplate: jest.fn(), findRequired: jest.fn(), findByName: jest.fn() };
  return { svc: new TemplateVariableService(repo as never), repo };
}

describe('TemplateVariableService', () => {
  it('listByTemplate maps', async () => {
    const { svc, repo } = makeService();
    repo.findByTemplate.mockResolvedValue([MOCK]);
    const r = await svc.listByTemplate(IDS.templateId);
    expect(r[0]!.name).toBe('name');
  });

  it('listRequired', async () => {
    const { svc, repo } = makeService();
    repo.findRequired.mockResolvedValue([MOCK]);
    expect((await svc.listRequired(IDS.templateId)).length).toBe(1);
  });

  it('getByName returns null when missing', async () => {
    const { svc, repo } = makeService();
    repo.findByName.mockResolvedValue(null);
    expect(await svc.getByName(IDS.templateId, 'nope')).toBeNull();
  });

  it('getByName returns mapped', async () => {
    const { svc, repo } = makeService();
    repo.findByName.mockResolvedValue(MOCK);
    expect((await svc.getByName(IDS.templateId, 'name'))!.name).toBe('name');
  });
});

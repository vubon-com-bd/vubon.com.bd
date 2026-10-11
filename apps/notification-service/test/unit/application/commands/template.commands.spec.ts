import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { CreateTemplateHandler } from '../../../../src/module/application/commands/template/create-template.handler.js';
import { CreateTemplateCommand } from '../../../../src/module/application/commands/template/create-template.command.js';
import { UpdateTemplateHandler } from '../../../../src/module/application/commands/template/update-template.handler.js';
import { UpdateTemplateCommand } from '../../../../src/module/application/commands/template/update-template.command.js';
import { ActivateTemplateHandler } from '../../../../src/module/application/commands/template/activate-template.handler.js';
import { ActivateTemplateCommand } from '../../../../src/module/application/commands/template/activate-template.command.js';
import { DeactivateTemplateHandler } from '../../../../src/module/application/commands/template/deactivate-template.handler.js';
import { DeactivateTemplateCommand } from '../../../../src/module/application/commands/template/deactivate-template.command.js';
import { DeprecateTemplateHandler } from '../../../../src/module/application/commands/template/deprecate-template.handler.js';
import { DeprecateTemplateCommand } from '../../../../src/module/application/commands/template/deprecate-template.command.js';
import { ArchiveTemplateHandler } from '../../../../src/module/application/commands/template/archive-template.handler.js';
import { ArchiveTemplateCommand } from '../../../../src/module/application/commands/template/archive-template.command.js';
import { CreateTemplateVersionHandler } from '../../../../src/module/application/commands/template/create-template-version.handler.js';
import { CreateTemplateVersionCommand } from '../../../../src/module/application/commands/template/create-template-version.command.js';
import { RenderTemplateHandler } from '../../../../src/module/application/commands/template/render-template.handler.js';
import { RenderTemplateCommand } from '../../../../src/module/application/commands/template/render-template.command.js';

function mockSvc() {
  const r = jest.fn().mockResolvedValue({ id: 't-1' });
  return {
    create: r, update: r, activate: r, deactivate: r, deprecate: r,
    archive: r, createVersion: r, render: jest.fn().mockResolvedValue({ body: 'x' }),
  } as never;
}

describe('Template command handlers', () => {
  let svc: ReturnType<typeof mockSvc>;
  beforeEach(() => { svc = mockSvc(); });
  it('CreateTemplateHandler', async () => {
    await new CreateTemplateHandler(svc).execute(new CreateTemplateCommand({
      name: 'N', slug: 's', type: 'email', category: 'order', locale: 'en',
      subject: 'S', body: 'B', variables: [],
    } as never, 'a'));
    expect(svc.create).toHaveBeenCalled();
  });
  it('UpdateTemplateHandler', async () => {
    await new UpdateTemplateHandler(svc).execute(new UpdateTemplateCommand({
      templateId: 't-1', body: 'new',
    } as never, 'a'));
    expect(svc.update).toHaveBeenCalled();
  });
  it('ActivateTemplateHandler', async () => {
    await new ActivateTemplateHandler(svc).execute(new ActivateTemplateCommand({ templateId: 't-1' }, 'a'));
    expect(svc.activate).toHaveBeenCalled();
  });
  it('DeactivateTemplateHandler', async () => {
    await new DeactivateTemplateHandler(svc).execute(new DeactivateTemplateCommand({ templateId: 't-1', reason: 'x' }, 'a'));
    expect(svc.deactivate).toHaveBeenCalled();
  });
  it('DeprecateTemplateHandler', async () => {
    await new DeprecateTemplateHandler(svc).execute(new DeprecateTemplateCommand({ templateId: 't-1' }, 'a'));
    expect(svc.deprecate).toHaveBeenCalled();
  });
  it('ArchiveTemplateHandler', async () => {
    await new ArchiveTemplateHandler(svc).execute(new ArchiveTemplateCommand({ templateId: 't-1' }, 'a'));
    expect(svc.archive).toHaveBeenCalled();
  });
  it('CreateTemplateVersionHandler', async () => {
    await new CreateTemplateVersionHandler(svc).execute(new CreateTemplateVersionCommand({ templateId: 't-1' }, 'a'));
    expect(svc.createVersion).toHaveBeenCalled();
  });
  it('RenderTemplateHandler', async () => {
    await new RenderTemplateHandler(svc).execute(new RenderTemplateCommand({
      templateId: 't-1', data: {},
    }));
    expect(svc.render).toHaveBeenCalled();
  });
});

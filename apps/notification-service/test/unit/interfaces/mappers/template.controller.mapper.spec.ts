import { describe, it, expect } from '@jest/globals';
import { TemplateControllerMapper } from '../../../../src/module/interfaces/mappers/template.controller.mapper.js';

describe('TemplateControllerMapper', () => {
  it('toCreateAppDto', () => {
    const dto = TemplateControllerMapper.toCreateAppDto({
      name: 'Order', slug: 'order', type: 'email', category: 'order',
      locale: 'en', subject: 'S', body: 'B', bodyHtml: '<p>B</p>',
      variables: [{ name: 'x', type: 'string', required: true }],
    } as never);
    expect(dto.name).toBe('Order');
    expect(dto.variables.length).toBe(1);
  });

  it('toCreateAppDto without variables', () => {
    const dto = TemplateControllerMapper.toCreateAppDto({
      name: 'O', slug: 'o', type: 'email', category: 'order', locale: 'en',
      subject: 'S', body: 'B',
    } as never);
    expect(dto.variables.length).toBe(0);
  });

  it('toUpdateAppDto', () => {
    const dto = TemplateControllerMapper.toUpdateAppDto('t-1', {
      name: 'New', category: 'payment', subject: 'S2', body: 'B2',
      bodyHtml: '<p>B2</p>', variables: [{ name: 'y', type: 'number', required: false }],
    } as never);
    expect(dto.templateId).toBe('t-1');
    expect(dto.variables?.length).toBe(1);
  });

  it('toUpdateAppDto without variables', () => {
    const dto = TemplateControllerMapper.toUpdateAppDto('t-1', { name: 'X' } as never);
    expect(dto.variables).toBeUndefined();
  });

  it('toRenderAppDto', () => {
    const dto = TemplateControllerMapper.toRenderAppDto('t-1', {
      data: { x: 1 }, locale: 'en',
    } as never);
    expect(dto.templateId).toBe('t-1');
  });

  it('toPreviewAppDto', () => {
    const dto = TemplateControllerMapper.toPreviewAppDto('t-1', {
      sampleData: { x: 1 },
    } as never);
    expect(dto.sampleData?.['x']).toBe(1);
  });

  it('toListAppDto defaults + filters', () => {
    const o = TemplateControllerMapper.toListAppDto({
      type: 'email', status: 'active', category: 'order', locale: 'en', search: 'order',
    } as never);
    expect(o.page).toBe(1);
    expect(o.filter?.type).toBe('email');
  });

  it('toDeactivateAppDto', () => {
    const dto = TemplateControllerMapper.toDeactivateAppDto('t-1', { reason: 'x' } as never);
    expect(dto.reason).toBe('x');
  });

  it('toDeprecateAppDto', () => {
    const dto = TemplateControllerMapper.toDeprecateAppDto('t-1', {
      replacementTemplateId: 't-2', reason: 'old',
    } as never);
    expect(dto.replacementTemplateId).toBe('t-2');
  });
});

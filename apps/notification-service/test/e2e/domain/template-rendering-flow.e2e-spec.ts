/**
 * Template Rendering E2E
 * @module notification-service/test/e2e/domain
 */
import { TemplateEntity } from '@domain/entities/template.entity.js';
import { TemplateVO } from '@domain/composites/template.vo.js';
import { TemplateRenderVO } from '@domain/composites/template-render.vo.js';
import { TemplateIdVO } from '@domain/primitives/template-id.vo.js';
import { TemplateNameVO } from '@domain/primitives/template-name.vo.js';
import { TemplateContentVO } from '@domain/primitives/template-content.vo.js';
import { TemplateFormatVO } from '@domain/primitives/template-format.vo.js';
import { TemplateVariableVO } from '@domain/primitives/template-variable.vo.js';
import { TemplateTypeVO } from '@domain/primitives/template-type.vo.js';

import { TemplateRendererService } from '@domain/services/template-renderer.service.js';
import { TemplateValidatorService } from '@domain/services/template-validator.service.js';
import { VariableInterpolatorService } from '@domain/services/variable-interpolator.service.js';

import { IDS } from '@domain-fixtures/ids.fixture.js';

const NOW = new Date().toISOString();

describe('Template Rendering — E2E', () => {
  it('create → validate → activate → render → verify', () => {
    // 1. Build template
    const entity = TemplateEntity.create({
      id: TemplateIdVO.create(IDS.templateId),
      vo: TemplateVO.create({
        id: TemplateIdVO.create(IDS.templateId),
        name: TemplateNameVO.create('Order Confirmation'),
        slug: 'order-confirmation',
        type: TemplateTypeVO.email(),
        status: 'draft' as const,
        format: TemplateFormatVO.html(),
        subject: TemplateContentVO.create('Order {{orderId}} confirmed'),
        body: TemplateContentVO.create('<p>Hi {{userName}}, your order {{orderId}} is confirmed</p>'),
        variables: [
          TemplateVariableVO.create({ name: 'userName', type: 'string', required: true }),
          TemplateVariableVO.create({ name: 'orderId', type: 'string', required: true }),
        ],
        locale: 'en',
        version: 1,
      }),
      now: NOW,
    });
    expect(entity.isDraft()).toBe(true);

    // 2. Validate
    const validation = TemplateValidatorService.validate({
      body: entity.vo.body.value,
      declaredVariables: [...entity.vo.variables],
      allowHtml: true,
    });
    expect(validation.valid).toBe(true);

    // 3. Activate
    entity.activate(NOW);
    expect(entity.isActive()).toBe(true);

    // 4. Render
    const render = TemplateRendererService.render({
      template: entity.vo.body.value,
      data: { userName: 'Rahim', orderId: 'ORD-123' },
      escapeHtml: false,
    });
    expect(render.output).toContain('Rahim');
    expect(render.output).toContain('ORD-123');
    expect(render.missingVariables).toEqual([]);

    // 5. Record render
    const renderVO = TemplateRenderVO.create({
      templateId: entity.templateId,
      subject: 'Order ORD-123 confirmed',
      body: render.output,
      missingVariables: [...render.missingVariables],
      renderedAt: NOW,
      locale: 'en',
    });
    entity.recordRender(renderVO, NOW);
    expect(entity.renderedHistory.length).toBe(1);
  });

  it('invalid template → validation errors', () => {
    const result = TemplateValidatorService.validate({
      body: 'Hi {{unknown}}',
      declaredVariables: [TemplateVariableVO.create({ name: 'name', type: 'string', required: true })],
    });
    expect(result.valid).toBe(false);
  });

  it('variable interpolation with defaults', () => {
    const result = VariableInterpolatorService.interpolate({
      data: { userName: 'Rahim' },
      variables: [
        TemplateVariableVO.create({
          name: 'greeting',
          type: 'string',
          required: false,
          defaultValue: 'Hello',
        }),
      ],
      strategy: 'lenient',
    });
    expect(result.appliedDefaults).toContain('greeting');
  });
});

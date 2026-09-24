import { TemplateEntity } from '../entities/template.entity';
import { TemplateRenderVO } from '../value-objects/composites/template-render.vo';

export interface RenderContext {
  readonly variables: Readonly<Record<string, string | number | boolean>>;
}

export class TemplateRendererService {
  render(template: TemplateEntity, ctx: RenderContext): TemplateRenderVO {
    const raw = template.content.value;
    const html = this.interpolate(raw, ctx.variables);
    const subject = template.subject
      ? this.interpolate(template.subject, ctx.variables)
      : null;
    return TemplateRenderVO.create({
      templateId: template.id,
      subject,
      html,
      text: null,
      variables: ctx.variables,
    });
  }

  private interpolate(
    source: string,
    variables: Readonly<Record<string, string | number | boolean>>,
  ): string {
    return source.replace(/\{\{\s*(\w+)\s*\}\}/g, (_, key: string) => {
      const value = variables[key];
      return value === undefined ? '' : String(value);
    });
  }
}

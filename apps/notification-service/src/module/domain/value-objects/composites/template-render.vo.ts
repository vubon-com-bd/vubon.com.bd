import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { TemplateIdVO } from '../primitives/template-id.vo';

export interface TemplateRenderProps {
  readonly templateId: TemplateIdVO;
  readonly subject: string | null;
  readonly html: string;
  readonly text: string | null;
  readonly variables: Readonly<Record<string, string | number | boolean>>;
}

export class TemplateRenderVO extends BaseVO<TemplateRenderProps> {
  private constructor(props: TemplateRenderProps) {
    super(
      Object.freeze({
        ...props,
        variables: Object.freeze({ ...props.variables }),
      }),
    );
  }

  static create(props: TemplateRenderProps): TemplateRenderVO {
    return new TemplateRenderVO(props);
  }

  get templateId(): TemplateIdVO { return this.value.templateId; }
  get subject(): string | null { return this.value.subject; }
  get html(): string { return this.value.html; }
  get text(): string | null { return this.value.text; }
  get variables(): Readonly<Record<string, string | number | boolean>> {
    return this.value.variables;
  }
}

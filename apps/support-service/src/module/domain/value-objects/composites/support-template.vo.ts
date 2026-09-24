import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { TemplateIdVO } from '../primitives/template-id.vo';
import { TemplateTypeVO } from '../primitives/template-type.vo';
import { TemplateContentVO } from '../primitives/template-content.vo';

export interface SupportTemplateProps {
  readonly id: TemplateIdVO;
  readonly name: string;
  readonly type: TemplateTypeVO;
  readonly content: TemplateContentVO;
  readonly variables: ReadonlyArray<string>;
  readonly isActive: boolean;
}

export class SupportTemplateVO extends BaseVO<SupportTemplateProps> {
  private constructor(props: SupportTemplateProps) {
    super(Object.freeze({
      ...props,
      variables: Object.freeze([...props.variables]),
    }));
  }

  static create(props: SupportTemplateProps): SupportTemplateVO {
    return new SupportTemplateVO(props);
  }

  get id(): TemplateIdVO { return this.value.id; }
  get name(): string { return this.value.name; }
  get type(): TemplateTypeVO { return this.value.type; }
  get content(): TemplateContentVO { return this.value.content; }
  get variables(): ReadonlyArray<string> { return this.value.variables; }
  get isActive(): boolean { return this.value.isActive; }
}

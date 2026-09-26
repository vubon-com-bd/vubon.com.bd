import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { TemplateVariableVO as TemplateVariableNameVO } from '../primitives/template-variable.vo';

export interface TemplateVariableProps {
  readonly name: TemplateVariableNameVO;
  readonly required: boolean;
  readonly defaultValue: string | null;
}

export class TemplateVariableCompositeVO extends BaseVO<TemplateVariableProps> {
  private constructor(props: TemplateVariableProps) {
    super(Object.freeze({ ...props }));
  }

  static create(props: TemplateVariableProps): TemplateVariableCompositeVO {
    return new TemplateVariableCompositeVO(props);
  }

  get name(): TemplateVariableNameVO { return this.value.name; }
  get required(): boolean { return this.value.required; }
  get defaultValue(): string | null { return this.value.defaultValue; }
}

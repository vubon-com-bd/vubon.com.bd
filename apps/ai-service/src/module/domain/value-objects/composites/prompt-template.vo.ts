import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { PromptTemplateVO as PromptTemplateTextVO } from '../primitives/prompt-template.vo';

export interface PromptTemplateProps {
  readonly name: string;
  readonly template: PromptTemplateTextVO;
  readonly role: string;
  readonly variables: readonly string[];
}

export class PromptTemplateVO_ extends BaseVO<PromptTemplateProps> {
  static create(props: PromptTemplateProps): PromptTemplateVO_ {
    if (props.name.trim().length === 0) {
      throw new Error('PromptTemplateVO_: name cannot be empty');
    }
    return new PromptTemplateVO_(props);
  }

  private constructor(props: PromptTemplateProps) {
    super(
      Object.freeze({
        ...props,
        variables: Object.freeze([...props.variables]),
      }),
    );
  }

  get name(): string { return this.value.name; }
  get template(): PromptTemplateTextVO { return this.value.template; }
  get role(): string { return this.value.role; }
  get variables(): readonly string[] { return this.value.variables; }

  hasVariable(v: string): boolean {
    return this.value.variables.includes(v);
  }
}

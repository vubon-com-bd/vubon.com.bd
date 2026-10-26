/**
 * TemplateVariablesVO — Composite Value Object
 * @module notification-service/domain/value-objects/composites
 *
 * Multiple TemplateVariableVO collection + lookup helpers।
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

import { TemplateVariableVO } from '@domain/primitives/template-variable.vo.js';

export interface TemplateVariablesVOProps {
  readonly variables: readonly TemplateVariableVO[];
}

export class TemplateVariablesVO extends BaseVO<TemplateVariablesVOProps> {
  private constructor(props: TemplateVariablesVOProps) {
    super(Object.freeze(props));
  }

  static create(props: TemplateVariablesVOProps): TemplateVariablesVO {
    const vo = new TemplateVariablesVO(props);
    vo.validate();
    return vo;
  }

  static reconstitute(props: TemplateVariablesVOProps): TemplateVariablesVO {
    return new TemplateVariablesVO(props);
  }

  static empty(): TemplateVariablesVO {
    return new TemplateVariablesVO({ variables: Object.freeze([]) });
  }

  protected validate(): void {
    const names = new Set<string>();
    for (const variable of this.value.variables) {
      if (names.has(variable.name)) {
        throw new ValidationError(
          `Duplicate template variable "${variable.name}"`,
          'variables',
        );
      }
      names.add(variable.name);
    }
  }

  get variables(): readonly TemplateVariableVO[] { return this.value.variables; }
  get count(): number { return this.value.variables.length; }
  get isEmpty(): boolean { return this.count === 0; }

  get required(): readonly TemplateVariableVO[] {
    return this.value.variables.filter((x) => x.required);
  }

  get optional(): readonly TemplateVariableVO[] {
    return this.value.variables.filter((x) => !x.required);
  }

  has(name: string): boolean {
    return this.value.variables.some((v) => v.name === name);
  }

  get(name: string): TemplateVariableVO | undefined {
    return this.value.variables.find((v) => v.name === name);
  }

  missingFrom(data: Readonly<Record<string, unknown>>): readonly string[] {
    return this.required
      .filter((v) => !(v.name in data))
      .map((v) => v.name);
  }
}

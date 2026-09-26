/**
 * SupportTemplateVO — Message template composite
 * @module support-service/domain/value-objects/composites
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { TemplateIdVO } from '../primitives/template-id.vo';
import { TemplateTypeVO } from '../primitives/template-type.vo';
import { TemplateContentVO } from '../primitives/template-content.vo';

export interface SupportTemplateVOProps {
  readonly id: TemplateIdVO;
  readonly type: TemplateTypeVO;
  readonly content: TemplateContentVO;
  readonly name: string;
  readonly language?: string;
  readonly isActive: boolean;
}

export class SupportTemplateVO extends BaseVO<Readonly<SupportTemplateVOProps>> {
  private constructor(props: SupportTemplateVOProps) {
    super(Object.freeze({ ...props, language: props.language ?? 'en' }));
  }

  static create(props: SupportTemplateVOProps): SupportTemplateVO {
    if (!props.id || !props.name || !props.content) {
      throw new ValidationError(
        'SupportTemplateVO requires id, name, content',
        'supportTemplate',
      );
    }
    return new SupportTemplateVO(props);
  }

  get id(): TemplateIdVO {
    return this.value.id;
  }

  get name(): string {
    return this.value.name;
  }

  get content(): TemplateContentVO {
    return this.value.content;
  }

  get isActive(): boolean {
    return this.value.isActive;
  }

  get isCustomerFacing(): boolean {
    return this.value.type.isCustomerFacing();
  }

  get placeholders(): readonly string[] {
    return this.value.content.placeholders;
  }

  render(values: Readonly<Record<string, string | number>>): string {
    return this.value.content.render(values);
  }
}

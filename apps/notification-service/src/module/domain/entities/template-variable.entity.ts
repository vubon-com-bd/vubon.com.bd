/**
 * TemplateVariableEntity — Child of Template
 * @module notification-service/domain/entities
 */
import { BaseEntity } from '@vubon/shared-kernel/domain/base/base.entity';
import type { TemplateVariableVO } from '@domain/primitives/template-variable.vo.js';
import type { TemplateIdVO } from '@domain/primitives/template-id.vo.js';

export interface TemplateVariableEntityProps {
  readonly templateId: TemplateIdVO;
  readonly variable: TemplateVariableVO;
  readonly usageCount: number;
}

export class TemplateVariableEntity extends BaseEntity<string> {
  private props: TemplateVariableEntityProps;

  private constructor(
    id: string,
    createdAt: string,
    updatedAt: string,
    props: TemplateVariableEntityProps,
  ) {
    super(id, createdAt, updatedAt, null);
    this.props = props;
  }

  static create(params: {
    id: string;
    templateId: TemplateIdVO;
    variable: TemplateVariableVO;
    now: string;
  }): TemplateVariableEntity {
    return new TemplateVariableEntity(params.id, params.now, params.now, {
      templateId: params.templateId,
      variable: params.variable,
      usageCount: 0,
    });
  }

  static reconstitute(params: {
    id: string;
    createdAt: string;
    updatedAt: string;
    props: TemplateVariableEntityProps;
  }): TemplateVariableEntity {
    return new TemplateVariableEntity(
      params.id,
      params.createdAt,
      params.updatedAt,
      params.props,
    );
  }

  get templateId(): TemplateIdVO { return this.props.templateId; }
  get variable(): TemplateVariableVO { return this.props.variable; }
  get usageCount(): number { return this.props.usageCount; }

  incrementUsage(): void {
    this.props = { ...this.props, usageCount: this.props.usageCount + 1 };
  }
}

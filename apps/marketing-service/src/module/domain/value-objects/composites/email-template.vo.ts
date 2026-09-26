import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { EmailTemplateIdVO } from '../primitives/email-template-id.vo';

export interface EmailTemplateProps {
  readonly id: EmailTemplateIdVO;
  readonly name: string;
  readonly subject: string;
  readonly html: string;
  readonly language: string;
  readonly variables: readonly string[];
}

export class EmailTemplateVO extends BaseVO<EmailTemplateProps> {
  private constructor(props: EmailTemplateProps) {
    super(Object.freeze({
      ...props,
      variables: Object.freeze([...props.variables]),
    }));
  }

  static create(props: EmailTemplateProps): EmailTemplateVO {
    return new EmailTemplateVO(props);
  }

  get id(): EmailTemplateIdVO { return this.value.id; }
  get name(): string { return this.value.name; }
  get subject(): string { return this.value.subject; }
  get html(): string { return this.value.html; }
  get language(): string { return this.value.language; }
  get variables(): readonly string[] { return this.value.variables; }
}

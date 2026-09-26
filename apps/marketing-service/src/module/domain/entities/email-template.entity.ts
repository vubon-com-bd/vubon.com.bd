import { BaseEntity } from '@vubon/shared-kernel/domain/base/base.entity';
import { EmailTemplateIdVO } from '../value-objects/primitives/email-template-id.vo';

export interface EmailTemplateEntityProps {
  readonly name: string;
  readonly subject: string;
  readonly html: string;
  readonly language: string;
  readonly variables: readonly string[];
}

export class EmailTemplateEntity extends BaseEntity<string> {
  private readonly _name: string;
  private readonly _subject: string;
  private readonly _html: string;
  private readonly _language: string;
  private readonly _variables: readonly string[];

  private constructor(
    id: string,
    props: EmailTemplateEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._name = props.name;
    this._subject = props.subject;
    this._html = props.html;
    this._language = props.language;
    this._variables = Object.freeze([...props.variables]);
  }

  static create(props: EmailTemplateEntityProps): EmailTemplateEntity {
    const now = new Date().toISOString();
    return new EmailTemplateEntity(crypto.randomUUID(), props, now, now, null);
  }

  static reconstitute(
    id: string,
    props: EmailTemplateEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ): EmailTemplateEntity {
    return new EmailTemplateEntity(id, props, createdAt, updatedAt, deletedAt);
  }

  get name(): string { return this._name; }
  get subject(): string { return this._subject; }
  get html(): string { return this._html; }
  get language(): string { return this._language; }
  get variables(): readonly string[] { return this._variables; }
}

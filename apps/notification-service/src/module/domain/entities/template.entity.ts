import { AggregateRoot } from '@vubon/shared-kernel/domain/base/base.aggregate';
import { TemplateIdVO } from '../value-objects/primitives/template-id.vo';
import { TemplateNameVO } from '../value-objects/primitives/template-name.vo';
import { TemplateContentVO } from '../value-objects/primitives/template-content.vo';
import { TemplateFormatVO } from '../value-objects/primitives/template-format.vo';
import { NotificationChannelVO } from '../value-objects/primitives/notification-channel.vo';

export interface TemplateEntityProps {
  readonly name: TemplateNameVO;
  readonly channel: NotificationChannelVO;
  readonly language: string;
  readonly subject: string | null;
  readonly content: TemplateContentVO;
  readonly format: TemplateFormatVO;
  readonly variables: readonly string[];
}

export class TemplateEntity extends AggregateRoot<TemplateIdVO> {
  private readonly _name: TemplateNameVO;
  private readonly _channel: NotificationChannelVO;
  private readonly _language: string;
  private readonly _subject: string | null;
  private readonly _content: TemplateContentVO;
  private readonly _format: TemplateFormatVO;
  private readonly _variables: readonly string[];

  private constructor(
    id: TemplateIdVO,
    props: TemplateEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._name = props.name;
    this._channel = props.channel;
    this._language = props.language;
    this._subject = props.subject;
    this._content = props.content;
    this._format = props.format;
    this._variables = Object.freeze([...props.variables]);
  }

  static create(props: TemplateEntityProps): TemplateEntity {
    const now = new Date().toISOString();
    const id = TemplateIdVO.create(crypto.randomUUID());
    return new TemplateEntity(id, props, now, now, null);
  }

  static reconstitute(
    id: TemplateIdVO,
    props: TemplateEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ): TemplateEntity {
    return new TemplateEntity(id, props, createdAt, updatedAt, deletedAt);
  }

  get name(): TemplateNameVO { return this._name; }
  get channel(): NotificationChannelVO { return this._channel; }
  get language(): string { return this._language; }
  get subject(): string | null { return this._subject; }
  get content(): TemplateContentVO { return this._content; }
  get format(): TemplateFormatVO { return this._format; }
  get variables(): readonly string[] { return this._variables; }
}

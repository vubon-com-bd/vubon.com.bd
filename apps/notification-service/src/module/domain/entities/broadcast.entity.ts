import { AggregateRoot } from '@vubon/shared-kernel/domain/base/base.aggregate';
import { BroadcastIdVO } from '../value-objects/primitives/broadcast-id.vo';
import { BroadcastStatusVO } from '../value-objects/primitives/broadcast-status.vo';
import { BroadcastTypeVO } from '../value-objects/primitives/broadcast-type.vo';
import { BroadcastAudienceVO } from '../value-objects/primitives/broadcast-audience.vo';
import { TemplateIdVO } from '../value-objects/primitives/template-id.vo';

export interface BroadcastEntityProps {
  readonly type: BroadcastTypeVO;
  readonly status: BroadcastStatusVO;
  readonly audience: BroadcastAudienceVO;
  readonly templateId: TemplateIdVO | null;
  readonly subject: string | null;
  readonly content: string;
  readonly scheduledAt: Date | null;
  readonly startedAt: Date | null;
  readonly completedAt: Date | null;
}

export class BroadcastEntity extends AggregateRoot<BroadcastIdVO> {
  private readonly _type: BroadcastTypeVO;
  private readonly _status: BroadcastStatusVO;
  private readonly _audience: BroadcastAudienceVO;
  private readonly _templateId: TemplateIdVO | null;
  private readonly _subject: string | null;
  private readonly _content: string;
  private readonly _scheduledAt: Date | null;
  private readonly _startedAt: Date | null;
  private readonly _completedAt: Date | null;

  private constructor(
    id: BroadcastIdVO,
    props: BroadcastEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._type = props.type;
    this._status = props.status;
    this._audience = props.audience;
    this._templateId = props.templateId;
    this._subject = props.subject;
    this._content = props.content;
    this._scheduledAt = props.scheduledAt;
    this._startedAt = props.startedAt;
    this._completedAt = props.completedAt;
  }

  static create(props: BroadcastEntityProps): BroadcastEntity {
    const now = new Date().toISOString();
    const id = BroadcastIdVO.create(crypto.randomUUID());
    return new BroadcastEntity(id, props, now, now, null);
  }

  static reconstitute(
    id: BroadcastIdVO,
    props: BroadcastEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ): BroadcastEntity {
    return new BroadcastEntity(id, props, createdAt, updatedAt, deletedAt);
  }

  start(): BroadcastEntity {
    const now = new Date();
    return new BroadcastEntity(
      this.id,
      { ...this._toProps(), status: BroadcastStatusVO.create('running'), startedAt: now },
      this.createdAt,
      now.toISOString(),
      this.deletedAt ?? null,
    );
  }

  complete(): BroadcastEntity {
    const now = new Date();
    return new BroadcastEntity(
      this.id,
      { ...this._toProps(), status: BroadcastStatusVO.create('completed'), completedAt: now },
      this.createdAt,
      now.toISOString(),
      this.deletedAt ?? null,
    );
  }

  get type(): BroadcastTypeVO { return this._type; }
  get status(): BroadcastStatusVO { return this._status; }
  get audience(): BroadcastAudienceVO { return this._audience; }
  get templateId(): TemplateIdVO | null { return this._templateId; }
  get subject(): string | null { return this._subject; }
  get content(): string { return this._content; }
  get scheduledAt(): Date | null { return this._scheduledAt; }
  get startedAt(): Date | null { return this._startedAt; }
  get completedAt(): Date | null { return this._completedAt; }

  private _toProps(): BroadcastEntityProps {
    return {
      type: this._type,
      status: this._status,
      audience: this._audience,
      templateId: this._templateId,
      subject: this._subject,
      content: this._content,
      scheduledAt: this._scheduledAt,
      startedAt: this._startedAt,
      completedAt: this._completedAt,
    };
  }
}

import { AggregateRoot } from '@vubon/shared-kernel/domain/base/base.aggregate';
import { SessionIdVO } from '../value-objects/primitives/session-id.vo';
import { SessionDurationVO } from '../value-objects/primitives/session-duration.vo';
import { UserIdVO } from '../value-objects/primitives/user-id.vo';
import { PagePathVO } from '../value-objects/primitives/page-path.vo';
import { SessionStartedEvent, SessionEndedEvent } from '../events/session.events';

export interface SessionEntityProps {
  readonly userId: UserIdVO | null;
  readonly entryPage: PagePathVO;
  readonly exitPage: PagePathVO;
  readonly pageViewCount: number;
  readonly startedAt: Date;
  readonly endedAt: Date | null;
}

export class SessionEntity extends AggregateRoot<SessionIdVO> {
  private readonly _userId: UserIdVO | null;
  private readonly _entryPage: PagePathVO;
  private readonly _exitPage: PagePathVO;
  private readonly _pageViewCount: number;
  private readonly _startedAt: Date;
  private readonly _endedAt: Date | null;

  private constructor(
    id: SessionIdVO,
    props: SessionEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._userId = props.userId;
    this._entryPage = props.entryPage;
    this._exitPage = props.exitPage;
    this._pageViewCount = props.pageViewCount;
    this._startedAt = props.startedAt;
    this._endedAt = props.endedAt;
  }

  static create(props: SessionEntityProps): SessionEntity {
    if (props.pageViewCount < 0) {
      throw new Error('Page view count cannot be negative');
    }
    const now = new Date().toISOString();
    const id = SessionIdVO.create(crypto.randomUUID());
    const entity = new SessionEntity(id, props, now, now, null);
    entity.addDomainEvent(
      new SessionStartedEvent(
        id.value,
        id.value,
        props.userId?.value ?? null,
        props.entryPage.value,
        0,
      ),
    );
    return entity;
  }

  static reconstitute(
    id: SessionIdVO,
    props: SessionEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ): SessionEntity {
    return new SessionEntity(id, props, createdAt, updatedAt, deletedAt);
  }

  end(exitPage: PagePathVO, endedAt: Date): SessionEntity {
    if (this._endedAt !== null) {
      throw new Error('Session already ended');
    }
    if (endedAt.getTime() < this._startedAt.getTime()) {
      throw new Error('Session end cannot be before start');
    }
    const now = new Date().toISOString();
    const updated = new SessionEntity(
      this.id,
      { ...this._toProps(), exitPage, endedAt },
      this.createdAt,
      now,
      this.deletedAt ?? null,
    );
    const durationSeconds = (endedAt.getTime() - this._startedAt.getTime()) / 1000;
    updated.addDomainEvent(
      new SessionEndedEvent(
        this.id.value,
        this.id.value,
        durationSeconds,
        this._pageViewCount,
        this.version + 1,
      ),
    );
    return updated;
  }

  incrementPageView(): SessionEntity {
    return new SessionEntity(
      this.id,
      { ...this._toProps(), pageViewCount: this._pageViewCount + 1 },
      this.createdAt,
      new Date().toISOString(),
      this.deletedAt ?? null,
    );
  }

  get userId(): UserIdVO | null { return this._userId; }
  get entryPage(): PagePathVO { return this._entryPage; }
  get exitPage(): PagePathVO { return this._exitPage; }
  get pageViewCount(): number { return this._pageViewCount; }
  get startedAt(): Date { return this._startedAt; }
  get endedAt(): Date | null { return this._endedAt; }

  get isActive(): boolean {
    return this._endedAt === null;
  }

  get isBounce(): boolean {
    return this._pageViewCount <= 1;
  }

  getDuration(): SessionDurationVO | null {
    if (this._endedAt === null) return null;
    return SessionDurationVO.fromDates(this._startedAt, this._endedAt);
  }

  private _toProps(): SessionEntityProps {
    return {
      userId: this._userId,
      entryPage: this._entryPage,
      exitPage: this._exitPage,
      pageViewCount: this._pageViewCount,
      startedAt: this._startedAt,
      endedAt: this._endedAt,
    };
  }
}

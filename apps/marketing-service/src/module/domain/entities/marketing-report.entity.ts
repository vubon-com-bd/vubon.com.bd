import { AggregateRoot } from '@vubon/shared-kernel/domain/base/base.aggregate';
import { MarketingReportIdVO } from '../value-objects/primitives/marketing-report-id.vo';
import { ReportTypeVO } from '../value-objects/primitives/report-type.vo';
import { ReportFormatVO } from '../value-objects/primitives/report-format.vo';

export interface MarketingReportEntityProps {
  readonly name: string;
  readonly type: ReportTypeVO;
  readonly format: ReportFormatVO;
  readonly generatedAt: Date;
  readonly data: Readonly<Record<string, unknown>> | null;
}

export class MarketingReportEntity extends AggregateRoot<MarketingReportIdVO> {
  private readonly _name: string;
  private readonly _type: ReportTypeVO;
  private readonly _format: ReportFormatVO;
  private readonly _generatedAt: Date;
  private readonly _data: Readonly<Record<string, unknown>> | null;

  private constructor(
    id: MarketingReportIdVO,
    props: MarketingReportEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._name = props.name;
    this._type = props.type;
    this._format = props.format;
    this._generatedAt = props.generatedAt;
    this._data = props.data;
  }

  static create(props: MarketingReportEntityProps): MarketingReportEntity {
    const now = new Date().toISOString();
    const id = MarketingReportIdVO.create(crypto.randomUUID());
    return new MarketingReportEntity(id, props, now, now, null);
  }

  static reconstitute(
    id: MarketingReportIdVO,
    props: MarketingReportEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ): MarketingReportEntity {
    return new MarketingReportEntity(id, props, createdAt, updatedAt, deletedAt);
  }

  get name(): string { return this._name; }
  get type(): ReportTypeVO { return this._type; }
  get format(): ReportFormatVO { return this._format; }
  get generatedAt(): Date { return this._generatedAt; }
  get data(): Readonly<Record<string, unknown>> | null { return this._data; }
}

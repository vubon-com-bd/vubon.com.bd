import { BaseEntity } from '@vubon/shared-kernel/domain/base/base.entity';
import { DocumentIdVO } from '../value-objects/primitives/document-id.vo';
import { DocumentTypeVO } from '../value-objects/primitives/document-type.vo';
import { DocumentStatusVO } from '../value-objects/primitives/document-status.vo';
import { DocumentUrlVO } from '../value-objects/primitives/document-url.vo';
import { VendorIdVO } from '../value-objects/primitives/vendor-id.vo';

export interface VendorDocumentEntityProps {
  readonly vendorId: VendorIdVO;
  readonly type: DocumentTypeVO;
  readonly status: DocumentStatusVO;
  readonly url: DocumentUrlVO;
  readonly number: string | null;
  readonly issuedAt: Date | null;
  readonly expiresAt: Date | null;
}

export class VendorDocumentEntity extends BaseEntity<DocumentIdVO> {
  private readonly _vendorId: VendorIdVO;
  private readonly _type: DocumentTypeVO;
  private readonly _status: DocumentStatusVO;
  private readonly _url: DocumentUrlVO;
  private readonly _number: string | null;
  private readonly _issuedAt: Date | null;
  private readonly _expiresAt: Date | null;

  private constructor(
    id: DocumentIdVO,
    props: VendorDocumentEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._vendorId = props.vendorId;
    this._type = props.type;
    this._status = props.status;
    this._url = props.url;
    this._number = props.number;
    this._issuedAt = props.issuedAt;
    this._expiresAt = props.expiresAt;
  }

  static create(props: VendorDocumentEntityProps): VendorDocumentEntity {
    const now = new Date().toISOString();
    const id = DocumentIdVO.create(crypto.randomUUID());
    return new VendorDocumentEntity(id, props, now, now, null);
  }

  static reconstitute(
    id: DocumentIdVO,
    props: VendorDocumentEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ): VendorDocumentEntity {
    return new VendorDocumentEntity(id, props, createdAt, updatedAt, deletedAt);
  }

  approve(): VendorDocumentEntity {
    return new VendorDocumentEntity(
      this.id,
      { ...this._toProps(), status: DocumentStatusVO.create('approved') },
      this.createdAt,
      new Date().toISOString(),
      this.deletedAt ?? null,
    );
  }

  reject(): VendorDocumentEntity {
    return new VendorDocumentEntity(
      this.id,
      { ...this._toProps(), status: DocumentStatusVO.create('rejected') },
      this.createdAt,
      new Date().toISOString(),
      this.deletedAt ?? null,
    );
  }

  get vendorId(): VendorIdVO { return this._vendorId; }
  get type(): DocumentTypeVO { return this._type; }
  get status(): DocumentStatusVO { return this._status; }
  get url(): DocumentUrlVO { return this._url; }
  get number(): string | null { return this._number; }
  get issuedAt(): Date | null { return this._issuedAt; }
  get expiresAt(): Date | null { return this._expiresAt; }

  get isExpired(): boolean {
    if (!this._expiresAt) return false;
    return this._expiresAt.getTime() <= Date.now();
  }

  private _toProps(): VendorDocumentEntityProps {
    return {
      vendorId: this._vendorId,
      type: this._type,
      status: this._status,
      url: this._url,
      number: this._number,
      issuedAt: this._issuedAt,
      expiresAt: this._expiresAt,
    };
  }
}

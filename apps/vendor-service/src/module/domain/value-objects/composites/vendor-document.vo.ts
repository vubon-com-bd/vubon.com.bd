import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { DocumentIdVO } from '../primitives/document-id.vo';
import { DocumentTypeVO } from '../primitives/document-type.vo';
import { DocumentStatusVO } from '../primitives/document-status.vo';
import { DocumentUrlVO } from '../primitives/document-url.vo';
import { VendorIdVO } from '../primitives/vendor-id.vo';

export interface VendorDocumentProps {
  readonly id: DocumentIdVO;
  readonly vendorId: VendorIdVO;
  readonly type: DocumentTypeVO;
  readonly status: DocumentStatusVO;
  readonly url: DocumentUrlVO;
  readonly number: string | null;
  readonly issuedAt: Date | null;
  readonly expiresAt: Date | null;
}

export class VendorDocumentVO extends BaseVO<VendorDocumentProps> {
  private constructor(props: VendorDocumentProps) {
    super(Object.freeze({ ...props }));
  }

  static create(props: VendorDocumentProps): VendorDocumentVO {
    return new VendorDocumentVO(props);
  }

  get id(): DocumentIdVO { return this.value.id; }
  get vendorId(): VendorIdVO { return this.value.vendorId; }
  get type(): DocumentTypeVO { return this.value.type; }
  get status(): DocumentStatusVO { return this.value.status; }
  get url(): DocumentUrlVO { return this.value.url; }
  get number(): string | null { return this.value.number; }
  get issuedAt(): Date | null { return this.value.issuedAt; }
  get expiresAt(): Date | null { return this.value.expiresAt; }

  get isExpired(): boolean {
    if (!this.value.expiresAt) return false;
    return this.value.expiresAt.getTime() <= Date.now();
  }
}

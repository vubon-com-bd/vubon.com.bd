import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { InsuranceIdVO } from '../primitives/insurance-id.vo';
import { InsuranceStatusVO } from '../primitives/insurance-status.vo';
import { InsuranceCoverageVO } from '../primitives/insurance-coverage.vo';
import { InsuranceProviderVO } from '../primitives/insurance-provider.vo';
import { ShipmentIdVO } from '../primitives/shipment-id.vo';

export interface InsuranceProps {
  readonly id: InsuranceIdVO;
  readonly shipmentId: ShipmentIdVO;
  readonly provider: InsuranceProviderVO;
  readonly coverage: InsuranceCoverageVO;
  readonly premium: number;
  readonly currency: string;
  readonly status: InsuranceStatusVO;
}

export class InsuranceVO extends BaseVO<InsuranceProps> {
  private constructor(props: InsuranceProps) {
    super(Object.freeze({ ...props }));
  }

  static create(props: InsuranceProps): InsuranceVO {
    return new InsuranceVO(props);
  }

  get id(): InsuranceIdVO { return this.value.id; }
  get shipmentId(): ShipmentIdVO { return this.value.shipmentId; }
  get provider(): InsuranceProviderVO { return this.value.provider; }
  get coverage(): InsuranceCoverageVO { return this.value.coverage; }
  get premium(): number { return this.value.premium; }
  get currency(): string { return this.value.currency; }
  get status(): InsuranceStatusVO { return this.value.status; }
}

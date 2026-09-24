import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { DeviceTokenVO } from '../primitives/device-token.vo';

export interface PushMessageProps {
  readonly deviceToken: DeviceTokenVO;
  readonly title: string;
  readonly body: string;
  readonly icon: string | null;
  readonly image: string | null;
  readonly clickAction: string | null;
  readonly data: Readonly<Record<string, string>>;
}

export class PushMessageVO extends BaseVO<PushMessageProps> {
  private constructor(props: PushMessageProps) {
    super(
      Object.freeze({
        ...props,
        data: Object.freeze({ ...props.data }),
      }),
    );
  }

  static create(props: PushMessageProps): PushMessageVO {
    return new PushMessageVO(props);
  }

  get deviceToken(): DeviceTokenVO { return this.value.deviceToken; }
  get title(): string { return this.value.title; }
  get body(): string { return this.value.body; }
  get icon(): string | null { return this.value.icon; }
  get image(): string | null { return this.value.image; }
  get clickAction(): string | null { return this.value.clickAction; }
  get data(): Readonly<Record<string, string>> { return this.value.data; }
}

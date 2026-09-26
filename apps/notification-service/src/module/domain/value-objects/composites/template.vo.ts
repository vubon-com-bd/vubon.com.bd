import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { TemplateIdVO } from '../primitives/template-id.vo';
import { TemplateNameVO } from '../primitives/template-name.vo';
import { TemplateContentVO } from '../primitives/template-content.vo';
import { TemplateFormatVO } from '../primitives/template-format.vo';
import { NotificationChannelVO } from '../primitives/notification-channel.vo';

export interface TemplateProps {
  readonly id: TemplateIdVO;
  readonly name: TemplateNameVO;
  readonly channel: NotificationChannelVO;
  readonly language: string;
  readonly subject: string | null;
  readonly content: TemplateContentVO;
  readonly format: TemplateFormatVO;
}

export class TemplateVO extends BaseVO<TemplateProps> {
  private constructor(props: TemplateProps) {
    super(Object.freeze({ ...props }));
  }

  static create(props: TemplateProps): TemplateVO {
    return new TemplateVO(props);
  }

  get id(): TemplateIdVO { return this.value.id; }
  get name(): TemplateNameVO { return this.value.name; }
  get channel(): NotificationChannelVO { return this.value.channel; }
  get language(): string { return this.value.language; }
  get subject(): string | null { return this.value.subject; }
  get content(): TemplateContentVO { return this.value.content; }
  get format(): TemplateFormatVO { return this.value.format; }
}

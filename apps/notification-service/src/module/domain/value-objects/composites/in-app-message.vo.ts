/**
 * InAppMessageVO — Composite Value Object
 * @module notification-service/domain/value-objects/composites
 *
 * In-app notification — toast/banner/modal content।
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { IN_APP, IN_APP_POSITION, IN_APP_TYPE } from '@vubon/shared-constants/platform';

import { NotificationActionVO } from '@domain/composites/notification-action.vo.js';

export type InAppTypeValue = (typeof IN_APP_TYPE)[keyof typeof IN_APP_TYPE];
export type InAppPositionValue = (typeof IN_APP_POSITION)[keyof typeof IN_APP_POSITION];

const ALLOWED_TYPES = Object.values(IN_APP_TYPE) as readonly string[];
const ALLOWED_POSITIONS = Object.values(IN_APP_POSITION) as readonly string[];

export interface InAppMessageVOProps {
  readonly type: InAppTypeValue;
  readonly position?: InAppPositionValue;
  readonly title: string;
  readonly body: string;
  readonly imageUrl?: string;
  readonly iconUrl?: string;
  readonly actions?: readonly NotificationActionVO[];
  readonly displayDurationSeconds?: number;
  readonly autoDismiss: boolean;
}

export class InAppMessageVO extends BaseVO<InAppMessageVOProps> {
  private constructor(props: InAppMessageVOProps) {
    super(Object.freeze(props));
  }

  static create(props: InAppMessageVOProps): InAppMessageVO {
    const vo = new InAppMessageVO(props);
    vo.validate();
    return vo;
  }

  static reconstitute(props: InAppMessageVOProps): InAppMessageVO {
    return new InAppMessageVO(props);
  }

  protected validate(): void {
    const v = this.value;
    if (!ALLOWED_TYPES.includes(v.type)) {
      throw new ValidationError(`Invalid in-app type "${v.type}"`, 'type');
    }
    if (v.position !== undefined && !ALLOWED_POSITIONS.includes(v.position)) {
      throw new ValidationError(`Invalid in-app position "${v.position}"`, 'position');
    }
    if (!v.title || v.title.trim().length === 0) {
      throw new ValidationError('In-app title cannot be empty', 'title');
    }
    if (v.title.length > IN_APP.TITLE_MAX_LENGTH) {
      throw new ValidationError(`In-app title exceeds ${IN_APP.TITLE_MAX_LENGTH} chars`, 'title');
    }
    if (!v.body || v.body.trim().length === 0) {
      throw new ValidationError('In-app body cannot be empty', 'body');
    }
    if (v.body.length > IN_APP.BODY_MAX_LENGTH) {
      throw new ValidationError(`In-app body exceeds ${IN_APP.BODY_MAX_LENGTH} chars`, 'body');
    }
    if (v.actions && v.actions.length > IN_APP.MAX_ACTIONS) {
      throw new ValidationError(`In-app actions exceed ${IN_APP.MAX_ACTIONS}`, 'actions');
    }
    if (v.displayDurationSeconds !== undefined) {
      if (
        !Number.isInteger(v.displayDurationSeconds) ||
        v.displayDurationSeconds < 1 ||
        v.displayDurationSeconds > 60
      ) {
        throw new ValidationError('displayDurationSeconds must be 1-60', 'displayDurationSeconds');
      }
    }
    if (!v.autoDismiss && v.displayDurationSeconds !== undefined) {
      throw new ValidationError(
        'autoDismiss=false cannot have displayDurationSeconds',
        'displayDurationSeconds',
      );
    }
  }

  get type(): InAppTypeValue { return this.value.type; }
  get position(): InAppPositionValue | undefined { return this.value.position; }
  get title(): string { return this.value.title; }
  get body(): string { return this.value.body; }
  get imageUrl(): string | undefined { return this.value.imageUrl; }
  get iconUrl(): string | undefined { return this.value.iconUrl; }
  get actions(): readonly NotificationActionVO[] | undefined { return this.value.actions; }
  get displayDurationSeconds(): number | undefined { return this.value.displayDurationSeconds; }
  get autoDismiss(): boolean { return this.value.autoDismiss; }

  hasActions(): boolean { return (this.value.actions?.length ?? 0) > 0; }
  get actionCount(): number { return this.value.actions?.length ?? 0; }
  isModal(): boolean { return this.value.type === IN_APP_TYPE.MODAL; }
  isToast(): boolean { return this.value.type === IN_APP_TYPE.TOAST; }
  isBanner(): boolean { return this.value.type === IN_APP_TYPE.BANNER; }
  get effectiveDuration(): number {
    return this.value.displayDurationSeconds ?? IN_APP.DISPLAY_DURATION_SECONDS;
  }
}

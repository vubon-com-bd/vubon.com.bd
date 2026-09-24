import { createParamDecorator, type ExecutionContext } from '@nestjs/common';

export interface OwnNotificationUser {
  readonly userId: string;
  readonly sessionId?: string;
  readonly roles?: readonly string[];
}

export const OwnNotification = createParamDecorator(
  (field: keyof OwnNotificationUser | undefined, ctx: ExecutionContext) => {
    const request = ctx
      .switchToHttp()
      .getRequest<{ user?: OwnNotificationUser }>();
    const user = request.user;
    if (!user) return undefined;
    return field ? user[field] : user;
  },
);

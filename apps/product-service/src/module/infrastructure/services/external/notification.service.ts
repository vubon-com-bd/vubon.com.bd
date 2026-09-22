import { Injectable } from '@nestjs/common';

@Injectable()
export class NotificationService {
  async send(_channel: string, _to: string, _message: string): Promise<void> {
    void _channel;
    void _to;
    void _message;
  }
}

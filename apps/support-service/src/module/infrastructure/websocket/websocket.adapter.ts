import { IoAdapter } from '@nestjs/platform-socket.io';
import type { INestApplicationContext } from '@nestjs/common';

export class WebSocketAdapter extends IoAdapter {
  constructor(app: INestApplicationContext) {
    super(app);
  }
}

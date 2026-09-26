/**
 * Support WebSocket Gateway — real-time chat/notification
 * @module support-service/infrastructure/websocket
 *
 * Rule: no business logic; delegate to application service
 * Rule: authenticate handshake, isolate rooms
 */
import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import { CHAT_ROOM } from './rooms/chat.room';
import { WS_EVENT } from './events/message.events';

interface AuthedSocket extends Socket {
  userId?: string;
  agentId?: string;
}

@WebSocketGateway({
  namespace: '/support',
  cors: { origin: '*' },
})
export class SupportWebSocketGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  private readonly logger = new Logger(SupportWebSocketGateway.name);

  @WebSocketServer()
  server!: Server;

  async handleConnection(client: AuthedSocket): Promise<void> {
    const auth = client.handshake.auth as
      | { userId?: string; agentId?: string; token?: string }
      | undefined;
    if (!auth?.userId && !auth?.agentId) {
      this.logger.warn(`WS connection rejected (no auth): ${client.id}`);
      client.disconnect(true);
      return;
    }
    client.userId = auth.userId;
    client.agentId = auth.agentId;
    this.logger.log(
      `WS connected: ${client.id} (user=${auth.userId ?? '-'} agent=${auth.agentId ?? '-'})`,
    );
  }

  async handleDisconnect(client: AuthedSocket): Promise<void> {
    this.logger.log(`WS disconnected: ${client.id}`);
  }

  @SubscribeMessage(WS_EVENT.JOIN_CHAT)
  async onJoinChat(
    @ConnectedSocket() client: AuthedSocket,
    @MessageBody() data: { chatId: string },
  ): Promise<void> {
    if (!data?.chatId) return;
    await client.join(CHAT_ROOM.forChat(data.chatId));
    client.emit(WS_EVENT.JOINED_CHAT, { chatId: data.chatId });
  }

  @SubscribeMessage(WS_EVENT.LEAVE_CHAT)
  async onLeaveChat(
    @ConnectedSocket() client: AuthedSocket,
    @MessageBody() data: { chatId: string },
  ): Promise<void> {
    if (!data?.chatId) return;
    await client.leave(CHAT_ROOM.forChat(data.chatId));
    client.emit(WS_EVENT.LEFT_CHAT, { chatId: data.chatId });
  }

  @SubscribeMessage(WS_EVENT.TYPING_START)
  async onTypingStart(
    @ConnectedSocket() client: AuthedSocket,
    @MessageBody() data: { chatId: string },
  ): Promise<void> {
    if (!data?.chatId) return;
    client
      .to(CHAT_ROOM.forChat(data.chatId))
      .emit(WS_EVENT.TYPING, {
        chatId: data.chatId,
        actor: client.userId ?? client.agentId,
        state: 'start',
      });
  }

  @SubscribeMessage(WS_EVENT.TYPING_STOP)
  async onTypingStop(
    @ConnectedSocket() client: AuthedSocket,
    @MessageBody() data: { chatId: string },
  ): Promise<void> {
    if (!data?.chatId) return;
    client
      .to(CHAT_ROOM.forChat(data.chatId))
      .emit(WS_EVENT.TYPING, {
        chatId: data.chatId,
        actor: client.userId ?? client.agentId,
        state: 'stop',
      });
  }

  /** Server-side broadcast helper */
  broadcastChatMessage(chatId: string, payload: unknown): void {
    this.server.to(CHAT_ROOM.forChat(chatId)).emit(WS_EVENT.CHAT_MESSAGE, payload);
  }

  broadcastToUser(userId: string, payload: unknown): void {
    this.server.to(CHAT_ROOM.forUser(userId)).emit(WS_EVENT.CHAT_MESSAGE, payload);
  }
}

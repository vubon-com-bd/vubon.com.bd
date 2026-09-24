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
import { ticketRoom } from './rooms/ticket.room';
import { userRoom } from './rooms/user.room';
import { MESSAGE_EVENTS } from './events/message.events';
import { TYPING_EVENTS } from './events/typing.events';
import { PRESENCE_EVENTS } from './events/presence.events';
import type {
  ChatMessagePayload,
  TypingPayload,
  PresencePayload,
  JoinRoomPayload,
} from './websocket.types';

@WebSocketGateway({ namespace: '/chat', cors: { origin: '*' } })
export class ChatWebSocketGateway implements OnGatewayConnection, OnGatewayDisconnect {
  private readonly logger = new Logger(ChatWebSocketGateway.name);

  @WebSocketServer()
  server!: Server;

  handleConnection(client: Socket): void {
    const token = client.handshake.auth?.token as string | undefined;
    if (!token) {
      this.logger.warn(`Unauthorized client: ${client.id}`);
      client.disconnect();
      return;
    }
    this.logger.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket): void {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('room:join')
  handleJoinRoom(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: JoinRoomPayload,
  ): void {
    void client.join(data.room);
  }

  @SubscribeMessage(MESSAGE_EVENTS.SEND)
  handleMessage(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: ChatMessagePayload,
  ): void {
    this.server.to(ticketRoom(data.chatId)).emit(MESSAGE_EVENTS.RECEIVE, {
      chatId: data.chatId,
      content: data.content,
      type: data.type ?? 'text',
      senderId: client.id,
      sentAt: new Date().toISOString(),
    });
  }

  @SubscribeMessage(TYPING_EVENTS.START)
  handleTypingStart(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: TypingPayload,
  ): void {
    this.server.to(ticketRoom(data.chatId)).emit(TYPING_EVENTS.START, {
      chatId: data.chatId,
      userId: client.id,
    });
  }

  @SubscribeMessage(TYPING_EVENTS.STOP)
  handleTypingStop(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: TypingPayload,
  ): void {
    this.server.to(ticketRoom(data.chatId)).emit(TYPING_EVENTS.STOP, {
      chatId: data.chatId,
      userId: client.id,
    });
  }

  emitPresence(userId: string, payload: PresencePayload): void {
    this.server.to(userRoom(userId)).emit(PRESENCE_EVENTS.UPDATE, payload);
  }
}

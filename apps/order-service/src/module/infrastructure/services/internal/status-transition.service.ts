/**
 * StatusTransitionService — DI-injectable state-machine wrapper
 * @module order-service/infrastructure/services/internal
 */
import { Injectable } from '@nestjs/common';
import { OrderStatusTransitionService } from '../../../domain/services/order-status-transition.service.js';

export const STATUS_TRANSITION_SERVICE = Symbol('STATUS_TRANSITION_SERVICE');

export interface IStatusTransitionService {
  canTransition(from: string, to: string): boolean;
  isFinal(status: string): boolean;
  isActive(status: string): boolean;
  nextStatuses(from: string): readonly string[];
  previousStatuses(to: string): readonly string[];
  canCancel(status: string): boolean;
  canShip(status: string): boolean;
  canDeliver(status: string): boolean;
  canReturn(status: string): boolean;
  canRefund(status: string): boolean;
  findPath(from: string, to: string): readonly string[] | null;
}

@Injectable()
export class StatusTransitionService implements IStatusTransitionService {
  canTransition(from: string, to: string): boolean {
    return OrderStatusTransitionService.canTransition(from, to);
  }
  isFinal(status: string): boolean {
    return OrderStatusTransitionService.isFinal(status);
  }
  isActive(status: string): boolean {
    return OrderStatusTransitionService.isActive(status);
  }
  nextStatuses(from: string): readonly string[] {
    return OrderStatusTransitionService.nextStatuses(from);
  }
  previousStatuses(to: string): readonly string[] {
    return OrderStatusTransitionService.previousStatuses(to);
  }
  canCancel(status: string): boolean {
    return OrderStatusTransitionService.canCancel(status);
  }
  canShip(status: string): boolean {
    return OrderStatusTransitionService.canShip(status);
  }
  canDeliver(status: string): boolean {
    return OrderStatusTransitionService.canDeliver(status);
  }
  canReturn(status: string): boolean {
    return OrderStatusTransitionService.canReturn(status);
  }
  canRefund(status: string): boolean {
    return OrderStatusTransitionService.canRefund(status);
  }
  findPath(from: string, to: string): readonly string[] | null {
    return OrderStatusTransitionService.findPath(from, to);
  }
}

export interface RouteStop {
  readonly id: string;
  readonly sequence: number;
  readonly address: string;
  readonly latitude?: number;
  readonly longitude?: number;
  readonly etaAt?: string;
}

export interface Route {
  readonly id: string;
  readonly name: string;
  readonly stops: readonly RouteStop[];
  readonly distanceKm?: number;
  readonly estimatedMinutes?: number;
  readonly active: boolean;
}

export interface RouteListResponse {
  readonly routes: readonly Route[];
  readonly total: number;
}

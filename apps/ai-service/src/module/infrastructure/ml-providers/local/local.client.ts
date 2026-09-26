import { Injectable } from '@nestjs/common';
import axios, { type AxiosInstance } from 'axios';
import { LOCAL_CONFIG } from './local.config';

@Injectable()
export class LocalClient {
  private readonly http: AxiosInstance;

  constructor() {
    this.http = axios.create({
      baseURL: LOCAL_CONFIG.baseUrl,
      timeout: LOCAL_CONFIG.timeoutMs,
    });
  }

  get client(): AxiosInstance {
    return this.http;
  }
}

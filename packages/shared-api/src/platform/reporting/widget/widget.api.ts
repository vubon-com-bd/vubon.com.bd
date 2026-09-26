import { httpClient } from '../../../common/client/client.factory';
import type { QueryParams } from '../../../common/request/request.types';
import { WIDGET_ENDPOINTS } from './widget.endpoints';
import type { WidgetData } from './widget.types';

export const widgetApi = {
  get: async (id: string, query?: QueryParams, signal?: AbortSignal): Promise<WidgetData> => {
    const res = await httpClient.get<WidgetData>(WIDGET_ENDPOINTS.get(id), {
      signal,
      timeout: 15_000,
      query,
    });
    return res.data;
  },
} as const;

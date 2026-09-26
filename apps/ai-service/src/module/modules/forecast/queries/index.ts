import { GetForecastHandler } from '../../../application/queries/forecast/get-forecast.handler';
import { ListForecastsHandler } from '../../../application/queries/forecast/list-forecasts.handler';

export const ForecastQueryHandlers = [
  GetForecastHandler,
  ListForecastsHandler,
];

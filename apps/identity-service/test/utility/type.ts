export interface TApiEndpoint { endpoint: string; method: string; path: string; payload?: () => any; extra?: Array<{ insertAfter: string; valueKey: string; payload?: () => any }>; }
export interface TApiModule { [endpoint: string]: TApiEndpoint; }

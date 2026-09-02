import React, { ReactNode } from 'react';

export interface QueryClient {
  query<T = unknown>(key: string[], fetcher: () => Promise<T>): Promise<T>;
  mutation<T = unknown, V = unknown>(fetcher: (variables: V) => Promise<T>): MutationResult<T, V>;
  invalidateQueries(key: string[]): void;
  setQueryData<T = unknown>(key: string[], data: T): void;
  getQueryData<T = unknown>(key: string[]): T | undefined;
}

export interface MutationResult<T = unknown, V = unknown> {
  mutate: (variables: V) => Promise<T>;
  isLoading: boolean;
  error: Error | null;
  data: T | null;
}

export interface QueryProviderProps {
  children: ReactNode;
  queryClient?: QueryClient;
}

export const QueryContext = React.createContext<QueryClient | undefined>(undefined);

export const QueryProvider: React.FC<QueryProviderProps> = ({ 
  children, 
  queryClient 
}) => {
  // Simple in-memory query client implementation
  const defaultQueryClient: QueryClient = {
    query: async <T = unknown>(key: string[], fetcher: () => Promise<T>): Promise<T> => {
      return fetcher();
    },
    mutation: <T = unknown, V = unknown>(fetcher: (variables: V) => Promise<T>): MutationResult<T, V> => {
      let isLoading = false;
      let error: Error | null = null;
      let data: T | null = null;

      const mutate = async (variables: V): Promise<T> => {
        isLoading = true;
        error = null;
        try {
          data = await fetcher(variables);
          return data;
        } catch (err) {
          error = err as Error;
          throw err;
        } finally {
          isLoading = false;
        }
      };

      return {
        mutate,
        isLoading,
        error,
        data,
      };
    },
    invalidateQueries: (key: string[]) => {
      // Simple implementation - just log
      console.log('Invalidating queries:', key);
    },
    setQueryData: <T = unknown>(key: string[], data: T) => {
      // Simple implementation - just log
      console.log('Setting query data:', key, data);
    },
    getQueryData: <T = unknown>(key: string[]): T | undefined => {
      // Simple implementation - return undefined
      return undefined;
    },
  };

  const client = queryClient || defaultQueryClient;

  return (
    <QueryContext.Provider value={client}>
      {children}
    </QueryContext.Provider>
  );
};

export const useQueryClient = (): QueryClient => {
  const context = React.useContext(QueryContext);
  if (context === undefined) {
    throw new Error('useQueryClient must be used within a QueryProvider');
  }
  return context;
};

import { globalErrorHandler } from '@/hooks/noti/useNotificationProvider';
import { QueryClient } from '@tanstack/react-query';

// Modify Client to initialize queryClient
const createQueryClient = () => {
  return new QueryClient({
    defaultOptions: {
      queries: {
        retry: false, // No retries for queries by default
        staleTime: 1000 * 60 * 5, // Cache time or stale time for queries
        throwOnError(error) {
          if (error instanceof Error) {
            globalErrorHandler(error);
            return false;
          }
          return true;
        },
      },
      mutations: {
        onError: globalErrorHandler,  // Global error handler for mutations
      },
    },
  });
};


// Initialize query client with global error handler
export const queryClient = createQueryClient();

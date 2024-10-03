import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Slot } from 'expo-router';

import { magic } from 'api/magic';
import { Bootstrap } from 'providers/bootstrap';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false
    }
  }
});

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <magic.Relayer />
      <Bootstrap>
        <Slot />
      </Bootstrap>
    </QueryClientProvider>
  );
}

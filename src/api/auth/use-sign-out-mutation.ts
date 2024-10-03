import { useMutation, useQueryClient } from '@tanstack/react-query';

import { sessionQueryKeys } from 'api/auth/config';
import { magic } from 'api/magic';
import { logger } from 'utils/logger';

export const useSignOutMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      logger.auth.debug('signOut called');
      await magic.user.logout();
    },
    onSuccess: () => {
      return queryClient.refetchQueries({ queryKey: sessionQueryKeys.all });
    }
  });
};

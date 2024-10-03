import { useMutation, useQueryClient } from '@tanstack/react-query';

import { sessionQueryKeys } from 'api/auth/config';
import { magic } from 'api/magic';
import { logger } from 'utils/logger';

export const useSignInMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (email: string) => {
      logger.auth.debug('signIn called', { email });
      await magic.auth.loginWithEmailOTP({ email });
    },
    onSuccess: () => {
      return queryClient.refetchQueries({ queryKey: sessionQueryKeys.all });
    }
  });
};

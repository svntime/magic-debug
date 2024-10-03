import type { QueryObserverResult } from '@tanstack/react-query';
import { queryOptions, useQuery } from '@tanstack/react-query';

import { sessionQueryKeys, sessionStaleTime } from 'api/auth/config';
import { magic } from 'api/magic';
import { logger } from 'utils/logger';

type Session = Awaited<ReturnType<typeof queryFn>>;

type UseSessionReturn = (
  | { status: 'loading'; data: null }
  | { status: 'unauthenticated'; data: null }
  | { status: 'authenticated'; data: NonNullable<Session> }
) & {
  invalidate: () => Promise<QueryObserverResult<Session>>;
};

const queryFn = async () => {
  try {
    logger.auth.debug('getSession called');
    const magicUserInfo = await magic.user.getInfo();
    logger.auth.debug('magicUserInfo received', { magicUserInfo });
    return { magic: magicUserInfo };
  } catch (err) {
    const reason = err instanceof Error ? err.message : null;
    logger.auth.error('getSession error', { reason });
    return null;
  }
};

// exported like this for queryClient.fetchQuery purpose
export const options = queryOptions({
  queryKey: sessionQueryKeys.all,
  queryFn,
  staleTime: sessionStaleTime
});

export const useSession = () => {
  const query = useQuery(options);

  const details = (() => {
    if (query.isFetching) return { status: 'loading', data: null } as const;
    else if (query.data) return { status: 'authenticated', data: query.data } as const;
    else return { status: 'unauthenticated', data: null } as const;
  })();

  return { ...details, invalidate: query.refetch } satisfies UseSessionReturn;
};
